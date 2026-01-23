import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
  { input: 'youtube-red-transparent.png', output: 'youtube-red-transparent.webp' }
];

async function convert() {
  for (const img of images) {
    try {
      const inputPath = path.join(__dirname, 'public', 'images', img.input);
      const outputPath = path.join(__dirname, 'public', 'images', img.output);
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`Converted ${img.input} to ${img.output}`);
    } catch (err) {
      console.error(`Error converting ${img.input}:`, err);
      process.exit(1);
    }
  }
}

convert();