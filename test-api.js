// Quick API endpoint tester
// Run with: node test-api.js

const API_BASE_URL = "https://transcend-f8cpfhajdeg3edg5.canadacentral-01.azurewebsites.net";

const endpoints = [
  '/auth/loginUser',
  '/api/auth/loginUser',
  '/api/auth/login',
  '/auth/login',
  '/api/login',
  '/login',
  '/api/v1/auth/login',
  '/api/v1/auth/loginUser',
];

const testCredentials = {
  email: "test@example.com",
  password: "test123"
};

async function testEndpoint(endpoint) {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log(`\nTesting: ${url}`);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testCredentials),
    });
    
    console.log(`  Status: ${response.status} ${response.statusText}`);
    
    if (response.status !== 404) {
      console.log(`  ✅ Endpoint exists!`);
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log(`  Response:`, JSON.stringify(data, null, 2));
      }
      return endpoint;
    } else {
      console.log(`  ❌ Not found`);
    }
  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
  }
  
  return null;
}

async function findWorkingEndpoint() {
  console.log('🔍 Testing API endpoints...\n');
  console.log('Base URL:', API_BASE_URL);
  console.log('Test credentials:', testCredentials);
  console.log('=' .repeat(60));
  
  for (const endpoint of endpoints) {
    const working = await testEndpoint(endpoint);
    if (working) {
      console.log('\n' + '='.repeat(60));
      console.log(`\n✅ FOUND WORKING ENDPOINT: ${working}`);
      console.log(`\nAdd this to your .env.local:`);
      console.log(`NEXT_PUBLIC_LOGIN_ENDPOINT="${working}"`);
      return;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('\n❌ No working endpoint found.');
  console.log('\nPlease check:');
  console.log('1. Your API base URL is correct');
  console.log('2. Your API server is running');
  console.log('3. CORS is configured on your backend');
  console.log('4. The actual endpoint path from your API documentation');
}

findWorkingEndpoint();
