'use client';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
   HiOutlineDesktopComputer,
   HiOutlinePencil,
   HiOutlineDeviceMobile,
} from 'react-icons/hi';
import { FaComputer } from 'react-icons/fa6';
import ExpertiseCard from './expertiseCard';

function Expertise() {
   const expertiseRef = useRef<any>(null);
   const expertiseInView = useInView(expertiseRef, {
      once: true,
      amount: 'all',
   });
   const expertiseHeadline = 'My Expertise';

   const expertiseCardsRef = useRef<any>(null);
   const expertiseCardsInview = useInView(expertiseCardsRef, {
      once: true,
      amount: 'all',
   });

   return (
      <div className="responsive-horizontal-padding h-screen w-full flex flex-col justify-center snap-start">
         <div className="z-10 bg-background sticky top-0 pt-8">
            <motion.h3
               ref={expertiseRef}
               className=" bg-gradient-to-r from-amber-200 to-amber-700 bg-clip-text text-transparent  font-extrabold "
            >
               {expertiseInView &&
                  expertiseHeadline.split('').map((letter, index) => (
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
         <div
            ref={expertiseCardsRef}
            className=" flex flex-col  justify-center lg:max-w-1/2 "
         >
            {expertiseCardsInview && (
               <>
                  <ExpertiseCard
                     index={0}
                     title="UI/UX Design"
                     description="I create user-centered designs that are not only visually appealing but also intuitive and easy to use to ensure a seamless user experience."
                     icon={<HiOutlinePencil size={128} color="#ED53C1" />}
                  />
                  <ExpertiseCard
                     index={1}
                     title="Desktop App Development"
                     description="I build robust desktop applications that run smoothly on various operating systems, utilizing technologies like Electron and .NET."
                     icon={<FaComputer size={128} color="#BA53ED" />}
                  />
                  <ExpertiseCard
                     index={2}
                     title="Web App Development"
                     description="I specialize in building scalable and efficient web
               applications using modern technologies like React,
               Node.js, and TypeScript."
                     icon={
                        <HiOutlineDesktopComputer size={128} color="#57C785" />
                     }
                  />
                  <ExpertiseCard
                     index={3}
                     title="Mobile App Development"
                     description="I develop cross-platform mobile applications that provide a native-like experience on both iOS and Android devices, using frameworks like React Native and Flutter."
                     icon={<HiOutlineDeviceMobile size={128} color="#00B7FF" />}
                  />
               </>
            )}
         </div>
      </div>
   );
}

export default Expertise;
