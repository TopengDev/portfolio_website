'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function Project({
   headline,
   projectName,
   projectDescription,
   projectThumbnail,
   url,
   category,
}: {
   headline: string;
   projectName: string;
   projectDescription: string;
   projectThumbnail: string;
   url?: string;
   category?: string;
}) {
   const sectionHeadlineRef = useRef<any>(null);

   const sectionHeadlineInView = useInView(sectionHeadlineRef, {
      once: true,
      amount: 'all',
   });

   return (
      <section className="responsive-horizontal-padding w-full h-screen pt-12 snap-start">
         <div
            className="z-10 bg-background sticky top-0 pt-8"
            ref={sectionHeadlineRef}
         >
            <motion.h3 className=" bg-gradient-to-r from-amber-200 to-amber-700 bg-clip-text text-transparent  font-extrabold ">
               {sectionHeadlineInView &&
                  headline.split('').map((letter, index) => (
                     <motion.span
                        key={index}
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
         {sectionHeadlineInView && (
            <motion.div
               className="h-[80vh] w-full lg:w-3/4"
               initial={{
                  opacity: 0,
                  translateY: '120%',
               }}
               animate={{
                  opacity: 1,
                  translateY: '0%',
                  transition: {
                     duration: 1,
                     ease: 'easeOut',
                  },
               }}
            >
               <div className="w-full h-[85%] lg:h-full relative group overflow-hidden ">
                  <Image
                     src={projectThumbnail}
                     alt={projectName}
                     fill
                     className="object-contain lg:object-cover group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 w-full">
                     <div className="bg-black opacity-75 h-full w-full p-8 ">
                        <div className="flex flex-col gap-4 w-full lg:w-2/3">
                           <h5 className="bg-gradient-to-r from-amber-200 to-amber-700 bg-clip-text text-transparent font-bold">
                              {projectName}
                           </h5>
                           <p>{projectDescription}</p>
                           {url && (
                              <div className="lg:h-6 group-hover:h-12 flex flex-col gap-2 overflow-hidden ">
                                 {category && (
                                    <p className="hidden lg:block group-hover:-translate-y-full">
                                       {category}
                                    </p>
                                 )}
                                 <Link href={url}>
                                    <Button
                                       className="hover:cursor-pointer text-semibold group-hover:-translate-y-[90%]"
                                       variant={'outline'}
                                    >
                                       <p>Visit Project</p>
                                    </Button>
                                 </Link>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
         )}
      </section>
   );
}

export default Project;
