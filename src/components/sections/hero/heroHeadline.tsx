'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';

function HeroHeadline({
   headline1 = 'Creative',
   headline2 = 'Software',
   headline3 = 'Engineer',
}: {
   headline1?: string;
   headline2?: string;
   headline3?: string;
}) {
   const headline1Ref = useRef<any>(null);
   const headline2Ref = useRef<any>(null);
   const headline3Ref = useRef<any>(null);

   return (
      <div className="responsive-horizontal-padding h-screen w-full flex flex-col items-center justify-center gap-4">
         <div className="z-10 w-full">
            <motion.h1
               ref={headline1Ref}
               className="h0 text-white  font-extrabold"
            >
               {headline1.split('').map((letter, index) => (
                  <motion.span
                     key={index}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 0.2, delay: index * 0.1 }}
                  >
                     {letter}
                  </motion.span>
               ))}
            </motion.h1>
            <motion.h1
               ref={headline2Ref}
               className="h0 bg-gradient-to-r from-cyan-300 to-indigo-500 bg-clip-text text-transparent  font-extrabold "
            >
               {headline2.split('').map((letter, index) => (
                  <motion.span
                     key={index}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 0.2, delay: index * 0.1 + 0.5 }}
                  >
                     {letter}
                  </motion.span>
               ))}
            </motion.h1>
            <motion.h1
               ref={headline3Ref}
               className="h0 bg-gradient-to-r from-amber-200 to-amber-700 bg-clip-text text-transparent  font-extrabold "
            >
               {headline3.split('').map((letter, index) => (
                  <motion.span
                     key={index}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 0.2, delay: index * 0.1 + 1 }}
                  >
                     {letter}
                  </motion.span>
               ))}
            </motion.h1>
         </div>
      </div>
   );
}

export default HeroHeadline;
