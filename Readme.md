# React Native Boilerplate with Auth0 and ChatGPT

A modern React Native boilerplate with built-in authentication using Auth0 and ChatGPT integration.

## Features

- 🔐 Authentication with Auth0
- 💬 ChatGPT Integration
- 🎨 Clean and Modern UI using react-native-ui-lib
- 📱 TypeScript Support
- 🧭 React Navigation
- 🔄 React Query for Data Fetching
- 🏗️ Well-structured Project Architecture

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory
   - Add your Auth0 credentials:
     ```
     AUTH0_DOMAIN=your-auth0-domain
     AUTH0_CLIENT_ID=your-auth0-client-id
     ```
   - Add your OpenAI API key:
     ```
     OPENAI_API_KEY=your-openai-api-key
     ```

4. Run the app:

   ```bash
   # iOS
   npm run ios

   # Android
   npm run android
   ```

## Project Structure

```
src/
  ├── components/      # Reusable components
  ├── screens/         # Screen components
  ├── ctx/            # React Context providers
  ├── hooks/          # Custom hooks
  ├── constants/      # Constants and configuration
  └── types/          # TypeScript type definitions
```

## Authentication Flow

The app uses Auth0 for authentication. The flow includes:

- Login screen
- Onboarding for new users
- Protected routes
- Token management

## ChatGPT Integration

The app includes a ChatGPT prompt component that can be used to interact with OpenAI's GPT models. The integration is set up in the `ChatGPTProvider` and can be accessed through the `useChatGPT` hook.

## Contributing

Feel free to submit issues and pull requests.

## License

MIT
