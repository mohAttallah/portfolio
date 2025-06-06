import { nlpService } from '../../services/nlpService';

export const queryResolvers = {
  hello: () => "Hello World",
  chatbotInfo: () => nlpService.getChatbotInfo()
};