const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    // 4 parts of mail from to sub,body
    var { to, subject, content } = options; //ya option hamy user ke traf sa mil rha hoga sirf from nhi hogya q ka from to ham khud ha

    //code given by nodemailer
    var transport = nodemailer.createTransport({
      host: process.env.EMAIL_SERVICE_HOST,
      port: process.env.EMAIL_SERVICE_PORT,
      auth: {
        user: process.env.EMAIL_SERVICE_USER,
        pass: process.env.EMAIL_SERVICE_PASSWORD,
      },
    });
    //deining mail optoions
    var mailOptions = {
      from: "munsif-ali-misri-auth-eCommerce-app@service.com",
      to,
      subject,
      text: content,
    };
    //now send email
    await transport.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
module.exports = sendEmail;
