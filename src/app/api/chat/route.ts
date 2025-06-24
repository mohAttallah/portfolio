import { NextRequest, NextResponse } from 'next/server';
import { nlpService } from 'src/lib/services/nlpService';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    const response = await nlpService.processMessage(message);

    return NextResponse.json({
      success: true,
      data: response
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: "I'm having trouble processing your message right now. Please try asking about Mohammad's skills, projects, or contact information."
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
  const chatbotInfo = nlpService.getChatbotInfo();
    
    return NextResponse.json({
      success: true,
      data: {
        status: 'Chat API is running',
        chatbotInfo
      }
    });
  } catch (error) {
    console.error('Chat API GET Error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
