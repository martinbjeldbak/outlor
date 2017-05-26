import jsdom from 'jsdom';
import request from 'request';
import cheerio from 'cheerio';
import { Router } from 'express';
import colorCounter from './color_counter';

const routes = Router();
const { JSDOM }  = jsdom;

routes.get('/', (req, res) => {
  res.render('index', { title: 'Outler' });
});

routes.get('/color', (req, res) => {
  const url = req.query.url;
  console.log("URL");
  console.log(url);

  request(url, function (error, response, body) {
    const $ = cheerio.load(body)
    let styleSheetHref = $('link[rel="stylesheet"]').attr('href');
    if (!styleSheetHref.includes('https://')) {
      styleSheetHref = url + styleSheetHref;
    }

    request(styleSheetHref, function(error, response, body) {
      const data = colorCounter(body);

      data.forEach((value, key, map) => {
        value.selectors.forEach((selector) => {
          try  {
            // console.log("looking up ", selector);
            const $element = $(selector)
            // console.log('Found with color', value.rgb)
            // console.log($element.text())
          }
          catch(err) {
            console.log("Got error", err.message);
          }
        });
      });

      let a = [];
      for(var x of data) a.push(x);
      a.sort(function(x, y) { return y[1].count -  x[1].count; });
      res.render('color', { title: 'Color', colors: new Map(a), query: req._parsedOriginalUrl.query });
    });
  });



  // const file = req.query.file;
  // const colors = colorCounter(urlBody);
  // console.log(colors);

  // const a = [];
  // for (const x of colors) a.push(x);
  // a.sort((x, y) => y[1].count - x[1].count);

  // console.log(colors)

});

routes.get('/info', (req, res) => {
  const url = req.query.url
  const color = req.query.color
  res.render('info');
})

routes.get('/similarity', (req, res) => {
  res.render('similarity', { title: 'Similarity', query: req._parsedOriginalUrl.query });
});

routes.get('/list', (req, res) => {
  res.render('list', { title: 'List' });
});

// routes.post('/upload', (req, res) => {

//   console.log("asdf");
//   console.log(req.body);
//   if (!req.files) { return res.status(400).send('No files were uploaded.'); }

//   res.redirect(`/color?file=${encodeURIComponent(req.files.css.file)}`);
// });


export default routes;
