import { NextRequest, NextResponse } from "next/server";
import { createYoga } from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";
import nodemailer from "nodemailer";

interface SendMessageArgs {
  name: string;
  email: string;
  message: string;
}

const typeDefs = `
  type Query {
    hello: String
  }
  
  type Mutation {
    sendMessage(name: String!, email: String!, message: String!): SendMessageResponse!
  }
  
  type SendMessageResponse {
    success: Boolean!
    message: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello World" 
  },
  Mutation: {
    sendMessage: async (_: unknown, { name, email, message }: SendMessageArgs) => {
      try {


        const EMAIL_USER = process.env.NEXT_PUBLIC_EMAIL_USER; 
        const EMAIL_PASS = process.env.NEXT_PUBLIC_EMAIL_PASS;
        console.log("EMAIL_USER",  EMAIL_USER);
        console.log("EMAIL_PASS",  EMAIL_PASS);
        if (!EMAIL_PASS) {
          console.error("Email password environment variable not set");
          return {
            success: false,
            message: "Server configuration error"
          };
        }

        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
          },
        });

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
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
});

export async function POST(request: Request) {
  const ctx = {}; 
  return handleRequest(request, ctx);
}