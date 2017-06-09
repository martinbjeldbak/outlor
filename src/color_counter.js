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

      // remove !important tag if there is one
      if (value.includes('important')) {
        value = value.replace('!important', '');
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

      console.log(value);

      data.set(value, {
        rgb: hexRgb(value),
        count: (data.get(value) || { count: 0 }).count + 1,
        selectors: (data.get('selectors') || []).concat(rule.selectors),
        declarations: (data.get('declarations') || []).concat(rule.declarations.map(x => x.property)),
      });
    });
  });

  return data;
}
