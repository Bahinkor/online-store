import nodeMailer from "nodemailer";

import envConfig from "../../../config/config";

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: envConfig.email.username,
    pass: envConfig.email.password,
  },
});

export default transporter;
