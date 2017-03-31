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
  let colors = colorCounter('public/assets/site-6d400c95.css')

  let a = [];
  for(var x of colors) a.push(x);
  a.sort(function(x, y) { return y[1].count -  x[1].count; });

  console.log(colors)

  res.render('color', { title: 'Color', colors: new Map(a) });
});

routes.get('/similarity', (req, res) => {
  res.render('similarity', { title: 'Similarity' });
});

routes.get('/list', (req, res) => {
  res.render('list', { title: 'List' });
});


export default routes;
