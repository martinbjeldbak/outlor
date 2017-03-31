var fs = require('fs');
var hexRgb = require('hex-rgb');

export default function colorCounter(filePath) {
  var cssParser = require('css');
  let colors = new Map();
  let ast = cssParser.parse(fs.readFileSync(filePath, 'utf8'), { source: filePath });

  ast.stylesheet.rules.forEach(function(rule) {
    if(rule['declarations'] == undefined) return;

    rule['declarations'].forEach(function(declaration) {
      if(!(declaration['property'] == 'color')) return;

      if(declaration['value'].includes('important')) {
        declaration['value'] = declaration['value'].replace('!important', '')
      }

      if(declaration['value'].includes('#')) {
        colors.set(declaration['value'], { rgb: hexRgb(declaration['value']),
                                           count: (colors.get(declaration['value']) || {count: 0}).count + 1
        })
      }
    });

  });

  return colors;
}
