import Company from '../models/Company.js';

export const createCompany = async (req, res) => {
  try {
    const { name, address, phone } = req.body;

    // Check for existing company
    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      return res.status(400).json({ error: 'Company with this name already exists' });
    }

    const company = new Company({
      name,
      address,
      phone,
      createdBy: req.user.userId
    });

    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ 
      createdBy: req.user.userId,
      isActive: true 
    }).select('name address phone createdAt');
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findOne({
      _id: req.params.id,
      createdBy: req.user.userId,
      isActive: true
    });
    
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    
    const company = await Company.findOneAndUpdate(
      { 
        _id: req.params.id, 
        createdBy: req.user.userId,
        isActive: true
      },
      { name, address, phone },
      { new: true, runValidators: true }
    );

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    // Soft delete by setting isActive to false
    const company = await Company.findOneAndUpdate(
      { 
        _id: req.params.id, 
        createdBy: req.user.userId,
        isActive: true
      },
      { isActive: false },
      { new: true }
    );

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};