'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import HeroHeadline from './heroHeadline';
import Link from 'next/link';

function Hero() {
   return (
      <div className="w-screen h-screen flex items-center justify-center flex-col snap-start">
         {/* HERO SECTION */}
         <motion.section className="w-full h-screen relative">
            <motion.div
               initial={{ opacity: 0 }}
               animate={{
                  opacity: 1,
                  transition: {
                     type: 'decay',
                     duration: 2.0,
                  },
               }}
            >
               <Image
                  src={`/hero_bg.jpg`}
                  fill
                  alt="Hero Background"
                  objectFit="cover"
                  className="bg-blend-multiply brightness-75 absolute top-0 left-0 blur-xs z-0 pointer-events-none"
               />
            </motion.div>

            {/* HEADLINE */}
            <HeroHeadline />
            {/* HEADLINE */}

            {/* NAV */}
            {/* <div className="z-20 responsive-horizontal-padding h-screen w-1/4 flex flex-col items-center justify-center fixed top-0 right-0 transparent peer" /> */}
            <motion.nav
               className="hidden  z-20 responsive-horizontal-padding h-screen w-1/4 lg:flex flex-col items-center justify-center fixed top-0 right-0 text-amber-200"
               initial={{
                  translateX: '100%',
               }}
               animate={{
                  translateX: '0%',
                  transition: { duration: 2.8, ease: 'easeOut', type: 'tween' },
               }}
            >
               <Link
                  href="#home"
                  className="xl:py-12 lg:py-8 hover:cursor-pointer hover:tracking-[50%]"
               >
                  <h4>HOME</h4>
               </Link>
               <hr className="h-1 w-full bg-amber-200 rounded-xl" />
               <Link
                  href="#about"
                  className="xl:py-12 lg:py-8 hover:cursor-pointer hover:tracking-[50%]"
               >
                  <h4>ABOUT</h4>
               </Link>
               <hr className="h-1 w-full bg-amber-200 rounded-xl" />
               <Link
                  href="#expertise"
                  className="xl:py-12 lg:py-8 hover:cursor-pointer hover:tracking-[50%]"
               >
                  <h4>EXPERTISE</h4>
               </Link>
               <hr className="h-1 w-full bg-amber-200 rounded-xl" />
               <Link
                  href="#projects"
                  className="xl:py-12 lg:py-8 hover:cursor-pointer hover:tracking-[50%]"
               >
                  <h4>PROJECTS</h4>
               </Link>
               <hr className="h-1 w-full bg-amber-200 rounded-xl" />
               <Link
                  href="#contact"
                  className="xl:py-12 lg:py-8 hover:cursor-pointer hover:tracking-[50%]"
               >
                  <h4>CONTACT</h4>
               </Link>
            </motion.nav>
            {/* NAV */}
         </motion.section>
         {/* HERO SECTION */}
      </div>
   );
}

export default Hero;
