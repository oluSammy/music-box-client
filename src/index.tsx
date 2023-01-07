import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { ThemeProvider } from '@material-ui/core';
import theme from './ui/theme';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastProvider } from 'react-toast-notifications';

const queryClient = new QueryClient();

ReactDOM.render(
  <>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <App />
          </ToastProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </>,
  document.getElementById('root')
);
reportWebVitals();
