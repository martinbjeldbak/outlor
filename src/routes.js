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
  res.render('color', { title: 'Color', colors: colors });
});

routes.get('/similarity', (req, res) => {
  res.render('similarity', { title: 'Similarity' });
});

routes.get('/list', (req, res) => {
  res.render('list', { title: 'List' });
});


export default routes;
