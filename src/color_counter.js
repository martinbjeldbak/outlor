import fs from 'fs';
import hexRgb from 'hex-rgb';
import cssParser from 'css';

export default function colorCounter(filePath) {
  const colors = new Map();
  const ast = cssParser.parse(fs.readFileSync(filePath, 'utf8'), { source: filePath });

  ast.stylesheet.rules.forEach((rule) => {
    if (rule.declarations == undefined) return;

    rule.declarations.forEach((declaration) => {
      if (!(declaration.property === 'color')) return;

      if (declaration.value.includes('important')) {
        declaration.value = declaration.value.replace('!important', '');
      }

      declaration.value = declaration.value.trim();

      colors.set(declaration.value, { rgb: hexRgb(declaration.value),
        count: (colors.get(declaration.value) || { count: 0 }).count + 1,
      });
    });
  });

  return colors;
}
