const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAllPrompts(): Promise<any> {
  if (!baseUrl) {
    throw new Error('API base URL is not defined in environment variables');
  }

  try {
    // ${baseUrl} (removed for it to work with vercel)
    const response = await fetch(`/v1/templates/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorData = (await response.json()) || (await response.text());
      throw new Error(errorData.detail || 'Failed to get all prompts');
    }

    return await response.json();
  } catch (error: any) {
    console.error('API call error:', error);
    throw error;
  }
}

export async function getAllModels(): Promise<any> {
  if (!baseUrl) {
    throw new Error('API base URL is not defined in environment variables');
  }

  try {
    // ${baseUrl} (removed for it to work with vercel)
    const response = await fetch(`/v1/models/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorData = (await response.json()) || (await response.text());
      throw new Error(errorData.detail || 'Failed to get all models');
    }

    return await response.json();
  } catch (error: any) {
    console.error('API call error:', error);
    throw error;
  }
}
