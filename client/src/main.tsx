import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AnswerProvider } from './contexts/Answer';

// create query client to mange our server state
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AnswerProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </AnswerProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
