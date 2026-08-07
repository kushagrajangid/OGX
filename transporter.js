const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kushagra.jangid.2007@gmail.com',
    pass: 'idfo mmyi obos wxpu'
  }
});

module.exports = transporter;