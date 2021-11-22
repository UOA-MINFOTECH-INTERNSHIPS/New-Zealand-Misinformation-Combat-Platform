import express from 'express';

const router = express.Router();

import pokemon from './pokemon';
router.use('/pokemon', pokemon);

export default router;