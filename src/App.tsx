import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Page1 from './Page1';
import Page2 from './Page2';

const isElectron = navigator.userAgent.toLowerCase().includes('electron'); 

const Router = isElectron ? HashRouter : BrowserRouter;

function App() {
  return (
    <Router>
      <Routes>
        <Route path={Page1.path} element={<Page1 />} />
        <Route path={Page2.path} element={<Page2 />} />
        <Route path="/" element={<Navigate to={Page1.path} />} />
      </Routes>
    </Router>
  );
}

export default App;