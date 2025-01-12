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
    const { fullNames, email, phone } = welcomeMessage;
    try {
      await this.transporter.sendMail({
        from: this.configService.get<string>('MAIL_USER'),
        to: email,
        subject: 'Welcome to Your Free Ride to Work!',
        html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Wise land form</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      body {
        background-color: rgb(231, 233, 239);
        padding: 25px;
      }
      .cname {
        word-spacing: 8px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1.3rem;
      }

      .container {
        background-color: white;
        padding: 20px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
          sans-serif;
        font-family: sans-serif;

        h1 {
          color: rgb(2, 15, 78);
          font-size: 1.2rem;
          margin-bottom: 30px;
          text-align: center;
        }

        h2 {
          font-size: 1.2rem;
          font-weight: 500;
        }

        figure {
          text-align: center;
          padding: 0;
          margin: 0;
        }

        p {
          margin-block: 10px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <figure>
        <img src="../images/bus-p.png" alt="" height="40" />
      </figure>
      <h1>
        Welcome to Your <br />
        <span class="cname">Free Ride to Work!</span>
      </h1>
      <p>
        Thank you for joining our Free Bus-to-Work Service! We’re excited to
        have you on board and look forward to making your daily commute
        stress-free, comfortable, and convenient.
      </p>
      <p>Here&apos;s everything you need to know to get started:</p>
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
