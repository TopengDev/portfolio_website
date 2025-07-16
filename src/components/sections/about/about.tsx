'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function About() {
   const ref = useRef<any>(null);
   const inView = useInView(ref, {
      once: true,
      amount: 'all',
   });
   const headline = 'About Me';

   const aboutString = `


   {
      "name": "Christopher Indrawan",
      "description": "A passionate software engineer with a focus on
         creating innovative and user-friendly applications. I have a background in web and mobile
         development, with expertise in programming languages frameworks.",
      "age": "24",
      "birthDate": "2001-10-17",
      "location": "Jakarta, Indonesia",
      "profession": "Software Engineer",
      "skills": [
         "UI/UX Design",
         "Software Development",
         "Web App Development",
         "Mobile App Development",
         "Desktop App Development",
      ],
   }
`;

   return (
      <div className="responsive-horizontal-padding h-screen w-full flex flex-col justify-center snap-start">
         <div className="z-10 bg-background sticky top-0 pt-8">
            <motion.h3
               ref={ref}
               className=" bg-gradient-to-r from-amber-200 to-amber-700 bg-clip-text text-transparent  font-extrabold "
            >
               {inView &&
                  headline.split('').map((letter, index) => (
                     <motion.span
                        key={index + 'expertise'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                           duration: 0.2,
                           delay: index * 0.05,
                        }}
                     >
                        {letter}
                     </motion.span>
                  ))}
            </motion.h3>
         </div>
         <div className="lg:w-1/2 bg-gray-800 rounded-2xl  overflow-hidden relative">
            <div className="bg-gray-900 flex items-center absolute top-0 left-0 w-full py-4 px-8 justify-between">
               <div className="flex gap-2 items-center">
                  <span className="bg-red-400 rounded-full w-4 h-4" />
                  <span className="bg-yellow-400 rounded-full w-4 h-4" />
                  <span className="bg-green-400 rounded-full w-4 h-4" />
               </div>
               <p className="text-gray-400">christopher.json</p>
            </div>

            <SyntaxHighlighter language="json" style={atomOneDark} wrapLines>
               {aboutString}
            </SyntaxHighlighter>
         </div>
      </div>
   );
}

export default About;
