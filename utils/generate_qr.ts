import qrImage from 'qr-image';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import { handleFileUpload } from '../middleware/storage.middle';
import { Multer } from 'multer';
import { Readable } from 'stream';
import { tmpdir } from 'os';
import { join } from 'path';
import { writeFile } from 'fs/promises';


const storage = new Storage({
  keyFilename: './.googlecredentials.json', 
});

const bucketName = 'mapet_backend_bucket'; 

export async function generateQRCode(petId: number) {

  const front_env = process.env.FRONT_ENV !== 'production' ? 'http://localhost:3000' : 'https://mapet-five.vercel.app';

  const qrCodeData = `${front_env}/pet/${petId}`;

  const qrCodeBuffer = qrImage.imageSync(qrCodeData, { type: 'png' }); // Convert the stream to a buffer

  // Create a Readable stream from the buffer
  const qrCodeStream = new Readable();
  qrCodeStream.push(qrCodeBuffer);
  qrCodeStream.push(null); // End the stream

  // Create a temporary file path
  const tempFilePath = join(tmpdir(), `${petId}.png`);

  // Write the buffer to the temporary file
  await writeFile(tempFilePath, qrCodeBuffer);  

  // Create a File object with the buffer and metadata
  const qrCodeFile: Express.Multer.File = {
    fieldname: `${petId}.png`, // Replace with the appropriate fieldname
    originalname: `${petId}.png`, // Replace with the appropriate originalname
    encoding: '7bit', // Replace with the appropriate encoding
    mimetype: 'image/png', // Replace with the appropriate mimetype
    buffer: Buffer.from(qrCodeBuffer), // Convert the buffer to a Buffer
    size: qrCodeBuffer.length, // Specify the size of the buffer
    destination: '', // Specify the destination path
    filename: `${petId}.png`, // Specify the filename
    path: tempFilePath, // Specify the file path
    stream: qrCodeStream, // Set stream to null or provide a Readable stream if needed
  };  

  let qrCodeUrl = await handleFileUpload(qrCodeFile)

  return qrCodeUrl;
}


/*
export async function generateQRCode(petId: string) {

  const front_env = process.env.FRONT_ENV !== 'production' ? 'http://localhost:3000' : 'https://mapet-five.vercel.app';

  const qrCodeData = `${front_env}/pet/${petId}`;

  const qrCode = qrImage.image(qrCodeData, { type: 'png' });

  const filename = `${uuidv4()}-${petId}.png`;

  const bucket = storage.bucket(bucketName);

  const fileOptions = {
    destination: filename,
    public: true, 
  };

  await new Promise<void>((resolve, reject) => {
    const file = bucket.file(filename);
    qrCode.pipe(file.createWriteStream(fileOptions))
      .on('error', (err) => {
        console.error('Error al cargar el código QR:', err);
        reject(err);
      })
      .on('finish', () => {
        console.log('Código QR cargado exitosamente');
        resolve();
      });
  });

  const qrCodeUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;

  return qrCodeUrl;
}

*/