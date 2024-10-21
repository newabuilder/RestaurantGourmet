import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import Main
 from './components/Main/Main';
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// 👇️ Wrap App in Router

root.render(
  <Router>
    <Main />
  </Router>
);