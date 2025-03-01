import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Page1 from './Page1';
import Page2 from './Page2';
import { ELECTRON_KEY_VALUE_STORAGE } from 'cross-platform-util-electron-preload';
import { KeyValueStorageContext, LOCAL_STORAGE } from 'cross-platform-util';

const isElectron = navigator.userAgent.toLowerCase().includes('electron'); 

const Router = isElectron ? HashRouter : BrowserRouter;
const storage = isElectron ? ELECTRON_KEY_VALUE_STORAGE : LOCAL_STORAGE; 

function App() {
  return (
    <KeyValueStorageContext.Provider value={storage}>
      <Router>
        <Routes>
          <Route path={Page1.path} element={<Page1 />} />
        <Route path={Page2.path} element={<Page2 />} />
          <Route path="/" element={<Navigate to={Page1.path} />} />
        </Routes>
      </Router>
    </KeyValueStorageContext.Provider>
  );
}

export default App;