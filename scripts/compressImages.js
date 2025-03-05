const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const MAX_SIZE_MB = 1;
const QUALITY_STEPS = [80, 60, 40, 20]; // Quality levels to try

async function getFilesRecursively(dir) {
    const files = await fs.readdir(dir);
    const allFiles = [];

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
            const subFiles = await getFilesRecursively(filePath);
            allFiles.push(...subFiles);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
                allFiles.push(filePath);
            }
        }
    }

    return allFiles;
}

async function compressImage(inputPath) {
    const ext = path.extname(inputPath).toLowerCase();
    const originalSize = (await fs.stat(inputPath)).size / (1024 * 1024); // Size in MB
    
    if (originalSize <= MAX_SIZE_MB) {
        console.log(`✓ Skipping ${path.basename(inputPath)} (${originalSize.toFixed(2)}MB) - Already under ${MAX_SIZE_MB}MB`);
        return;
    }

    console.log(`Processing ${path.basename(inputPath)} (${originalSize.toFixed(2)}MB)...`);

    let quality = QUALITY_STEPS[0];
    let compressed;
    let attempt = 0;

    while (attempt < QUALITY_STEPS.length) {
        try {
            let sharpInstance = sharp(inputPath);
            
            if (ext === '.png') {
                compressed = await sharpInstance
                    .png({ quality })
                    .toBuffer();
            } else if (ext === '.webp') {
                compressed = await sharpInstance
                    .webp({ quality })
                    .toBuffer();
            } else {
                compressed = await sharpInstance
                    .jpeg({ quality, mozjpeg: true })
                    .toBuffer();
            }

            const compressedSize = compressed.length / (1024 * 1024); // Size in MB

            if (compressedSize <= MAX_SIZE_MB || attempt === QUALITY_STEPS.length - 1) {
                await fs.writeFile(inputPath, compressed);
                console.log(`✓ Compressed ${path.basename(inputPath)} from ${originalSize.toFixed(2)}MB to ${compressedSize.toFixed(2)}MB (Quality: ${quality}%)`);
                break;
            }

            quality = QUALITY_STEPS[++attempt];
        } catch (error) {
            console.error(`Error processing ${inputPath}:`, error);
            break;
        }
    }
}

async function main() {
    try {
        // Process images in public/images
        const imagesDir = path.join(process.cwd(), 'public', 'images');
        const imageFiles = await getFilesRecursively(imagesDir);

        // Process images in public/blog-images
        const blogImagesDir = path.join(process.cwd(), 'public', 'blog-images');
        const blogImageFiles = await getFilesRecursively(blogImagesDir);

        const allImages = [...imageFiles, ...blogImageFiles];

        console.log(`Found ${allImages.length} images to process\n`);

        for (const imagePath of allImages) {
            await compressImage(imagePath);
        }

        console.log('\nImage compression completed!');
    } catch (error) {
        console.error('Error:', error);
    }
}

main(); 