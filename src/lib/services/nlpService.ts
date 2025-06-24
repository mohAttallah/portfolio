import { NlpManager } from 'node-nlp';
import trainingData from '../data/trainingData.json';
import chatbotInfo from '../data/chatbotInfo.json';

interface TrainingItem {
  intent: string;
  utterances: string[];
  answer: string;
}

class NLPService {
  private manager: any;
  private isModelTrained = false;

  constructor() {
    try {
      this.manager = new NlpManager({ languages: ['en'] });
    } catch (error) {
      console.error('Error initializing NLP Manager:', error);
      this.manager = null;
    }
  }

  private getTrainingData(): TrainingItem[] {
    return trainingData;
  }

  async trainModel() {
    this.isModelTrained = false;

    if (!this.manager) {
      throw new Error('NLP Manager not initialized');
    }

    try {

      const trainingData = this.getTrainingData();

      trainingData.forEach(data => {
        data.utterances.forEach(utterance => {
          this.manager.addDocument('en', utterance, data.intent);
        });
      });

      trainingData.forEach(data => {
        this.manager.addAnswer('en', data.intent, data.answer);
      });

      this.manager.addAnswer('en', 'None', `I'm not sure about that. Try asking me about:<br><br>• Mohammad's skills and experience<br>• His projects and portfolio<br>• How to contact or hire him<br>• Say "hello" to get started<br><br>What would you like to know?`, { confidence: 0 });

      await this.manager.train();
      this.isModelTrained = true;
      console.log('NLP Model trained successfully');
    } catch (error) {
      console.error('Error training model:', error);
      throw error;
    }
  }

  async processMessage(message: string) {
    try {
      if (!this.manager) {
        return {
          message: "AI Assistant is currently unavailable. Please try again later or contact Mohammad directly at mohammad.attallah1@outlook.com",
          confidence: 0,
          intent: 'error',
          timestamp: new Date().toISOString()
        };
      }

      if (!this.isModelTrained) {
        await this.trainModel();
      }

      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return {
          message: "Please provide a valid message",
          confidence: 0,
          intent: 'error',
          timestamp: new Date().toISOString()
        };
      }

      const response = await this.manager.process('en', message.toLowerCase().trim());

      const confidence = response.intent === 'None' ? 0 : (response && typeof response.score === 'number') ? response.score : 0;

      return {
        message: response.answer,
        confidence: confidence,
        intent: (response && response.intent) ? response.intent : 'unknown',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        message: "I'm having trouble processing your message right now. Please try asking about Mohammad's skills, projects, or contact information.",
        confidence: 0,
        intent: 'error',
        timestamp: new Date().toISOString()
      };
    }
  }

  getChatbotInfo() {
    return chatbotInfo;
  }


}

export const nlpService = new NLPService();