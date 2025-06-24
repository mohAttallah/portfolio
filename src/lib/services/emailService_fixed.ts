import nodemailer from "nodemailer";

interface EmailData {
  name: string;
  email: string;
  message: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  private async getTransporter(): Promise<nodemailer.Transporter> {
    if (this.transporter) return this.transporter;

    const EMAIL_USER = process.env.NEXT_PUBLIC_EMAIL_USER; 
    const EMAIL_PASS = process.env.NEXT_PUBLIC_EMAIL_PASS;

    if (!EMAIL_PASS || !EMAIL_USER) {
      console.error("Email configuration missing:", {
        user: !!EMAIL_USER,
        pass: !!EMAIL_PASS
      });
      throw new Error("Email configuration not found");
    }

    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      },
    });

    return this.transporter;
  }

  async sendContactMessage({ name, email, message }: EmailData): Promise<EmailResponse> {
    try {
      const transporter = await this.getTransporter();
      const EMAIL_USER = process.env.EMAIL_USER || process.env.NEXT_PUBLIC_EMAIL_USER;

      const mailOptions = {
        from: EMAIL_USER, 
        replyTo: email,  
        to: EMAIL_USER,
        subject: `Portfolio Contact: ${name}`,
        text: `From: ${name} (${email})\n\nMessage:\n${message}`,
        html: `
          <h3>New message from your portfolio contact form</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `
      };

      await transporter.sendMail(mailOptions);
      
      return {
        success: true,
        message: "Message sent successfully!"
      };
    } catch (error) {
      console.error("Error sending email:", error);
      
      return {
        success: false,
        message: "Failed to send message. Please try again later."
      };
    }
  }

  async sendChatbotEmail({ name, email, message }: EmailData): Promise<EmailResponse> {
    try {
      const transporter = await this.getTransporter();
      const EMAIL_USER = process.env.EMAIL_USER || process.env.NEXT_PUBLIC_EMAIL_USER;

      const mailOptions = {
        from: EMAIL_USER, 
        replyTo: email,  
        to: EMAIL_USER,
        subject: `Chatbot Message from ${name}`,
        text: `From: ${name} (${email})\n\nMessage sent via AI Chatbot:\n${message}`,
        html: `
          <h3>New message from your portfolio AI Chatbot</h3>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 10px 0;">
            <p><strong>Sender:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Source:</strong> AI Chatbot Assistant</p>
          </div>
          <h4>Message:</h4>
          <div style="background: white; padding: 15px; border-left: 4px solid #2196F3; margin: 10px 0;">
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          <hr>
          <p style="color: #666; font-size: 12px;">This message was sent through the AI chatbot on mohammadattallah.live</p>
        `
      };

      await transporter.sendMail(mailOptions);
      
      return {
        success: true,
        message: "Your message has been sent to Mohammad successfully! He will get back to you soon."
      };
    } catch (error) {
      console.error("Error sending chatbot email:", error);
      
      return {
        success: false,
        message: "Failed to send message. Please try again later or use the contact form on the website."
      };
    }
  }
}

export const emailService = new EmailService();
