# React + TypeScript + Vite Template

This is a boilerplate project for building React applications using TypeScript, powered by Vite. It includes a complete setup with tools for testing, linting, formatting, and drag-and-drop functionality.

## What's Included?

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **Jest**: A delightful JavaScript testing framework.
- **Testing Library**: A set of tools for testing UI components.
- **Playwright**: End-to-end testing framework that enables reliable testing of web applications.
- **ESLint**: A tool for identifying and fixing problems in JavaScript code.
- **Prettier**: An opinionated code formatter.
- **Polyfills**: Legacy support for older browsers via Vite's plugin-legacy.
- **DndKit**: A set of utilities for building complex drag-and-drop interfaces.

## Getting Started

Follow these steps to get your project up and running:

1. **Create the Project**

   ```bash
   npx degit herryhertrix/vite-react-ts-dndkit-template my-app
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd my-app
   ```

3. **Initialize a Git Repository**

   ```bash
   git init
   ```

4. **Install Dependencies**

   ```bash
   npm install
   ```

5. **Start the Development Server**

   The development server supports hot module replacement (HMR) and will be available at [http://localhost:3000](http://localhost:3000).

   ```bash
   npm run dev
   ```

## Recommended VS Code Extensions

To enhance your development experience, we recommend installing the following Visual Studio Code extensions:

- **[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)**: Integrates ESLint into VS Code.
- **[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)**: Integrates Prettier for automatic code formatting.

## Available Scripts

### Linting

Run ESLint to lint your codebase:

```bash
npm run lint
```

### Building

Create a production-ready build of your app:

```bash
npm run build
```

### Serving the Production Build

Run the app in production mode at [http://localhost:3000](http://localhost:3000):

```bash
npm run serve
```

### Testing

#### Unit Tests

- **Run unit tests and watch for changes**:

  ```bash
  npm run test:unit
  ```

- **Run unit tests with coverage report**:

  ```bash
  npm run test:unit:coverage
  ```

#### End-to-End Tests

Playwright is used for end-to-end testing to simulate user interactions:

- **Run Playwright end-to-end tests**:

  ```bash
  npm run test:e2e
  ```

### Drag-and-Drop Functionality

This project includes `@dnd-kit/core` for implementing drag-and-drop interfaces:

- **DndKit**: A flexible set of utilities to create complex drag-and-drop interfaces with React.

### Polyfills

To support older browsers, this project uses the Vite plugin for legacy support:

- **Polyfills**: Automatically added via the Vite plugin to ensure compatibility with older browsers.

## License

This project is licensed under the MIT License.

---
