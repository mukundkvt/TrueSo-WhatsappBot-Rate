import express from 'express';
import {  updateGoldRate } from '../controllers/metalController.js';

const router = express.Router();

// POST to update gold & silver rates
// router.post('/update-rate', addMetalRate);

// // GET to fetch current gold & silver rates
// router.get('/current-rate', getMetalRate);
router.post('/update-gold', updateGoldRate);

export default router;
