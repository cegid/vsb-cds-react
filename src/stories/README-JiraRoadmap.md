# Jira Roadmap Story - Security Configuration

## Overview

The Jira Roadmap story displays Design System tasks from Jira in a Kanban board layout. For security reasons, the Jira API token is NOT stored in the code and must be configured via environment variables.

## Setup Instructions

### 1. Create `.env.local` file

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

### 2. Configure your Jira credentials

Edit `.env.local` and add your credentials:

```env
# Jira API Token (required)
STORYBOOK_JIRA_API_TOKEN=your_jira_api_token_here

# Jira User Name (optional)
STORYBOOK_JIRA_USER_NAME=your_name_here
```

### 3. Restart Storybook

For the environment variables to take effect, restart Storybook:

```bash
npm start
```

## Security Best Practices

### ✅ DO:
- Keep your API token in `.env.local`
- Add `.env.local` to `.gitignore` (already configured)
- Share `.env.local.example` with your team
- Rotate tokens regularly

### ❌ DON'T:
- **NEVER** commit `.env.local` to git
- **NEVER** hardcode tokens in the source code
- **NEVER** share your `.env.local` file
- **NEVER** publish tokens in screenshots or documentation

## How it Works

1. **Environment Variables**: Vite/Storybook loads variables from `.env.local` prefixed with `STORYBOOK_`
2. **Import Access**: The code accesses them via `import.meta.env.STORYBOOK_*`
3. **Runtime Check**: The story validates the token is configured before making API calls
4. **Proxy**: Requests go through a local proxy to avoid CORS issues

## Troubleshooting

### Error: "JIRA API token is not configured"

**Solution**: Make sure you've created `.env.local` and added the `STORYBOOK_JIRA_API_TOKEN` variable, then restart Storybook.

### Story shows "Failed to fetch"

**Possible causes**:
- Invalid token
- Proxy not configured correctly
- API endpoint is down
- Check browser console for detailed error logs

### Changes to `.env.local` not taking effect

**Solution**: Restart Storybook. Environment variables are only loaded at startup.

## API Information

- **Endpoint**: `https://jira-internal-api.boby.tech/v1/api/issue/design-system`
- **Authentication**: Bearer token
- **Proxy Path**: `/api/jira/*` (configured in `.storybook/main.ts`)

## Files Involved

- `.env.local` - Your local environment variables (git-ignored)
- `.env.local.example` - Template for environment variables (committed to git)
- `.gitignore` - Ensures `.env.local` is never committed
- `src/stories/JiraRoadmap.stories.tsx` - The story implementation
- `.storybook/main.ts` - Proxy configuration

## Contact

For questions about Jira API access, contact your team administrator.
