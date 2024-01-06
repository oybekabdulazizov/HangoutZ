import { Route, Routes } from 'react-router-dom';

import Layout from './components/shared/Layout';
import Home from './pages/events';

const SignUp = () => {
  return <>TODO: Implement Sign Up page</>;
};

const SignIn = () => {
  return <>TODO: Implement Sign In page</>;
};

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/auth/sign-up' element={<SignUp />} />
        <Route path='/auth/sign-in' element={<SignIn />} />
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
