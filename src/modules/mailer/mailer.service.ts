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
    
    async sendWelcomeMessage(
      welcomeMessage: WelcomeMessageType,
    ) {
        const { fullNames, email, phone } = welcomeMessage;
        try {
          await this.transporter.sendMail({
            from: this.configService.get<string>('MAIL_USER'),
            to: email,
            subject: 'Welcome to Your Free Ride to Work!',
            html: `
                        <h2>FamilyMapNet SOS Alert!</h2>
                        <p><strong>${fullNames || 'A loved one'} may need help.</strong></p>
                        <p><strong>Time:</strong> ${new Date()}</p>
                        <p><strong>Contact:</strong> ${phone || 'N/A'}</p>
                    `,
          });
        } catch (error) {
          throw new InternalServerErrorException(
            `Failed to send panic contact email: ${error.message}`,
          );
        }
      }
}
