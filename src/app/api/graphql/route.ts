'use server'


import { createYoga } from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";
import nodemailer from "nodemailer";
import { NextRequest } from "next/server";

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

interface YogaContext {
  req: NextRequest;
}

const yoga = createYoga<YogaContext>({
  schema,
  graphqlEndpoint: "/api/graphql",
  context: ({ request }: { request: NextRequest }) => ({ req: request }),
});

export const GET = async (req: NextRequest) => {
  return yoga.handleRequest(req, { req });
};

export const POST = async (req: NextRequest) => {
  return yoga.handleRequest(req, { req });
};