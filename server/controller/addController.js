const nodemailer = require('nodemailer');
const mailGen = require('mailgen');
const Add = require('../model/addSchema');
const myEmail = process.env.SENDER_EMAIL;
const myPass = process.env.GMAIL_APP_PASSWORD

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
        
    } catch (error) {
        let errorObj = {
            message: 'failed to get partners',
            payload: error
        }

        console.log(errorObj);

        res.json({errorObj});
    }
}

//getting the info about one partner by there id
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
