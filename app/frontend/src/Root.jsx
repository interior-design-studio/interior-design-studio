import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { MainPage } from './pages/MainPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<MainPage />} />
      </Route>
    </Routes>
  </Router>
);
