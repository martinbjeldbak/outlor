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
  const colors = colorCounter(req.query.file);

  const a = [];
  for (const x of colors) a.push(x);
  a.sort((x, y) => y[1].count - x[1].count);

  // console.log(colors)

  res.render('color', { title: 'Color', colors: new Map(a), query: req._parsedOriginalUrl.query });
});

routes.get('/similarity', (req, res) => {
  res.render('similarity', { title: 'Similarity', query: req._parsedOriginalUrl.query });
});

routes.get('/list', (req, res) => {
  res.render('list', { title: 'List' });
});

routes.post('/upload', (req, res) => {
  console.log(req.files);
  if (!req.files) { return res.status(400).send('No files were uploaded.'); }

  res.redirect(`/color?file=${encodeURIComponent(req.files.css.file)}`);
});


export default routes;
