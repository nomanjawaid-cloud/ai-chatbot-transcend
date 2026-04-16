# 🔍 Blueprint Query Feature

## Overview

The chatbot now supports natural language queries for blueprint management using the `/mcp/query` API endpoint.

## API Endpoint

**POST** `/mcp/query`

### Authentication
Requires JWT token in Authorization header:
```
Authorization: Bearer <access_token>
```

### Request Body
```json
{
  "prompt": "show my blueprints"
}
```

If no prompt is provided, defaults to "show my blueprints".

### Success Response (200)
```json
{
  "success": true,
  "response": "Found 79 blueprints:\n\n1. **Testing Blueprint #01**\n   - ID: f0645259-77d9-4a79-9e2c-09c89c795dc1\n   - Type: baseline\n   - Purpose: blueprint_for_school\n   ...",
  "timestamp": "2026-04-13T13:49:50.520Z"
}
```

### Error Responses

**400 - Bad Request**
```json
{
  "success": false,
  "error": "Failed to process your query. Please try again.",
  "timestamp": "2026-04-13T13:49:50.520Z"
}
```

**401 - Unauthorized**
```json
{
  "success": false,
  "error": "Invalid or missing JWT token",
  "timestamp": "2026-04-13T13:49:50.520Z"
}
```

## Example Queries

### Show All Blueprints
```
"show my blueprints"
```

### Search by Topic
```
"search blueprints for mathematics"
```

### Show Specific Blueprint
```
"show blueprint abc-123-def-456"
```

### Filter by Type
```
"show my template blueprints"
"show my school blueprints"
"show my baseline blueprints"
"show my aspirational blueprints"
```

### Public Blueprints
```
"show public blueprints"
```

### Get Information
```
"describe blueprint structure"
```

## Implementation

### API Function (`src/lib/api.ts`)

```typescript
export async function queryBlueprints(
  request: BlueprintQueryRequest = {}
): Promise<BlueprintQueryResponse> {
  const token = getAccessToken();
  
  if (!token) {
    throw new Error('Authentication required. Please sign in.');
  }

  const response = await fetch(`${API_BASE_URL}/mcp/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      prompt: request.prompt || 'show my blueprints'
    }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      clearTokens();
      throw new Error('Session expired. Please sign in again.');
    }
    throw new Error('Failed to query blueprints.');
  }

  return await response.json();
}
```

### ChatBot Integration (`src/components/ChatBot.tsx`)

The chatbot automatically:
1. Sends user queries to the blueprint API
2. Displays formatted responses
3. Handles errors gracefully
4. Shows typing indicators
5. Formats blueprint information

## Features

### ✅ Natural Language Processing
- Understands various query formats
- Interprets user intent
- Returns relevant results

### ✅ Authentication
- Requires valid JWT token
- Auto-detects expired sessions
- Prompts re-login when needed

### ✅ Error Handling
- Network errors
- Invalid queries
- Unauthorized access
- Session expiration

### ✅ User Experience
- Typing indicators
- Formatted responses
- Error messages in red
- Timestamps on messages
- Auto-scroll to latest

## Usage in Chat

### Step 1: Sign In
User must be authenticated to query blueprints.

### Step 2: Ask Questions
Type natural language queries like:
- "show my blueprints"
- "search for math blueprints"
- "show template blueprints"

### Step 3: View Results
The bot displays formatted blueprint information including:
- Blueprint names
- IDs
- Types
- Purposes
- Other metadata

## Response Formatting

### Blueprint List
```
Found 79 blueprints:

1. **Testing Blueprint #01**
   - ID: f0645259-77d9-4a79-9e2c-09c89c795dc1
   - Type: baseline
   - Purpose: blueprint_for_school
   
2. **Mathematics Curriculum**
   - ID: abc-123-def-456
   - Type: template
   - Purpose: curriculum_design
```

### Error Messages
Displayed in red with error icon:
```
❌ Session expired. Please sign in again.
❌ Failed to process your query. Please try again.
```

## Testing

### Test Valid Query
```typescript
// In browser console or test file
const response = await queryBlueprints({ 
  prompt: "show my blueprints" 
});
console.log(response);
```

### Test Without Auth
```typescript
// Should throw error
clearTokens();
await queryBlueprints({ prompt: "show my blueprints" });
// Error: "Authentication required. Please sign in."
```

### Test Session Expiration
```typescript
// With expired token
// Should clear tokens and prompt re-login
await queryBlueprints({ prompt: "show my blueprints" });
// Error: "Session expired. Please sign in again."
```

## Configuration

### Environment Variables
```env
NEXT_PUBLIC_API_BASE_URL="https://your-api-url.com"
NEXT_PUBLIC_LOGIN_ENDPOINT="/auth/login"
```

### API Base URL
The blueprint query endpoint is constructed as:
```
${API_BASE_URL}/mcp/query
```

## Security

### Token Management
- Access token sent in Authorization header
- Tokens stored in localStorage
- Auto-cleared on 401 errors
- Re-authentication required

### Request Validation
- Server validates JWT token
- Checks user permissions
- Validates query format
- Returns appropriate errors

## Future Enhancements

### Planned Features
1. **Rich Formatting**: Markdown support for responses
2. **Blueprint Preview**: Show blueprint details inline
3. **Quick Actions**: Buttons for common queries
4. **History**: Save query history
5. **Suggestions**: Auto-suggest queries
6. **Filters**: Advanced filtering options
7. **Export**: Export results to CSV/JSON
8. **Favorites**: Save favorite blueprints

### Possible Queries
- "compare blueprint A and B"
- "show blueprints created this week"
- "show blueprints by author X"
- "export my blueprints"
- "create new blueprint"

## Troubleshooting

### Issue: "Authentication required"
**Solution**: Sign in to the application

### Issue: "Session expired"
**Solution**: Sign in again (tokens cleared automatically)

### Issue: "Failed to process query"
**Solution**: 
- Check your query format
- Try a simpler query
- Check network connection

### Issue: No results
**Solution**:
- Verify you have blueprints
- Try broader search terms
- Check blueprint permissions

## Summary

The blueprint query feature provides:
- ✅ Natural language interface
- ✅ Real-time API integration
- ✅ Secure authentication
- ✅ Error handling
- ✅ Formatted responses
- ✅ User-friendly chat interface

Users can now query and manage blueprints through natural conversation! 🎉
