const express = require('express');
const router = express();

const {sendEmail, confirmationEmail, getAllPartners, getOnePartner} = require('../controller/addController');

router.post('/sendEmail', sendEmail);

//get notiffication
router.post('/confirm', confirmationEmail);

//localhost:5000/api/partners
router.get('/partners', getAllPartners);

//localhost:5000/api/partnerDetails/:_id
router.get('/partnerDetails/:_id', getOnePartner);

module.exports = router;
