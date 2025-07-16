// app/api/download/route.js
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: any) {
   const { searchParams } = new URL(request.url);
   const fileName = searchParams.get('fileName');

   if (!fileName) {
      return new Response('Missing fileName parameter', { status: 400 });
   }

   const filePath = path.join(process.cwd(), 'public', fileName); // Adjust path as needed

   try {
      const fileBuffer = await fs.readFile(filePath);
      const contentType = 'application/octet-stream'; // Or determine based on file extension

      return new Response(fileBuffer, {
         headers: {
            'Content-Type': contentType,
            'Content-Disposition': `attachment; filename="${fileName}"`,
         },
      });
   } catch (error) {
      console.error('Error downloading file:', error);
      return new Response('File not found', { status: 404 });
   }
}
