import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}

  private transporter = nodemailer.createTransport({
    host: this.configService.get<string>('MAIL_HOST'),
    port: this.configService.get<number>('MAIL_PORT'),
    secure: true,
    auth: {
      user: this.configService.get<string>('MAIL_USER'),
      pass: this.configService.get<string>('MAIL_PASS'),
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  async sendWelcomeMessage(welcomeMessage: WelcomeMessageType) {
    const { fullNames, email } = welcomeMessage;
    try {
      await this.transporter.sendMail({
        from: this.configService.get<string>('MAIL_USER'),
        to: email,
        subject: 'Welcome to Your Free Ride to Work!',
        html: `
         <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Welcome Email</title>
            </head>
            <body
              style="
                background-color: #f4f4f4;
                font-family: Arial, sans-serif;
                padding: 20px;
                margin: 0;
              "
            >
              <div
                style="
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                  overflow: hidden;
                "
              >
                <!-- Header -->
                <div
                  style="
                    background-color: #081b31;
                    color: #ffffff;
                    text-align: center;
                    padding: 20px;
                  "
                >
                  <img
                    src="https://thumbs.dreamstime.com/b/white-tour-bus-10177874.jpg"
                    alt="Bus Icon"
                    style="height: 50px; margin-bottom: 10px"
                  />
                  <h1 style="font-size: 24px; margin: 0; font-weight: bold">
                    Welcome to Your Free Ride to Work!
                  </h1>
                </div>

                <!-- Content -->
                <div style="padding: 20px">
                  <p style="font-size: 14px; color: #333333; line-height: 1.6">
                    Dear <strong>${fullNames}</strong>,
                  </p>
                  <p style="font-size: 14px; color: #333333; line-height: 1.6">
                    We're thrilled to welcome you to our
                    <strong>Free Bus-to-Work Service</strong>! Our mission is to make your
                    daily commute stress-free, comfortable, and enjoyable.
                  </p>
                  <p style="font-size: 14px; color: #333333; line-height: 1.6">
                    Here’s everything you need to know to get started:
                  </p>
                  <ul
                    style="
                      font-size: 16px;
                      color: #333333;
                      line-height: 1.6;
                      list-style-type: square;
                    "
                  >
                    <li>📅 Please ensure you arrive at the pickup point on time.</li>
                    <li>
                      📞 For any questions, feel free to contact us at
                      <a href="tel:+2347038991962" style="color: #002a5e"
                        >+2347038991962</a
                      >.
                    </li>
                  </ul>
                  <p style="font-size: 14px; color: #333333; line-height: 1.6">
                    Thank you for joining us. We’re excited to have you on board!
                  </p>
                </div>

                <div
                  style="
                    background-color: #f9f9f9;
                    text-align: center;
                    padding: 15px;
                    border-top: 1px solid #dddddd;
                  "
                >
                  <p style="font-size: 14px; color: #666666; margin: 10px 0 0">
                    © 2025 Free Ride to Work, All Rights Reserved.
                  </p>
                </div>
              </div>
            </body>
          </html>

          `,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to send panic contact email: ${error.message}`,
      );
    }
  }
}
