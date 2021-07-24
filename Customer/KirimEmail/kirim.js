const nodemailer = require('nodemailer');

exports.SendEmail = dataEmail => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: 'oleh.khas1122@gmail.com', 
          pass: 'hfqemgxifuuqlzwn',
        },
      });
    return (
        transporter.sendMail(dataEmail)
        .then(info => console.log(`email terkirim: ${info.message}`))
        .catch(err => console.log(`terjadi kesalahan: ${err}`))
    )
}