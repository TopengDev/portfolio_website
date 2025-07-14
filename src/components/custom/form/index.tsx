'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import React, {
   createContext,
   PropsWithChildren,
   useContext,
   useEffect,
   useRef,
   useState,
} from 'react';

export type TFormField =
   | ({
        title: string;
        key: string;
        disabled?: boolean;
        defaultValue?: any;
        placeholder?: string;
        isLoading?: boolean;
        validator?: (value: any) => { isValid: boolean; message?: string };
        onChange?: (value?: any) => any;
        onLeave?: (value?: any) => any;
        masker?: (value?: any) => any;
        required?: boolean;
     } & (TStringField | TNumberField | TSelectionField | TAsyncSelectionField))
   | THorizontalFieldsContainer;

export type THorizontalFieldsContainer = {
   type: 'horizontal-fields-container';
   fields: TFormField[];
   key: string;
};
export type TStringField = {
   type: 'text' | 'textarea' | 'email' | 'password' | 'date';
   defaultValue?: string;
};

export type TNumberField = {
   type: 'number';
   defaultValue?: number;
};

export type TSelectionField = {
   type: 'selection';
   options: { title: string; value: any }[];
};

export type TAsyncSelectionField = {
   type: 'async-selection';
   getOptions: (param?: any) => Promise<{ title: string; value: any }[]>;
};

export type TFormProps = {
   fields: TFormField[];
   onSubmit: (values: Record<string, any>) => any;
   isLoading?: boolean;
};

const formContext = createContext<{
   formValues: Record<string, any>;
   formValidations: {
      current: Record<string, { isValid: boolean; message?: string }>;
   };
   fields: TFormField[];
   onSubmit: (values: Record<string, any>) => any;
   handleFieldChange(key: string, value: any): void;
   validateField(
      key: string,
      value: any,
      fn?: (value: any) => {
         isValid: boolean;
         message?: string;
      },
   ): void;
   resetForm(): void;
   setValues(values: Record<string, any>): void;
   updatedValues: Record<string, any>;
}>({
   formValues: {},
   fields: [],
   onSubmit: () => {},
   formValidations: { current: {} },
   handleFieldChange: function (key: string, value: any): void {},
   validateField: function (
      key: string,
      value: any,
      fn?: (value: any) => {
         isValid: boolean;
         message?: string;
      },
   ): void {},
   resetForm: function (): void {},
   setValues: function (values: Record<string, any>): void {},
   updatedValues: {},
});

export function FormProvider(props: PropsWithChildren & TFormProps) {
   const formValues = useRef<Record<string, any>>({});
   const formValidations = useRef<
      Record<string, { isValid: boolean; message?: string }>
   >({});

   function validateField(
      key: string,
      value: any,
      fn?: (value: any) => { isValid: boolean; message?: string },
   ) {
      formValidations.current = {
         ...formValidations.current,
         [key]: fn ? fn(value) : { isValid: true },
      };
   }

   function handleFieldChange(key: string, value: any) {
      formValues.current = {
         ...formValues.current,
         [key]: value,
      };
   }

   function resetForm() {
      let initialValues: Record<string, any> = {};

      function traverseFields(fields: TFormField[]) {
         fields.forEach((field) => {
            if (field.type === 'horizontal-fields-container')
               traverseFields(field.fields);
            else
               initialValues = {
                  ...initialValues,
                  [field.key]: '',
               };
         });
      }

      traverseFields(props.fields);

      setUpdatedValues(initialValues);
   }

   useEffect(() => {
      let initialValues: Record<string, any> = {};

      function traverseFields(fields: TFormField[]) {
         fields.forEach((field) => {
            if (field.type === 'horizontal-fields-container')
               traverseFields(field.fields);
            else
               initialValues = {
                  ...initialValues,
                  [field.key]: field?.defaultValue || '',
               };
         });
      }

      traverseFields(props.fields);

      formValues.current = initialValues;
   }, [props.fields]);

   const [updatedValues, setUpdatedValues] = useState<Record<string, any>>({});
   function setValues(values: Record<string, any>) {
      setUpdatedValues(values);
   }

   return (
      <formContext.Provider
         value={{
            formValues,
            formValidations,
            fields: props.fields,
            onSubmit: props.onSubmit,
            handleFieldChange,
            validateField,
            resetForm,
            setValues,
            updatedValues,
         }}
      >
         {props?.children}
      </formContext.Provider>
   );
}

