// filepath: d:\billing_system\backend\src\routes\company.js
import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany
} from '../controllers/companyController.js';

const router = express.Router();

// Protect all company routes
router.use(protect);

router.route('/')
  .post(createCompany)
  .get(getCompanies);

router.route('/:id')
  .get(getCompanyById)
  .put(updateCompany)
  .delete(deleteCompany);

export default router;