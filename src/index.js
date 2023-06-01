import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from "react-router-dom";
import { AuthProvider } from './context/auth.context';
import { ChatProvider } from './context/chat.context';
import { AudioProvider } from './context/audio.context';
import { SearchProvider } from './context/search.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <AuthProvider>
      <ChatProvider>
        <SearchProvider>
          <AudioProvider>
            <App />
          </AudioProvider>
        </SearchProvider>
      </ChatProvider>
    </AuthProvider>
  </HashRouter>
);


reportWebVitals();