function FieldRenderer({ field }: { field: TFormField }) {
   const { handleFieldChange, validateField, updatedValues } =
      useContext(formContext);

   const [value, setValue] = useState<any>((field as any)?.defaultValue || '');
   const [validity, setValidity] = useState<{
      isValid: boolean;
      message?: string;
   }>(
      (field as any)?.validator
         ? (field as any).validator((field as any).defaultValue || '')
         : { isValid: true, message: '' },
   );

   const [isLoading, setIsLoading] = useState<boolean>(
      (field as any)?.isLoading || false,
   );
   const [loadedOptions, setLoadedOptions] = useState<
      { title: string; value: any }[]
   >([]);

   useEffect(() => {
      if (field.type === 'async-selection') {
         async function loadOptions() {
            setIsLoading(true);
            try {
               const response = await (field as any)?.getOptions();
               setLoadedOptions(response);
               setIsLoading(false);
            } catch (err) {
               console.error('Error loading options:', err);
               setIsLoading(false);
            }
         }
         loadOptions();
      }
   }, []);

   useEffect(() => {
      if (field.key in updatedValues) {
         const newValue = updatedValues[field.key];
         setValue(newValue);
         handleFieldChange(field.key, newValue);
         if ((field as any)?.validator) {
            setValidity((field as any).validator(newValue));
            validateField(field.key, newValue, (field as any)?.validator);
         } else setValidity({ isValid: true });
      }
   }, [updatedValues[field.key]]);

   if (field.type === 'horizontal-fields-container') {
      return (
         <div className="w-full flex gap-4">
            {field.fields.map((subField, i) => (
               <FieldRenderer
                  key={`horizontal-form-field-${(subField as any).key}-${i}`}
                  field={subField}
               />
            ))}
         </div>
      );
   }

   return (
      <span key={`form-field-${field.key}`} className="w-full">
         {(field.type === 'text' ||
            field.type === 'password' ||
            field.type === 'email' ||
            field.type === 'date' ||
            field.type === 'number') && (
            <div className="w-full flex flex-col gap-1">
               <div className="font-semibold flex gap-1">
                  {field?.title}
                  {field.required ? (
                     <p className="text-red-500 text-sm">*</p>
                  ) : (
                     ''
                  )}
               </div>
               <div>
                  <Input
                     disabled={field?.disabled || isLoading || false}
                     type={field.type}
                     value={value || ''}
                     onChange={(e) => {
                        setValue(e.target.value);
                        handleFieldChange(field.key, e.target.value);
                        if (field.validator) {
                           setValidity(field.validator(e.target.value));
                           validateField(
                              field.key,
                              e.target.value,
                              field.validator,
                           );
                        }
                     }}
                     placeholder={field?.placeholder || ''}
                     className={`w-full ${
                        !validity?.isValid ? 'border-[1px] border-red-400' : ''
                     }`}
                     onBlur={(e) => {
                        field?.onLeave?.(e.target.value);
                     }}
                  />
                  <div>
                     {validity?.message && !validity?.isValid ? (
                        <span className="text-red-500 text-xs">
                           {validity.message}
                        </span>
                     ) : (
                        <span>&nbsp;</span>
                     )}
                  </div>
               </div>
            </div>
         )}
         {field.type === 'textarea' && (
            <div className="w-full">
               <div className="font-semibold flex gap-1">
                  {field?.title}
                  {field.required ? (
                     <p className="text-red-500 text-sm">*</p>
                  ) : (
                     ''
                  )}
               </div>
               <div>
                  <textarea
                     disabled={field?.disabled || isLoading || false}
                     value={value || ''}
                     onChange={(e) => {
                        setValue(e.target.value);
                        handleFieldChange(field.key, e.target.value);
                        if (field.validator) {
                           setValidity(field.validator(e.target.value));
                           validateField(
                              field.key,
                              e.target.value,
                              field.validator,
                           );
                        }
                     }}
                     placeholder={field?.placeholder || ''}
                     className={`w-full ${
                        !validity?.isValid ? 'border-[1px] border-red-400' : ''
                     }`}
                     onBlur={(e) => {
                        field?.onLeave?.(e.target.value);
                     }}
                  />
                  <div>
                     {validity?.message && !validity?.isValid ? (
                        <span className="text-red-500 text-xs">
                           {validity.message}
                        </span>
                     ) : (
                        <span>&nbsp;</span>
                     )}
                  </div>
               </div>
            </div>
         )}
         {field.type === 'selection' && (
            <div className="w-full">
               <div className="font-semibold flex gap-1">
                  {field?.title}
                  {field.required ? (
                     <p className="text-red-500 text-sm">*</p>
                  ) : (
                     ''
                  )}
               </div>
               <div>
                  <Select
                     disabled={field?.disabled || isLoading || false}
                     value={value}
                     onValueChange={(v) => {
                        setValue(v);
                        handleFieldChange(field.key, v);
                        if (field.validator) {
                           setValidity(field.validator(v));
                           validateField(field.key, v, field.validator);
                        }
                     }}
                  >
                     <SelectTrigger
                        className={`w-full ${
                           !validity?.isValid
                              ? 'border-[1px] border-red-400'
                              : ''
                        }`}
                     >
                        <SelectValue placeholder={field.placeholder} />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           <SelectLabel>{field.title}</SelectLabel>
                           {field.options?.map((option, i) => (
                              <SelectItem
                                 className="w-full"
                                 key={`selection-form-field-${field.key}-${option.value}`}
                                 value={String(option.value)}
                              >
                                 {option.title}
                              </SelectItem>
                           ))}
                        </SelectGroup>
                     </SelectContent>
                  </Select>
                  <div>
                     {validity?.message && !validity?.isValid ? (
                        <span className="text-red-500 text-xs">
                           {validity.message}
                        </span>
                     ) : (
                        <span>&nbsp;</span>
                     )}
                  </div>
               </div>
            </div>
         )}
         {field.type === 'async-selection' && (
            <div className="w-full">
               <div className="font-semibold flex gap-1">
                  {field?.title}
                  {field.required ? (
                     <p className="text-red-500 text-sm">*</p>
                  ) : (
                     ''
                  )}
               </div>
               <div>
                  <Select
                     disabled={field?.disabled || isLoading || false}
                     value={value}
                     onValueChange={(v) => {
                        setValue(v);
                        handleFieldChange(field.key, v);
                        if (field.validator) {
                           setValidity(field.validator(v));
                           validateField(field.key, v, field.validator);
                        }
                     }}
                  >
                     <SelectTrigger
                        className={`w-full ${
                           !validity?.isValid
                              ? 'border-[1px] border-red-400'
                              : ''
                        }`}
                     >
                        <SelectValue placeholder={field.placeholder} />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           <SelectLabel>{field.title}</SelectLabel>
                           {loadedOptions?.map((option, i) => (
                              <SelectItem
                                 className="w-full"
                                 key={`selection-form-field-${field.key}-${option.value}`}
                                 value={String(option.value)}
                              >
                                 {option.title}
                              </SelectItem>
                           ))}
                        </SelectGroup>
                     </SelectContent>
                  </Select>
                  <div>
                     {validity?.message && !validity?.isValid ? (
                        <span className="text-red-500 text-xs">
                           {validity.message}
                        </span>
                     ) : (
                        <span>&nbsp;</span>
                     )}
                  </div>
               </div>
            </div>
         )}
      </span>
   );
}

export default function useForm() {
   const {
      fields,
      onSubmit,
      formValues,
      formValidations,
      resetForm,
      setValues,
   } = useContext(formContext);

   const formComponent = () => (
      <>
         <form
            className="w-full"
            onSubmit={(e) => {
               e.preventDefault();

               let isAllFieldsValid = true;
               Object.keys(formValidations?.current)?.forEach((key) => {
                  if (!formValidations?.current?.[key]?.isValid)
                     isAllFieldsValid = false;
               });

               if (isAllFieldsValid) onSubmit?.(formValues.current);
            }}
         >
            {fields.map((field) => (
               <FieldRenderer key={(field as any).key} field={field} />
            ))}
            <div className="w-full mt-2">
               <Button className="w-full hover:cursor-pointer">Submit</Button>
            </div>
         </form>
      </>
   );

   return {
      Form: formComponent,
      formValues,
      resetForm,
      setValues,
   };
}
