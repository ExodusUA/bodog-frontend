import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Admin from './Pages/Admin/Admin';
import Login from './Pages/Login/Login';
import AuthCheck from './hoc/AuthCheck';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <AuthCheck>
            <Admin />
          </AuthCheck>
        } />
        <Route path="/admin/*" element={
          <AuthCheck>
            <Admin />
          </AuthCheck>
        } />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
