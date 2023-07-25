const express = require('express');
const router = express();

const {sendEmail, confirmationEmail, getAllPartners, getOnePartner} = require('../controller/addController');

//creating a new add order
//localhost:5000/api/placeOrder
// router.post('/placeOrder', placeOrder);


//sendEmail
//localhost:5000/api/getEmail
// router.get('/getEmail', (req, res)=>
// sendEmail()
// .then((response)=> res.send(response.message))
// .catch((e)=> res.status(500).send(e.message))
// );

//post api
//localhost:5000/api/sendEmail
// router.post('/sendEmail', (req,res)=>{
//     sendEmail(req.body)
//     .then((response)=> res.send(response.message))
//     .catch((e)=> res.status(500).send(e.message))
// });
router.post('/sendEmail', sendEmail);


//localhost:5000/api/confirm
//get notiffication
router.post('/confirm', confirmationEmail);

//localhost:5000/api/partners
router.get('/partners', getAllPartners);

//localhost:5000/api/partnerDetails/:_id
router.get('/partnerDetails/:_id', getOnePartner);

module.exports = router;