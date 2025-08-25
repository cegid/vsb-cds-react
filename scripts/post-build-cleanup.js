const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🧹 Starting post-build cleanup...');

const iconFiles = glob.sync('dist/icons/**/*');
const filesToRemove = iconFiles.filter(file => {
  const filename = path.basename(file);

  const usedStyles = [
    'bulk-rounded',
    'duotone-rounded', 
    'solid-rounded',
    'solid-sharp',
    'solid-standard',
    'stroke-rounded',
    'stroke-sharp', 
    'stroke-standard',
    'twotone-rounded'
  ];
  
  const isUsedStyle = usedStyles.some(style => filename.includes(style));
  return !isUsedStyle && !filename.endsWith('.css');
});

filesToRemove.forEach(file => {
  try {
    fs.unlinkSync(file);
    console.log(`Removed: ${file}`);
  } catch (error) {
    console.warn(`Could not remove: ${file}`);
  }
});

const storyFiles = glob.sync('dist/**/*.stories.*');
storyFiles.forEach(file => {
  try {
    fs.unlinkSync(file);
    console.log(`Removed story file: ${file}`);
  } catch (error) {
    console.warn(`Could not remove story file: ${file}`);
  }
});

const testFiles = glob.sync('dist/**/*.{test,spec}.*');
testFiles.forEach(file => {
  try {
    fs.unlinkSync(file);
    console.log(`Removed test file: ${file}`);
  } catch (error) {
    console.warn(`Could not remove test file: ${file}`);
  }
});

const totalRemoved = filesToRemove.length + storyFiles.length + testFiles.length;
console.log(`✅ Cleanup complete! Removed ${totalRemoved} unnecessary files.`);

const finalFiles = glob.sync('dist/**/*').filter(file => fs.statSync(file).isFile());
const totalSize = finalFiles.reduce((acc, file) => {
  return acc + fs.statSync(file).size;
}, 0);

console.log(`📦 Final package contains ${finalFiles.length} files (${(totalSize / 1024 / 1024).toFixed(2)}MB)`);