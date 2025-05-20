import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';

import { homeRouter } from './routes/home.route';
import { apiCategoryRouter } from './routes/api/category.route';
import { apiVideoRouter } from './routes/api/video.route';
import { adminCategoryRouter } from './routes/admin/categoryAdmin.route';
import { adminVideoRouter } from './routes/admin/videoAdmin.route';
import { adminSignupRouter } from './routes/admin/signupAdmin.route';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: process.env.SESSION_SECRET || 'very-secret',
  resave: false,
  saveUninitialized: false,
}));

app.use('/api/home', homeRouter);
app.use('/api/category', apiCategoryRouter);
app.use('/api/video', apiVideoRouter);

app.use('/admin/category', adminCategoryRouter);
app.use('/admin/video', adminVideoRouter);

app.use('/admin', adminSignupRouter);

export default app;
