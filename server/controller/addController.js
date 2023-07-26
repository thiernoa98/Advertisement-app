const nodemailer = require('nodemailer');
const mailGen = require('mailgen');
//bringin schema
const Add = require('../model/addSchema');

//create the order function
//might not use it
// async function placeOrder(req,res) {
//     try {
//         //create the order, get user info and all
//         const {firstName,lastName,email,businessName,partnerName} = req.body;

//         //build the order
//         let newOrderObj = {
//             firstName: firstName,
//             lastName: lastName,
//             email: email,
//             businessName: businessName,
//             partnerName:partnerName
//         }
//         //create and save
//         await Add.create(newOrderObj);
//         res.json({
//             message: 'success',
//             payload: newOrderObj
//         })
//     } catch (error) {
//         let errorObj = {
//             message: 'failed to create an order',
//             payload: error
//         } 

//         console.log(errorObj);
//         res.json({errorObj})
//     }
// }

const myEmail = process.env.SENDER_EMAIL;
const myPass = process.env.GMAIL_APP_PASSWORD

//{receiver_email, subject, message}
// async function sendEmail({client_email, subject, message}) {

//     return new Promise((resolve, reject)=>{
//         let transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: myEmail,
//                 pass: myPass //application password that permit us to use gmail
//             }
//         })

//         const mailConfig = {
//             from: client_email,
//             to: myEmail,
//             subject: subject,
//             text: message
//         };

//         transporter.sendMail(mailConfig, function (error, info) {
//             if (error) {
//                 console.log(error);
//                 return reject({message: 'an error occured when sending email'})
//             }else{
//                 return resolve({message: 'email sent successfully'})
//             }

//         })



//     })
// }


//not fully funtional as it only send emails from me
async function sendEmail(req,res) {
    try {
        let {client_fname, client_lname, client_email, subject, message} = req.body;
        
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: myEmail,
                pass: myPass
            }
        })

        //this creates new gamils 
        let mailGenerator = new mailGen({
            theme: 'default',
            product: {
                name: 'Nile Add',
                link: 'https://mailgen.js/',
                // logo: ''
            }
        })

        let email = {
            body: {
                name: 'Nile Add', 
                intro: `You have a message from ${client_fname}`,
                table: {
                    data: [
                        {
                            Client_Name: client_fname, client_lname,
                            Client_Email: client_email, 
                            Subject: subject,
                            Message: message,
                        }
                    ]
                },
                
            }
        }
        
        //getting the new gamil
        let mail = mailGenerator.generate(email);

        const mailConfig = {
            from: `Nile Add inquiries ${myEmail}`,
            to: myEmail,
            subject: `A message from ${client_fname} ${client_lname}`,
            html: mail
        };

        transporter.sendMail(mailConfig)

        res.send(message);

    } catch (error) {
        let errorObj = {
            message: 'failed to send email',
            payload: error
        }

        console.log(errorObj);

        res.json({errorObj});
    }

}


//getting all the partners
async function getAllPartners(req, res) {
    try {
        let data = await Add.find({});
        res.json({
            message: 'success',
            payload: data
        })
        
        // console.log('data: ', data);
    } catch (error) {
        let errorObj = {
            message: 'failed to get partners',
            payload: error
        }

        console.log(errorObj);

        res.json({errorObj});
    }
}

//geetting the info about one partner by there id
async function getOnePartner(req,res) {
    try {
        let foundPartner = await Add.findOne({_id: req.params._id});

        res.json({
            message: 'success',
            payload: foundPartner
        })

    } catch (error) {
        let errorObj = {
            message: 'failed to get partner details',
            payload: error
        }

        console.log(errorObj);

        res.json({errorObj});
    }
}
//fully functonal
//confirmation email
async function confirmationEmail(req,res) {
    try {
        let {client_fname, client_lname, client_email, client_phone, partnerName
        ,client_business, client_product, businessDesc, client_price} = req.body;
        
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: myEmail,
                pass: myPass
            }
        })

        //this creates new gamils 
        let mailGenerator = new mailGen({
            theme: 'default',
            product: {
                name: 'Nile Add',
                link: 'https://mailgen.js/',
                // logo: ''
            }
        })

        let email = {
            body: {
                name: client_fname, client_lname,
                intro: 'This is your confirmation email',
                table: {
                    data: [
                        {
                            partner_name: partnerName,
                            Business_name: client_business, 
                            product: client_product,
                            description: businessDesc,
                            Phone_number: client_phone,
                            offered_price: client_price
                        },
                        // {
                        //     item: 'cleancoder',
                        //     description: 'A programming book to help you code better',
                        //     price: '$50.91'
                        // }
                    ]
                },
                outro: `loking forward to doing more business with you ${client_fname}`
            }
        }
        //getting the new gamil
        let mail = mailGenerator.generate(email);

        const mailConfig = {
            from: `Nile Add ${myEmail}`,
            to: client_email,
            subject:'order confirmation',
            html: mail
        }; 

        transporter.sendMail(mailConfig);


    } catch (error) {
        let errorObj = {
            message: 'failed to send Notification',
            payload: error
        }

        console.log(errorObj);

        res.json({errorObj});
    }
}


//export to router
module.exports = {sendEmail, confirmationEmail, getAllPartners, getOnePartner}