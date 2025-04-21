const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type Model = {
  model_name: string;
  temperature: number;
};

export async function getPrompt(): Promise<any> {
  if (!baseUrl) {
    throw new Error('API base URL is not defined in environment variables');
  }

  try {
    // ${baseUrl} (removed for it to work with vercel)
    const response = await fetch(`${baseUrl}/v1/templates/splash_page`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorData = (await response.json()) || (await response.text());
      throw new Error(errorData.detail || 'Failed to get splash prompt');
    }

    return await response.json();
  } catch (error: any) {
    console.error('API call error:', error);
    throw error;
  }
}

export async function savePrompt({
  mode,
  prompt,
}: {
  mode: string;
  prompt: string;
}): Promise<any> {
  if (!baseUrl) {
    throw new Error('API base URL is not defined in environment variables');
  }

  try {
    // ${baseUrl} (removed for it to work with vercel)
    const response = await fetch(`${baseUrl}/v1/templates/${mode}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: prompt }),
    });

    if (!response.ok) {
      const errorData = (await response.json()) || (await response.text());
      throw new Error(errorData.detail || 'Failed to set splash prompt');
    }

    return await response.json();
  } catch (error: any) {
    console.error('API call error:', error);
    throw error;
  }
}

export async function getModel(): Promise<any> {
  if (!baseUrl) {
    throw new Error('API base URL is not defined in environment variables');
  }

  try {
    // ${baseUrl} (removed for it to work with vercel)
    const response = await fetch(`${baseUrl}/v1/models/splash_page`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorData = (await response.json()) || (await response.text());
      throw new Error(errorData.detail || 'Failed to get splash prompt');
    }

    return await response.json();
  } catch (error: any) {
    console.error('API call error:', error);
    throw error;
  }
}

export async function saveModel({
  mode,
  model,
}: {
  mode: string;
  model: Model;
}): Promise<any> {
  if (!baseUrl) {
    throw new Error('API base URL is not defined in environment variables');
  }

  try {
    // ${baseUrl} (removed for it to work with vercel)
    const response = await fetch(`${baseUrl}/v1/models/${mode}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(model),
    });

    if (!response.ok) {
      const errorData = (await response.json()) || (await response.text());
      throw new Error(errorData.detail || 'Failed to set splash prompt');
    }

    return await response.json();
  } catch (error: any) {
    console.error('API call error:', error);
    throw error;
  }
}
