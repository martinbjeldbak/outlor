var fs = require('fs');

export default function colorCounter(filePath) {
  var cssParser = require('css');
  let colors = new Map();
  let ast = cssParser.parse(fs.readFileSync(filePath, 'utf8'), { source: filePath });

  ast.stylesheet.rules.forEach(function(rule) {
    if(rule['declarations'] == undefined) return;

    rule['declarations'].forEach(function(declaration) {
      if(!(declaration['property'] == 'color')) return;

      colors.set(declaration['value'], (colors.get(declaration['value']) || 0) + 1)
    });

  });

  return colors;
}
