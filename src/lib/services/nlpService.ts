import { NlpManager } from 'node-nlp';

class NLPService {
  private manager: NlpManager;
  private isModelTrained = false;

  constructor() {
    this.manager = new NlpManager({ languages: ['en'] });
  }

  private getTrainingData() {
    return [
      {
        intent: 'about.general',
        utterances: [
          'who are you',
          'tell me about yourself',
          'who is mohammad',
          'about mohammad',
          'introduce yourself',
          'what do you do',
          'your background',
          'mohammad attallah'
        ],
        answer: "I'm Mohammad Attallah, a passionate Full Stack Developer specializing in modern web technologies like React, Next.js, Node.js, and TypeScript. I create innovative digital solutions and have experience building scalable applications."
      },
      {
        intent: 'skills.frontend',
        utterances: [
          'what frontend skills do you have',
          'frontend technologies',
          'react skills',
          'javascript skills',
          'css skills',
          'html skills',
          'ui skills',
          'client side'
        ],
        answer: "My frontend skills include React.js, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Material-UI, Framer Motion for animations, and responsive design principles."
      },
      {
        intent: 'skills.backend',
        utterances: [
          'backend skills',
          'server side technologies',
          'nodejs skills',
          'database skills',
          'api development',
          'server skills'
        ],
        answer: "For backend development, I work with Node.js, Express.js, MongoDB, PostgreSQL, REST APIs, GraphQL, and serverless functions. I also have experience with authentication systems and database design."
      },
      {
        intent: 'projects.general',
        utterances: [
          'show me your projects',
          'what projects have you built',
          'your work',
          'portfolio projects',
          'recent projects',
          'projects'
        ],
        answer: "I've built various projects including e-commerce platforms, portfolio websites, real-time chat applications, task management systems, and API integrations. You can view them all on mohammadattallah.live"
      },
      {
        intent: 'contact.general',
        utterances: [
          'how to contact you',
          'contact information',
          'email address',
          'reach out',
          'get in touch',
          'contact mohammad'
        ],
        answer: "You can reach me through the contact form on my website mohammadattallah.live, or connect with me on LinkedIn. I'm always open to discussing new opportunities and collaborations!"
      },
      {
        intent: 'contact.hire',
        utterances: [
          'are you available for hire',
          'freelance work',
          'available for projects',
          'hiring',
          'work together',
          'hire mohammad'
        ],
        answer: "Yes, I'm available for freelance projects and full-time opportunities! I specialize in React, Next.js, and full-stack development. Feel free to contact me through mohammadattallah.live to discuss your project requirements."
      },
      {
        intent: 'default.fallback',
        utterances: [
          'hello',
          'hi',
          'hey',
          'good morning',
          'good afternoon',
          'thanks',
          'thank you'
        ],
        answer: "Hello! I'm Mohammad's AI assistant. I can help you learn more about Mohammad's skills, projects, experience, and services. What would you like to know?"
      }
    ];
  }

  async trainModel() {
    if (this.isModelTrained) return;
    
    try {
      console.log('Training NLP model...');
      
      const trainingData = this.getTrainingData();
      
      for (const data of trainingData) {
        for (const utterance of data.utterances) {
          this.manager.addDocument('en', utterance, data.intent);
        }
        this.manager.addAnswer('en', data.intent, data.answer);
      }

      await this.manager.train();
      this.isModelTrained = true;
      console.log('NLP Model trained successfully');
    } catch (error) {
      console.error('Error training model:', error);
      throw error;
    }
  }

  async processMessage(message: string) {
    if (!this.isModelTrained) {
      await this.trainModel();
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      throw new Error('Please provide a valid message');
    }

    const response = await this.manager.process('en', message.toLowerCase().trim());
    
    let botResponse = "I'm sorry, I didn't understand that. You can ask me about Mohammad's skills, projects, experience, or how to contact him!";
    
    if (response.score > 0.5) {
      botResponse = response.answer;
    } else {
      botResponse = `I'm not sure about that. Here are some things you can ask me about:

• Mohammad's skills and technologies
• His projects and portfolio
• Work experience and background  
• Contact information
• Available services
• How to hire him

What would you like to know?`;
    }

    return {
      message: botResponse,
      confidence: response.score || 0,
      intent: response.intent || 'unknown',
      timestamp: new Date().toISOString()
    };
  }

  getChatbotInfo() {
    return {
      status: "Mohammad's AI Assistant is ready!",
      availableTopics: [
        "Skills & Technologies",
        "Projects & Portfolio", 
        "Work Experience",
        "Contact Information",
        "Services Offered",
        "React & Next.js expertise"
      ],
      website: "mohammadattallah.live"
    };
  }
}

export const nlpService = new NLPService();