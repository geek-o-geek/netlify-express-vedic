/* Express App */
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import compression from 'compression'
import customLogger from '../utils/logger'

/* My express App */
export default function expressApp(functionName) {
  const app = express()
  const router = express.Router()

  // gzip responses
  router.use(compression())

  // Set router base path for local dev
  const routerBasePath = process.env.NODE_ENV === 'dev' ? `/${functionName}` : `/.netlify/functions/${functionName}/`

  /* define routes */
  router.get('/', (req, res) => {
    res.send('Vedic App Server')
  });

  // Attach logger
  app.use(morgan(customLogger))

  // Setup routes
  app.use(routerBasePath, router)

  // Apply express middlewares
  router.use(cors())
  router.use(bodyParser.json())
  router.use(bodyParser.urlencoded({ extended: true }))

  router.post('/sendMail', (req, res) => {
    const {
      email, name, contact, message
    } = req.body;
    var nodemailer = require('nodemailer');

    if (!email || !name || !contact || !message) {
      return res.status(401).send({ error: 'Mandatory fields are missing' });
    }

    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
         auth: {
              user: 'aarohanamvedic@gmail.com',
              pass: 'Aarohanam9971',
           },
      secure: true,
      });

      const mailData = {
          from: 'aarohanamvedic@gmail.com',
          to: email,
          subject: `Message query from ${name}`,
          html: `<!DOCTYPE html>
          <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width,initial-scale=1">
              <meta name="x-apple-disable-message-reformatting">
              <title></title>
              <!--[if mso]>
              <noscript>
                  <xml>
                      <o:OfficeDocumentSettings>
                          <o:PixelsPerInch>96</o:PixelsPerInch>
                      </o:OfficeDocumentSettings>
                  </xml>
              </noscript>
              <![endif]-->
              <style>
                  table, td, div, h1, p {font-family: Arial, sans-serif;}
                  table, td {border:2px solid #000000 !important;}
              </style>
          </head>
          <body>
          <p>
          Hi, Please find below message from ${name}
          </p>
          <table>
              <tr><td>Message</td><td>${message}</td></tr>
              <tr><td>Contact</td><td>${contact}</td></tr>
          </table>
          </body>
          </html`
        };

        transporter.sendMail(mailOptions, function (err, info) {
          if(err) {
            return console.log(err);
          }
          res.status(200).send({ error: null });
       });
  })

  return app
}
