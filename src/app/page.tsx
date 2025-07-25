'use client';
import About from '@/components/sections/about/about';
import Contact from '@/components/sections/contact/contact';
import Expertise from '@/components/sections/expertise/expertise';
import Hero from '@/components/sections/hero/hero';
import Project from '@/components/sections/projects/project';
import { useEffect, useRef, useState } from 'react';

export default function Page() {
   const [heroRendered, setHeroRendered] = useState(false);
   useEffect(() => {
      setTimeout(() => {
         setHeroRendered(true);
      }, 3000);
   }, []);

   return (
      <div className="snap-y snap-proximity snap-always">
         <div className="snap-center" id="home">
            <Hero />
         </div>
         {heroRendered && (
            <div id="about">
               <About />
            </div>
         )}
         {heroRendered && (
            <div id="expertise">
               <Expertise />
            </div>
         )}
         {heroRendered && (
            <div id="projects" className="flex flex-col gap-80">
               <Project
                  projectName="AI Resume Analyzer"
                  projectDescription="AI-powered service to analyze resume and company compatibility based on ATS-scanability, content quality, structure, and skills qualification"
                  headline="I've Built AI-powered Service"
                  projectThumbnail="/resumind_thumbnail.png"
                  url="https://resumind.topengdev.com"
                  category="SaaS"
               />
               <Project
                  projectName="IOH - Digital Partnerships Portal"
                  projectDescription="uniting various digital entities across various industries in Indonesia through an integrated digital platform that simplifies partnership creation, opens access to various features and resources that can increase growth and enable strategic interactions, with the aim of establishing a new model of partnership in Indonesia."
                  headline="I've Built Real World Digital Solutions"
                  projectThumbnail="/ioh_thumbnail.png"
                  url="https://ioh.co.id/portal/id/ioh-digitalpartnershipsportal"
                  category="Web Development"
               />
               <Project
                  projectName="Mafia Code Community"
                  projectDescription="A community for creating simple(Software as a Service) startup applications with the enhancing both soft skills and hard skills in process.  addition to serving as a portfolio enhancer, the are geared towards generating passive income."
                  headline="I Managed a Community of Developers"
                  projectThumbnail="/mcc_thumbnail.png"
                  url="https://mafiacode.vercel.app/"
                  category="Web Development"
               />
               <Project
                  projectName="KNNEK - Cryptocurrency Community Platform"
                  projectDescription="A place to share, learn, and grow together. We offer a discussion space for beginners looking to dive into the world of crypto. You can also share insights, discuss current trends, or simply exchange ideas with other members who share similar interests."
                  headline="Proficient with Modern Tech Stacks"
                  projectThumbnail="/knnek_thumbnail.png"
                  url="https://knnek.com/"
                  category="Web Development & PWA"
               />
            </div>
         )}
         {heroRendered && (
            <div id="contact">
               <Contact />
            </div>
         )}
      </div>
   );
}
