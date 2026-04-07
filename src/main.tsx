import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '@/store';
import type { AppDispatch } from '@/store';
import { authenticateUser } from '@/store/actions/userActions';
import App from './App';
import './index.css';

if (localStorage.getItem('token')) {
  (store.dispatch as AppDispatch)(authenticateUser());
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
