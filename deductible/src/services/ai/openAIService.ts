import { OpenAIApi } from 'openai';
import { openAIConfig } from '../../config/openai';
import type { Transaction } from '../../types';

const openai = new OpenAIApi(openAIConfig);

export async function analyzeTransaction(transaction: Transaction) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: `You are a tax expert analyzing business transactions. 
                 Respond with a JSON object containing:
                 - category: string (expense category)
                 - isDeductible: boolean
                 - confidence: number (0-100)
                 - tags: string[]
                 - reason: string (explanation)`
      }, {
        role: "user",
        content: `Analyze this transaction:
          Amount: ${transaction.amount}
          Description: ${transaction.description}
          Category: ${transaction.category}`
      }]
    });

    const analysis = JSON.parse(completion.choices[0]?.message?.content || '{}');
    
    return {
      category: analysis.category || transaction.category,
      isDeductible: analysis.isDeductible || false,
      confidence: analysis.confidence || 70,
      tags: analysis.tags || [],
      reason: analysis.reason
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    return {
      category: transaction.category,
      isDeductible: false,
      confidence: 0,
      tags: [],
      reason: 'Analysis failed'
    };
  }
}