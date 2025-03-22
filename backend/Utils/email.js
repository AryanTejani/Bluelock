import asyncHandler from "./asyncHandler.js";
import nodemailer from 'nodemailer';
import CompanyDetail from "../Config/env.js";

const sendEmail = asyncHandler(async (options) => {
    // Creating the transportation
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: CompanyDetail.EMAIL,
            pass: CompanyDetail.PASSWORD,
        }
    });

    // Define email that what you want to send to the user.
    const emailOption = {
        from: CompanyDetail.EMAIL,
        to: options.email,
        subject: options.subject,
        html: options.message,
    }

    await transporter.sendMail(emailOption);
});

export default sendEmail;