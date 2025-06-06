export const typeDefs = `
  type Query {
    hello: String
    chatbotInfo: ChatbotInfo
  }
  
  type Mutation {
    sendMessage(name: String!, email: String!, message: String!): SendMessageResponse!
    chat(message: String!): ChatResponse
  }
  
  type SendMessageResponse {
    success: Boolean!
    message: String!
  }
  
  type ChatResponse {
    message: String!
    confidence: Float!
    intent: String!
    timestamp: String!
  }
  
  type ChatbotInfo {
    status: String!
    availableTopics: [String!]!
    website: String!
  }
`;