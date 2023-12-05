import nodemailer from "nodemailer";
import { mail_password, mail_username } from "../setting";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mail_username,
    pass: mail_password,
  },
});

const format_message = (user_name: string, download_string: string) => {
  return `Dear ${user_name},<br>
    <br>
    We hope this email finds you in good spirits. We sincerely appreciate your recent purchase of the following eBooks from BookStore:<br>
    <br>
    ${download_string}
    <br>
    We're delighted to provide you with immediate access to your purchased content. However, please note that for security reasons, these download links will only remain active for the next 60 minutes.<br>
    <br>
    Kindly ensure you download your eBooks within this timeframe to avoid any inconvenience. Should you encounter any difficulties or require further assistance, please don't hesitate to reach out to our customer support team at support@example.com.<br>
    <br>
    Thank you for choosing BookStore for your eBook needs. We appreciate your business and hope you enjoy your reading experience.<br>
    <br>
    Best regards,<br>
    <br>
    BookStore
    `;
};

export const send_mail = (
  to: string,
  user_name: string,
  download_string: string
) => {
  var mailOptions = {
    from: "BookStore <paige.21522917@gmail.com>",
    to: to,
    subject: "Sending Download URL",
    html: format_message(user_name, download_string),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
