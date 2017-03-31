import { Router } from 'express';
import colorCounter from './color_counter';

const routes = Router();


/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.render('index', { title: 'Outler' });
});

routes.get('/color', (req, res) => {
  let colors = colorCounter(req.query.file)

  let a = [];
  for(var x of colors) a.push(x);
  a.sort(function(x, y) { return y[1].count -  x[1].count; });

  res.render('color', { title: 'Color', colors: new Map(a), query: req._parsedOriginalUrl.query });
});

routes.get('/similarity', (req, res) => {
  res.render('similarity', { title: 'Similarity', query: req._parsedOriginalUrl.query });
});

routes.get('/list', (req, res) => {
  res.render('list', { title: 'List' });
});

routes.post('/upload', function(req, res) {
  console.log(req.files);
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  res.redirect('/color?file=' + encodeURIComponent(req.files.css.file))
});


export default routes;
