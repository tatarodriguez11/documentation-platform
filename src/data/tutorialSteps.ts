export type TutorialStep = {
  id: number;
  title: string;
  description: string;
  codeExample: string;
};

export const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: '1. Get Started with the API',
    description: `To begin using the Petstore API, you'll first need to understand the base URL and how requests are structured.

**Base URL**: \`https://petstore3.swagger.io/api/v3\`

All endpoints are available under this URL. Most of them are public, but some (like adding pets) require authentication.`,
    codeExample: `curl https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available`,
  },
  {
    id: 2,
    title: '2. Authenticate (Get an API Token)',
    description: `Some endpoints (like POST, PUT, DELETE operations) require user authentication.

To authenticate, use the "Login" endpoint:

- Go to: \`/user/login\`
- You need to provide a valid username and password. Use any of the test accounts listed in the docs (e.g., \`username: user1\`, \`password: pass123\`).

**Note**: Upon login, you will receive a JWT token in the response headers under \`api_key\`.`,
    codeExample: `curl -X GET "https://petstore3.swagger.io/api/v3/user/login?username=user1&password=pass123"`,
  },
  {
    id: 3,
    title: '3. Use the Token to Authorize Requests',
    description: `After successful login, include the \`api_key\` token in the request header.

For example, if your token is \`abc123\`, you must include this header:

\`api_key: abc123\`

Here's how to create a new pet (requires auth):`,
    codeExample: `curl -X POST "https://petstore3.swagger.io/api/v3/pet" \\
  -H "accept: application/json" \\
  -H "Content-Type: application/json" \\
  -H "api_key: abc123" \\
  -d '{
    "name": "Fluffy",
    "photoUrls": ["https://example.com/fluffy.jpg"],
    "status": "available"
  }'`,
  },
  {
    id: 4,
    title: '4. Retrieve Pet by ID',
    description: `Once a pet has been added, you can retrieve its information using its \`id\`.

Use this to verify the pet exists and confirm the creation was successful.`,
    codeExample: `curl https://petstore3.swagger.io/api/v3/pet/1001`,
  },
  {
    id: 5,
    title: '5. Error Handling',
    description: `If you make a request without proper authorization or with incorrect data, the API will respond with meaningful error messages.

Always check the HTTP status code:
- \`200 OK\`: Success
- \`400 Bad Request\`: Input data is invalid
- \`401 Unauthorized\`: Token missing or invalid
- \`404 Not Found\`: Resource does not exist

Here's an example of an invalid request:`,
    codeExample: `curl https://petstore3.swagger.io/api/v3/pet/invalid-id`,
  },
];
