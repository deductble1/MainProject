const API_URL = 'http://localhost:3000/api';

export async function createLinkToken() {
  try {
    const response = await fetch(`${API_URL}/create_link_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to create link token');
    }
    
    const data = await response.json();
    return data.link_token;
  } catch (error) {
    console.error('Error creating link token:', error);
    throw error;
  }
}

export async function exchangePublicToken(publicToken: string) {
  const response = await fetch(`${API_URL}/exchange_public_token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ public_token: publicToken }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to exchange public token');
  }
  
  const data = await response.json();
  return data.access_token;
}

export async function fetchTransactions(accessToken: string) {
  const response = await fetch(
    `${API_URL}/transactions?access_token=${accessToken}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  
  return response.json();
}

export async function analyzeTransaction(transaction: any) {
  const response = await fetch(`${API_URL}/analyze_transaction`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  });
  
  if (!response.ok) {
    throw new Error('Failed to analyze transaction');
  }
  
  return response.json();
}