import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  plaidClientId: process.env.VITE_PLAID_CLIENT_ID,
  plaidSecret: process.env.VITE_PLAID_SECRET,
  plaidEnv: process.env.VITE_PLAID_ENV || 'sandbox',
  openaiApiKey: process.env.VITE_OPENAI_API_KEY,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173'
};