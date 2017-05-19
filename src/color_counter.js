import hexRgb from 'hex-rgb';
import cssParser from 'css';

export default function colorCounter(file) {
  const data = new Map();
  const ast = cssParser.parse(file);

  ast.stylesheet.rules.forEach((rule) => {
    if (rule.declarations === undefined) return;

    rule.declarations.forEach((declaration) => {
      if (!(declaration.property === 'color')) return;

      let value = declaration.value;

      if (value.includes('important')) {
        value = value.replace('!important', '');
      }

      value = value.trim();

      data.set(value, {
        rgb: hexRgb(value),
        count: (data.get(value) || { count: 0 }).count + 1,
        selectors: (data.get('selectors') || []).concat(rule.selectors),
      });
    });
  });

  return data;
}
