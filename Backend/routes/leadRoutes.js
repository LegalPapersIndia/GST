// routes/leadRoutes.js

const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

// ======================
// Public Form Submission - ONLY Database Save
// ======================
router.post('/leadRoutes', limiter, async (req, res) => {
  const payload = req.body;

  try {
    const lead = new Lead({
      rawPayload: payload,

      application_type: payload.application_type,
      applicant_name: payload.applicant_name,
      email: payload.email,
      mobile: payload.mobile,
      nature_of_business: payload.nature_of_business,
      designation: payload.designation,
      house_no: payload.house_no,
      area_locality: payload.area_locality,
      city: payload.city,
      district: payload.district,
      state: payload.state,
      pin: payload.pin,

      leadSource: payload.leadSource || 'gstregistration.org',
      serviceCategory: payload.serviceCategory || 'gstReg',
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      status: 'new',
      submittedAt: new Date()
    });

    await lead.save();

    console.log(`✅ GST Lead Saved in Database: ${lead.applicant_name || 'Unknown'}`);

    res.status(200).json({ 
      success: true, 
      message: 'Lead saved successfully in database' 
    });

  } catch (dbErr) {
    console.error('❌ Database Save Failed:', dbErr);
    return res.status(500).json({ 
      success: false, 
      message: 'Database save failed' 
    });
  }
});


const adminAuth = require('../middleware/adminAuth');

router.get('/api/leads', adminAuth, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ submittedAt: -1 });
    res.json(leads);
  } catch (err) {
    console.error('❌ Error fetching leads:', err);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

module.exports = router;