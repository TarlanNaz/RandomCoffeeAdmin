import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import AdminPage from './pages/admin/AdminPage';
import TopicsPage from './pages/topic/TopicsPage';
import PlacesPage from './pages/place/PlacesPage';
import TestPage  from './pages/test/TestPage';

function App() {
  return (
    <BrowserRouter>
      {/* определяем маршруты и сопоставляем их с компонентами (страницами) */}
      <Routes>
        <Route path="login" element={<LoginPage />} />
        {/* маршрут по умолчанию */}
        <Route path="*" element={<AdminPage />} />
        <Route path="topics" element={<TopicsPage />} />
        <Route path="places" element={<PlacesPage />} />
        <Route path="test" element={< TestPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
