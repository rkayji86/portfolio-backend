import express from 'express';
import { validateContact } from '../middlewares/contactValidations.js';
import { submitContact } from '../controllers/contactController.js';

const router = express.Router();

// POST /api/contact
router.post('/', validateContact, submitContact);

export default router;