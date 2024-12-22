export async function createLinkToken(): Promise<string | null> {
  try {
    // For demo purposes, return a mock token
    // In production, this would call your backend to get a real Plaid link token
    return 'link-sandbox-123456';
  } catch (error) {
    console.error('Error creating link token:', error);
    return null;
  }
}