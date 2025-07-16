'use client';
import React from 'react';
import { MdOutlineMail } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';
import { AiOutlineLinkedin } from 'react-icons/ai';
import { GrDocumentDownload } from 'react-icons/gr';
import Link from 'next/link';
function openEmailClient() {
   const recipient = 'topengdev@outlook.com';
   const subject = 'Hello from Your Portfolio';
   const body =
      'I would like to get in touch with you regarding your portfolio.';

   // Encode the subject and body to handle special characters and spaces
   const encodedSubject = encodeURIComponent(subject);
   const encodedBody = encodeURIComponent(body);

   // Construct the mailto URL
   const mailtoUrl = `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`;

   // Open the mailto URL in the browser, which triggers the default email client
   window.location.href = mailtoUrl;
}

// const url = 'http://localhost:3000/api';
const fileName = 'Christopher_Indrawan.pdf';
const handleDownload = async () => {
   try {
      const response = await fetch(`/download?fileName=${fileName}`);
      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName; // Set the desired filename for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
   } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download file.');
   }
};

function Contact() {
   return (
      <div className="responsive-horizontal-padding h-screen w-full flex flex-col justify-center snap-start">
         <div className="w-1/2">
            <h3 className="font-bold text-amber-200">Contact Me</h3>
            <div className="flex items-start gap-8 flex-col">
               <div className="p-4  flex gap-2 items-center">
                  <MdOutlineMail
                     size={64}
                     className="hover:scale-120 hover:cursor-pointer"
                     onClick={openEmailClient}
                  />
                  <h5>topengdev@outlook.com</h5>
               </div>
               <div className="p-4  flex gap-2 items-center">
                  <Link target="_blank" href={'https://github.com/TopengDev'}>
                     <FaGithub
                        size={64}
                        className="hover:scale-120 hover:cursor-pointer"
                     />
                  </Link>
                  <h5>TopengDev</h5>
               </div>
               <div className="p-4  flex gap-2 items-center">
                  <Link
                     target="_blank"
                     href={
                        'https://www.linkedin.com/in/christopher-indrawan-dev/'
                     }
                  >
                     <AiOutlineLinkedin
                        size={64}
                        className="hover:scale-120 hover:cursor-pointer"
                     />
                  </Link>
                  <h5>Christopher Indrawan</h5>
               </div>
               <div className="p-4  flex gap-2 items-center">
                  <GrDocumentDownload
                     size={64}
                     className="hover:scale-120 hover:cursor-pointer"
                     onClick={handleDownload}
                  />
                  <h5>Download Resume</h5>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Contact;
