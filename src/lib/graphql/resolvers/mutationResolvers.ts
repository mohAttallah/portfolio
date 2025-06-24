import { emailService } from '../../services/emailService';
import { nlpService } from '../../services/nlpService';
import { checkRateLimit, getClientIP } from '../../utils/rateLimiter';
import type { SendMessageArgs, ChatArgs } from '../../types/graphql';

interface GraphQLContext {
  req: any; 
}

export const mutationResolvers = {
  sendMessage: async (_: unknown, args: SendMessageArgs, context: GraphQLContext) => {
    const clientIP = getClientIP(context.req);
    
    if (!checkRateLimit(clientIP)) {
      return {
        success: false,
        message: "Too many requests. Please try again later."
      };
    }

    try {
      return await emailService.sendContactMessage(args);
    } catch (error) {
      console.error("Error in sendMessage mutation:", error);
      return {
        success: false,
        message: "Server configuration error"
      };
    }
  },
  
  chat: async (_: unknown, { message }: ChatArgs, context: GraphQLContext) => {
    const clientIP = getClientIP(context.req);
    
    if (!checkRateLimit(clientIP)) {
      return {
        message: "Too many requests. Please try again later.",
        confidence: 0,
        intent: 'rate_limited',
        timestamp: new Date().toISOString()
      };
    }

    try {
      if (!message || typeof message !== 'string') {
        return {
          message: "Please provide a valid message.",
          confidence: 0,
          intent: 'error',
          timestamp: new Date().toISOString()
        };
      }

      const result = await nlpService.processMessage(message);
      console.log('Chatbot Response:', result);
      return {
        message: result.message || "I'm sorry, something went wrong.",
        confidence: typeof result.confidence === 'number' ? result.confidence : 0,
        intent: result.intent || 'unknown',
        timestamp: result.timestamp || new Date().toISOString()
      };
    } catch (error) {
      console.error('Chatbot Error:', error);
      return {
        message: "Sorry, I'm having technical difficulties. Please try again later.",
        confidence: 0,
        intent: 'error',
        timestamp: new Date().toISOString()
      };
    }
  }
};