import { Route, Routes } from 'react-router-dom';

import Layout from './components/shared/Layout';
import Home from './pages/events';
import SignUp from './pages/auth/signup';
import LogIn from './pages/auth/logIn';
import ResetPassword from './pages/auth/resetPassword';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/auth/sign-up' element={<SignUp />} />
        <Route path='/auth/log-in' element={<LogIn />} />
        <Route path='/auth/reset-password' element={<ResetPassword />} />
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
