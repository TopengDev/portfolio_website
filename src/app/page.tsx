'use client';
import useForm from '@/components/custom/form';
import CustomForm, { FormProvider } from '@/components/custom/form';
import Image from 'next/image';
import { useEffect } from 'react';
import z from 'zod';

function Home() {
   const { Form } = useForm();

   return (
      <div className="w-scree h-screen flex items-center justify-center">
         <div>
            <Form />
         </div>
      </div>
   );
}

export default function Page() {
   return (
      <FormProvider
         fields={[
            {
               key: 'group1',
               type: 'horizontal-fields-container',
               fields: [
                  {
                     type: 'text',
                     key: 'password',
                     title: 'Name',
                     defaultValue: 'oh my name',
                     validator(value) {
                        if (!value) {
                           return {
                              isValid: false,
                              message: 'Name is required',
                           };
                        } else return { isValid: true };
                     },
                  },
                  {
                     type: 'text',
                     key: 'email',
                     title: 'Name',
                     defaultValue: 'oh my name',
                     validator(value) {
                        if (!value) {
                           return {
                              isValid: false,
                              message: 'Name is required',
                           };
                        } else return { isValid: true };
                     },
                  },
               ],
            },
            {
               key: 'group2',
               type: 'horizontal-fields-container',
               fields: [
                  {
                     type: 'number',
                     key: 'passworda',
                     title: 'Name',
                     defaultValue: 'oh my name',
                     validator(value) {
                        if (!value) {
                           return {
                              isValid: false,
                              message: 'Name is required',
                           };
                        } else return { isValid: true };
                     },
                  },
                  {
                     type: 'selection',
                     key: 'emaila',
                     title: 'Name',
                     defaultValue: '',
                     placeholder: 'placeholder',
                     validator(value) {
                        if (!value) {
                           return {
                              isValid: false,
                              message: 'Name is required',
                           };
                        } else return { isValid: true };
                     },
                     options: [
                        { title: 'Option 1', value: 1 },
                        { title: 'Option 2', value: '2' },
                        { title: 'Option 3', value: '3' },
                     ],
                  },
               ],
            },
            {
               required: true,
               type: 'text',
               key: 'name',
               title: 'Name',
               defaultValue: 'oh my name',
               validator(value) {
                  if (!value) {
                     return { isValid: false, message: 'Name is required' };
                  } else return { isValid: true };
               },
            },
         ]}
         onSubmit={(v) => console.log({ v })}
      >
         <Home />
      </FormProvider>
   );
}
