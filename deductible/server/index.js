import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Plaid client
const plaidConfig = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.VITE_PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.VITE_PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(plaidConfig);

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Deductble API is running' });
});

// Create a link token
app.post('/api/create_link_token', async (req, res) => {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: 'user-sandbox' },
      client_name: 'Deductble',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en',
    });
    res.json({ link_token: response.data.link_token });
  } catch (error) {
    console.error('Error creating link token:', error);
    res.status(500).json({ error: error.message });
  }
});

// Exchange public token for access token
app.post('/api/exchange_public_token', async (req, res) => {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: req.body.public_token,
    });
    res.json({ access_token: response.data.access_token });
  } catch (error) {
    console.error('Error exchanging public token:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get transactions
app.get('/api/transactions', async (req, res) => {
  try {
    const response = await plaidClient.transactionsGet({
      access_token: req.query.access_token,
      start_date: '2024-01-01',
      end_date: '2024-12-31',
    });
    res.json(response.data.transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: error.message });
  }
});

// Analyze transaction with AI
app.post('/api/analyze_transaction', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: `You are a tax expert analyzing business transactions.`
      }, {
        role: "user",
        content: `Analyze this transaction:
          Amount: ${req.body.amount}
          Description: ${req.body.description}
          Category: ${req.body.category}`
      }]
    });
    
    res.json({
      analysis: completion.choices[0]?.message?.content,
      confidence: 90
    });
  } catch (error) {
    console.error('Error analyzing transaction:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});