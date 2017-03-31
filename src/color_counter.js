var fs = require('fs');

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

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
        colors.set(declaration['value'], { rgb: hexToRgb(declaration['value']),
                                           count: (colors.get(declaration['value']) || {count: 0}).count + 1
        })
      }
    });

  });

  return colors;
}
