'use client';
import React, { ReactNode, use, useRef } from 'react';
import { motion } from 'framer-motion';

type Props = {
   icon: ReactNode;
   title: string;
   description: string;
   index: number;
};
function ExpertiseCard({ title, description, icon, index }: Props) {
   return (
      <div>
         <motion.span
            className="p-8 flex gap-8 items-center border border-amber-200 rounded-xl hover:p-12"
            initial={{
               opacity: 0,
               translateX: '-120%',
            }}
            animate={{
               opacity: 1,
               translateX: '0%',
               transition: {
                  delay: index * 0.2,
               },
            }}
         >
            {icon}
            <div className="flex flex-col gap-2">
               <div>
                  <h5 className="font-bold ">{title}</h5>
               </div>
               <hr className=" w-full h-1" />
               <div>
                  <p>{description}</p>
               </div>
            </div>
         </motion.span>
      </div>
   );
}

export default ExpertiseCard;
