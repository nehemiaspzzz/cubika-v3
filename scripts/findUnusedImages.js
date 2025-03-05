const fs = require('fs').promises;
const path = require('path');

async function getAllImages() {
    const images = new Set();
    const directories = ['public/images', 'public/blog-images'];

    for (const dir of directories) {
        try {
            const files = await fs.readdir(dir);
            for (const file of files) {
                if (file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
                    // Store without the 'public/' prefix as that's how they're referenced in code
                    images.add(path.join(dir.replace('public/', ''), file));
                }
            }
        } catch (error) {
            console.log(`Directory ${dir} not found or not accessible`);
        }
    }

    return images;
}

async function findImagesInFile(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    const imageRefs = new Set();

    // Patrones de búsqueda mejorados
    const patterns = [
        // Importaciones directas
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/public\/(.*?\.(?:jpg|jpeg|png|gif|webp))['"]/, // ../../../../public/
        /from\s+['"]\.\.\/\.\.\/\.\.\/public\/(.*?\.(?:jpg|jpeg|png|gif|webp))['"]/, // ../../../public/
        /from\s+['"]\.\.\/\.\.\/public\/(.*?\.(?:jpg|jpeg|png|gif|webp))['"]/, // ../../public/
        /from\s+['"]\.\.\/public\/(.*?\.(?:jpg|jpeg|png|gif|webp))['"]/, // ../public/
        
        // Referencias en src
        /src=["']\/?(?:images|blog-images)\/(.*?\.(?:jpg|jpeg|png|gif|webp))["']/, // src="/images/" o src="images/"
        
        // Referencias en className o backgroundImage
        /bg-[^"'\s]*(?:jpg|jpeg|png|gif|webp)/, // Clases de Tailwind con imágenes
        /url\(["']?\/?(?:images|blog-images)\/(.*?\.(?:jpg|jpeg|png|gif|webp))["']?\)/, // url() en CSS
        
        // Variables que contienen rutas de imágenes
        /heroImage:\s*["'](.*?\.(?:jpg|jpeg|png|gif|webp))["']/, // heroImage: "imagen.jpg"
        /image:\s*["']\/?(?:images|blog-images)\/(.*?\.(?:jpg|jpeg|png|gif|webp))["']/, // image: "/images/imagen.jpg"
        
        // Importaciones con alias
        /import\s+.*?\s+from\s+["']@\/.*?\/(.*?\.(?:jpg|jpeg|png|gif|webp))["']/, // import con alias @/
        
        // Referencias en strings
        /["']\/?(?:images|blog-images)\/(.*?\.(?:jpg|jpeg|png|gif|webp))["']/ // Cualquier string con ruta de imagen
    ];

    for (const pattern of patterns) {
        const matches = content.match(new RegExp(pattern, 'gi')) || [];
        matches.forEach(match => {
            // Extraer el nombre del archivo de la coincidencia
            const fileName = match.match(/[^\/\\&\?]+\.\w{3,4}(?=([\?&].*$|$))/);
            if (fileName) {
                // Buscar la ruta completa en las carpetas de imágenes
                if (match.includes('blog-images/')) {
                    imageRefs.add(path.join('blog-images', fileName[0]));
                } else {
                    imageRefs.add(path.join('images', fileName[0]));
                }
            }
        });
    }

    // Buscar referencias en strings multilínea
    const stringMatches = content.match(/`[^`]*`|'[^']*'|"[^"]*"/g) || [];
    stringMatches.forEach(match => {
        if (match.includes('images/') || match.includes('blog-images/')) {
            const fileMatch = match.match(/[^\/\\&\?]+\.\w{3,4}(?=([\?&].*$|$))/);
            if (fileMatch) {
                if (match.includes('blog-images/')) {
                    imageRefs.add(path.join('blog-images', fileMatch[0]));
                } else {
                    imageRefs.add(path.join('images', fileMatch[0]));
                }
            }
        }
    });

    return imageRefs;
}

async function searchDirectory(dir, usedImages) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
            // Skip node_modules, .next, y otros directorios no relevantes
            if (!['node_modules', '.next', '.git', 'dist', 'build'].includes(entry.name)) {
                await searchDirectory(fullPath, usedImages);
            }
        } else if (entry.name.match(/\.(js|jsx|ts|tsx|css|scss|md|mdx)$/)) {
            const imagesInFile = await findImagesInFile(fullPath);
            imagesInFile.forEach(image => usedImages.add(image));
        }
    }
}

async function main() {
    try {
        console.log('Scanning for images...');
        const allImages = await getAllImages();
        console.log(`Found ${allImages.size} total images in public directories`);

        console.log('\nAnalyzing code for image usage...');
        const usedImages = new Set();
        await searchDirectory('.', usedImages);
        console.log(`Found ${usedImages.size} images referenced in code`);

        // Find unused images
        const unusedImages = new Array(...allImages).filter(image => !usedImages.has(image));
        
        if (unusedImages.length > 0) {
            console.log('\nPotentially unused images:');
            unusedImages.forEach(image => {
                console.log(`- public/${image}`);
            });

            console.log('\n⚠️  IMPORTANT: Please review the list carefully before deleting.');
            console.log('Some images might be used in ways not detected by the script.');
            console.log('Would you like to see the list of images that ARE being used? (yes/no)');
            
            const readline = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            });

            readline.question('', async (answer) => {
                if (answer.toLowerCase() === 'yes') {
                    console.log('\nImages detected as being used:');
                    Array.from(usedImages).sort().forEach(image => {
                        console.log(`- ${image}`);
                    });
                }

                console.log('\nWould you like to delete the potentially unused images? (yes/no)');
                readline.question('', async (deleteAnswer) => {
                    if (deleteAnswer.toLowerCase() === 'yes') {
                        console.log('\nDeleting unused images...');
                        for (const image of unusedImages) {
                            try {
                                await fs.unlink(path.join('public', image));
                                console.log(`✓ Deleted: public/${image}`);
                            } catch (error) {
                                console.error(`Error deleting public/${image}:`, error.message);
                            }
                        }
                        console.log('\nDeletion completed!');
                    } else {
                        console.log('Operation cancelled. No images were deleted.');
                    }
                    readline.close();
                });
            });
        } else {
            console.log('\nNo unused images found! All images appear to be in use.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

main(); 