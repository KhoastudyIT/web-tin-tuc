// Debug utilities for development

export const debugAPI = {
  // Log API response
  logResponse: (endpoint: string, data: any, error?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.group(`🌐 API Call: ${endpoint}`);
      if (error) {
        console.error('❌ Error:', error);
      } else {
        console.log('✅ Success:', data);
      }
      console.groupEnd();
    }
  },

  // Log cache operations
  logCache: (operation: string, key: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.group(`💾 Cache ${operation}: ${key}`);
      if (data) {
        console.log('Data:', data);
      }
      console.groupEnd();
    }
  },

  // Log mutation operations
  logMutation: (operation: string, data: any, result?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.group(`🔄 Mutation: ${operation}`);
      console.log('Input:', data);
      if (result) {
        console.log('Result:', result);
      }
      console.groupEnd();
    }
  },

  // Log query operations
  logQuery: (key: string, data: any, isLoading: boolean) => {
    if (process.env.NODE_ENV === 'development') {
      console.group(`🔍 Query: ${key}`);
      console.log('Loading:', isLoading);
      console.log('Data:', data);
      console.groupEnd();
    }
  }
};

// Test API endpoints
export const testAPIEndpoints = async () => {
  try {
    console.log('🧪 Testing API endpoints...');
    
    // Test news endpoint
    const newsResponse = await fetch('/api/news?limit=5');
    const newsData = await newsResponse.json();
    console.log('📰 News endpoint:', newsResponse.status, newsData);
    
    // Test categories endpoint
    const categoriesResponse = await fetch('/api/news/categories');
    const categoriesData = await categoriesResponse.json();
    console.log('📁 Categories endpoint:', categoriesResponse.status, categoriesData);
    
  } catch (error) {
    console.error('❌ API test failed:', error);
  }
};

// Check if backend is running
export const checkBackendStatus = async () => {
  try {
    const response = await fetch('/api/health');
    const data = await response.json();
    console.log('🏥 Backend status:', data);
    return true;
  } catch (error) {
    console.error('❌ Backend not accessible:', error);
    return false;
  }
};
