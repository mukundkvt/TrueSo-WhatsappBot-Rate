import express from 'express';
import {  updateGold18KtRate, updateGold22KtRate } from '../controllers/metalController.js';

const router = express.Router();

// POST to update gold & silver rates
// router.post('/update-rate', addMetalRate);

// // GET to fetch current gold & silver rates
// router.get('/current-rate', getMetalRate);
router.post('/update-gold18kt', updateGold18KtRate);
router.post('/update-gold22kt', updateGold22KtRate);

export default router;
