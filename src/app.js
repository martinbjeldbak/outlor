import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import bb from 'express-busboy';
import routes from './routes';

const app = express();
app.disable('x-powered-by');


bb.extend(app, {
  upload: true,
  path: 'public/assets',
  allowedPath: /^\/upload$/,
});

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev', {
  skip: () => app.get('env') === 'test',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/', routes);
app.use(fileUpload());

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message,
    });
});

export default app;
