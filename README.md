<<<<<<< HEAD

# myChat-Website

=======

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

> > > > > > > master

Mini-Chat with React, TypeScript, and Firebase

This project is a mini-chat app created for learning and portfolio purposes. Built with TypeScript and React on the frontend, and Firebase on the backend, it supports real-time messaging, user authentication, user profiles with images, and emoji support.
Features

    React Frontend with TypeScript: The frontend is built using React with TypeScript, providing type safety and scalability.
    User Authentication: Firebase manages user authentication, allowing for easy sign-up and login.
    Real-Time Messaging: Messages are sent and received instantly using Firebase’s real-time database, providing a seamless chat experience.
    User Profiles: Each user has a profile, with the ability to upload a profile picture.
    Emoji Support: Messages can include emojis, adding personality to conversations.
    Firebase Backend: Firebase is used for both real-time data storage and authentication, simplifying backend setup and maintenance.

Project Structure

The project is split into logical components:

    Authentication Components: Manage user sign-in and sign-up.
    homepage with each chat.
    Chat Components: Display the chat UI and real-time messages.
    User Profile Components: Allow users to set up their profiles with images.
    Message Handling: Manages sending, receiving, and displaying messages, images, and emojis.

Future Improvements

    Add status indicators (online/offline) for users.
    Improve message formatting options (like markdown support).
    Add more detailed error handling for better user experience.

Summary

This project is a real-time chat application showcasing TypeScript, React, and Firebase integration, with features like user profiles, image sharing, and emoji support. It’s ideal for learning how to combine these technologies in a dynamic chat environment.
