import hexRgb from 'hex-rgb';
import cssParser from 'css';

export default function colorDeclarations(file) {
  const data = new Map();
  const ast = cssParser.parse(file);

  ast.stylesheet.rules.forEach((rule) => {
    if (rule.declarations === undefined) return;

    rule.declarations.forEach((declaration) => {
      // if (!(declaration.property === 'color')) return;
      if (['background-color', 'background', 'border-color', 'border', 'color'].indexOf(declaration.property) === -1) {
        return;
      }

      let value = declaration.value;

      if (value.includes('important')) {
        value = value.replace('!important', '');
      }

      if (value.includes('px')) {
        value = value.split(' ')
        value = value[value.length-1]
      }

      if (value.includes('solid')) {
        value = value.split(' ')
        value = value[value.length-1]
      }
      // if value is a hexa color
      if (value.includes('#')) {
        // if length of value is 4 (short form of hexa code)
        if (value.length == 4) {
          value = value.replace('#', '');
          value = value.split("").map((x) => x.repeat(2)).join('');
          value = '#' + value;
        }

      } else {
        // if value is not a hexa color
        console.log("not a hexa color");

        // color name

        // rgb

        // rgba

        // hsl
      }

      // inherit

      // transparent

      value = value.trim();
      console.log('ADSFDSFD');
      console.log(declaration.property);

      if (!data.get(declaration.property)) {
        data.set(declaration.property, [])
      }

      data.get(declaration.property).push({
        value: value,
        rgb: hexRgb(value),
        selectors: (data.get('selectors') || []).concat(rule.selectors),
      })

      // data.set(declaration.property, {
      //   rgb: hexRgb(value),
      //   count: (data.get(value) || { count: 0 }).count + 1,
      //   selectors: (data.get('selectors') || []).concat(rule.selectors),
      // });
    });
  });

  return data;
}
