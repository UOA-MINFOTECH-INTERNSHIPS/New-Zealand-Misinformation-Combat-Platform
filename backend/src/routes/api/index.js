import express from 'express';

const router = express.Router();

import user from './user';
router.use('/user', user);

import article from './articles';
router.use('/articles', article);

import factchecker from './factchecker';
router.use('/factchecker', factchecker);

import mission from './mission';
router.use('/mission', mission);


export default router;
