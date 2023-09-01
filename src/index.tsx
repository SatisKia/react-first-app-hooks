import './index.css';
import { StoreProvider } from './store';
import App from './App';
import ReactDOM from 'react-dom/client';

console.log("index.js");
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
