
// import express, { Request, Response, Router } from "express";
// export const sendEmail = async (to: string,subject: string,otp:number
//     ) => {
     
//       const  AWS_SES_REGION  = process.env.AWS_DEFAULT_REGION;
//       const sesInstance = new SES({ "region": AWS_SES_REGION,"accessKeyId": process.env.AWS_ACCESS_KEY_ID, "secretAccessKey":process.env.AWS_SECRET_ACCESS_KEY });
    
//       try {
//         const response = await sesInstance
//           .sendEmail({
//             Message: {
//               Body: {
//                 Html: {
//                   Charset: "UTF-8",
//                   Data: `<p>Your OTP for password reset is <em> ${otp}</em></p><br/>`
//                 },
//                 Text: {
//                   Charset: "UTF-8",
//                   Data: `Your OTP is ${otp}`
//                 },
//               },
//               Subject: {
//                 Charset: "UTF-8",
//                 Data: `${otp}`,
//               },
//             },
//             Source: "ashnalilac@gmail.com",
//             Destination: {
//               ToAddresses: [to],
//             },
//           })
//           .promise();
//         return;
//       } catch (error) {
//         return false;
//       }
//     };