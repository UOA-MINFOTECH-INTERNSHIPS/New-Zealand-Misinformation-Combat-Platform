import express from 'express';

const router = express.Router();

import user from './user';
router.use('/user', user);

import article from artilces;
router.use('/articles', article);

export default router;
