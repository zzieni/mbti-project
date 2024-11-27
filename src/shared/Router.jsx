import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import MbtiTestPage from '../pages/MbtiTestPage';
import MbtiTestResultPage from '../pages/MbtiTestResultPage';
import Layout from '../components/Layout';
import ProtectedRoute from './ProtectedRoute';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/test' element={<MbtiTestPage />} />
            <Route path='/results' element={<MbtiTestResultPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
