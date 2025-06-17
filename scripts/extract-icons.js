const fs = require('fs');
const path = require('path');

const extractIconNames = () => {
  try {
    const cssPath = path.resolve(__dirname, '../src/theme/icons/hugeicons-font.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    
    const iconMatches = cssContent.match(/\.hgi-([a-z0-9-]+):before/gi);
    
    if (!iconMatches) {
      console.warn('Aucune icône trouvée dans le CSS');
      return [];
    }
    
    const iconNames = iconMatches
      .map(match => match.replace(/^\.hgi-/, '').replace(/:before$/, ''))
      .filter((name, index, arr) => arr.indexOf(name) === index)
      .sort();
    
    const outputPath = path.resolve(__dirname, '../src/theme/icons/icons-list.json');
    fs.writeFileSync(outputPath, JSON.stringify(iconNames, null, 2));
    
    console.log(`${iconNames.length} icônes extraites et sauvées dans icons-list.json`);
    return iconNames;
    
  } catch (error) {
    console.error('Erreur lors de l\'extraction des icônes:', error);
    return [];
  }
};

extractIconNames();