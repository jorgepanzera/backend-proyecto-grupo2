import qrImage from 'qr-image';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';


const storage = new Storage({
  keyFilename: './.googlecredentials.json', 
});

const bucketName = 'mapet_backend_bucket'; 

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