import { Route, Routes } from 'react-router-dom';

import Layout from './components/shared/Layout';
import Home from './pages/Home';

/* const Home = () => {
  return (
    <div className='wrapper'>
      <h3 className='font-thin text-4xl'>Links:</h3>
      <div>
        <ul>
          <li>
            <Link to='/auth/sign-up' className='hover:underline'>
              Sign up
            </Link>
          </li>
          <li>
            <Link to='/auth/sign-in' className='hover:underline'>
              Sign in
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}; */

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
