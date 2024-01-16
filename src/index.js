import ReactDOM from 'react-dom/client';
import Router from './Router';
import './style/sass/style.scss';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<Router />);
}
