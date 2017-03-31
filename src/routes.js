import { Router } from 'express';

const routes = Router();

/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.render('index', { title: 'Outler' });
});

routes.get('/color', (req, res) => {
  res.render('color', { title: 'Color' });
});

routes.get('/similarity', (req, res) => {
  res.render('similarity', { title: 'Similarity' });
});

routes.get('/list', (req, res) => {
  res.render('list', { title: 'List' });
});


export default routes;
