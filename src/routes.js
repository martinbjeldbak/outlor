import fs from 'fs';
import { Router } from 'express';
import colorCounter from './color_counter';

const routes = Router();

routes.get('/', (req, res) => {
  res.render('index', { title: 'Outler' });
});

routes.get('/color', (req, res) => {
  const file = req.query.file;
  const colors = colorCounter(fs.readFileSync(file, 'utf8'), { source: file });
  console.log(colors);

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
  if (!req.files) { return res.status(400).send('No files were uploaded.'); }

  res.redirect(`/color?file=${encodeURIComponent(req.files.css.file)}`);
});


export default routes;
