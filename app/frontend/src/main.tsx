import { createRoot } from 'react-dom/client';
import App from './app/App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('error');
}

const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(<App />);
