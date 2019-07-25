const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')

//ClientQueries Model
const ClientQuery = require('../../models/client_queries');

// middleware to use for all requests
router.use(function (req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

//@route Get api/clientQueries
//@desc Get All clientQueries
//@access  Public
router.get('/', (req, res) => {
  ClientQuery.find()
    .then(query => res.json(query))
    .catch(err => res.status(400).json({ msg: err }))
});

// @route POST api/clientQueries
// @desc  Create A clientQueries
// @access Public
router.post('/', (req, res) => {
  console.log(req.body);

  const { request_type, dealership_name, first_name, last_name, phone, email, subject, message } = req.body;

  // Simple validation
  if (!request_type || !dealership_name || !first_name || !last_name || !phone || !email || !subject || !message) {
    return res.status(400).json({ msg: 'Please fill in all the fields' });
  }

  const newClientQuery = new ClientQuery({
    ...req.body
  });
  console.log("sending... to mongo db...."

  );

  const output = `<p>You have a new contact request</p>
                    <h3>Contact Details</h3>
                    <ul>
                      <li>First name: ${req.body.first_name}</li>
                      <li>Last name: ${req.body.last_name}</li>
                      <li>Phone number: ${req.body.phone}</li>
                      <li>Email: ${req.body.email}</li>
                    </ul>
                    <h5>Request type</h5>
                    <p>${req.body.request_type}</p>
                    <h5>Dealership name</h5>
                    <p> ${req.body.dealership_name} </p>
                    <h3>Message</h3>
                    <p>${req.body.message}</p>
                    `

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'support@auto360.com', // generated ethereal user
      pass: '<password>' // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  newClientQuery.save()
    .then(
      query => {
        res.json(query)
        // send mail with defined transport object
        let info =  transporter.sendMail({
          from: `"${req.body.first_name}" "${req.body.last_name}" <${req.body.email}>`, // sender address
          to: "support@auto360.com", // list of receivers
          subject: `"${req.body.subject}"`, // Subject line
          //text: `"${req.body.message}"`, // plain text body
          html: output // html body
        }).then(res => {
          console.log("mail sent", res)
          console.log("Message sent: %s", info.messageId);
        })
          .catch(err => console.log(err))


        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }
    )
    .catch(
      (err) => res.status(400).json({ msg: "Please enter correct information" })
    );

});


// @route   DELETE api/clientQueries/:id
// @desc    Delete A clientQueries
// @access  Public
router.delete('/:id', (req, res) => {
  ClientQuery.findById(req.params.id)
    .then(query => query.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false, msg: "Record not found!" }));
});


module.exports = router
