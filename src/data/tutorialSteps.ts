export type TutorialStep = {
  id: number;
  title: string;
  description: string;
  codeExample: string;
  language: 'bash' | 'json' | 'http' | 'javascript';
};

export const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: '1. Get the Base URL',
    description: `
To begin using the Petstore API, understand where to send your requests.

**Base URL**: \`https://petstore3.swagger.io/api/v3\`

All public endpoints are under this base path.`,
    codeExample: `curl https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available`,
    language: 'bash',
  },
  {
    id: 2,
    title: '2. Authenticate and Retrieve a Token',
    description: `
Some operations require authentication (e.g. creating or updating pets).

To log in:

- Endpoint: \`/user/login\`
- Use test credentials:  
  \`username: user1\`  
  \`password: pass123\`

You'll receive a token under the \`api_key\` header.`,
    codeExample: `curl -X GET "https://petstore3.swagger.io/api/v3/user/login?username=user1&password=pass123"`,
    language: 'bash',
  },
  {
    id: 3,
    title: '3. Authorize API Requests',
    description: `
After login, include the token in your request header:

\`api_key: abc123\`

Here’s an example of how to create a new pet (requires authentication):`,
    codeExample: `curl -X POST "https://petstore3.swagger.io/api/v3/pet" \\
  -H "accept: application/json" \\
  -H "Content-Type: application/json" \\
  -H "api_key: abc123" \\
  -d '{
    "name": "Fluffy",
    "photoUrls": ["https://example.com/fluffy.jpg"],
    "status": "available"
  }'`,
    language: 'bash',
  },
  {
    id: 4,
    title: '4. Retrieve a Pet by ID',
    description: `
Once a pet is created, you can retrieve it by its ID:

- Endpoint: \`/pet/{petId}\`
- Example: \`/pet/1001\``,
    codeExample: `curl https://petstore3.swagger.io/api/v3/pet/1001`,
    language: 'bash',
  },
  {
    id: 5,
    title: '5. Handle Errors Gracefully',
    description: `
Pay attention to HTTP status codes to understand what went wrong:

- \`200 OK\`: Success
- \`400 Bad Request\`: Invalid input
- \`401 Unauthorized\`: Missing/invalid token
- \`404 Not Found\`: Resource doesn't exist

Here’s an example of an invalid request:`,
    codeExample: `curl https://petstore3.swagger.io/api/v3/pet/invalid-id`,
    language: 'bash',
  },
];
