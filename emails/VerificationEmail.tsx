export interface EmailTemplateProps {
  username: string;
  otp: string;
}

export const EmailTemplate = ({ username, otp }: EmailTemplateProps) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 50px auto;
                  background-color: #ffffff;
                  padding: 20px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  border-radius: 8px;
              }
              .header {
                  text-align: center;
                  padding: 10px 0;
                  background-color: #4CAF50;
                  color: white;
                  border-radius: 8px 8px 0 0;
              }
              .content {
                  padding: 20px;
                  text-align: center;
              }
              .otp {
                  font-size: 24px;
                  font-weight: bold;
                  margin: 20px 0;
              }
              .footer {
                  text-align: center;
                  color: #888;
                  margin-top: 20px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Email Verification</h1>
              </div>
              <div class="content">
                  <p>Hi ${username},</p>
                  <p>Thank you for registering. Please use the following OTP to verify your email address:</p>
                  <div class="otp">${otp}</div>
                  <p>This OTP is valid for the next 10 minutes.</p>
              </div>
              <div class="footer">
                  <p>If you did not request this verification, please ignore this email.</p>
              </div>
          </div>
      </body>
      </html>
    `;
};
