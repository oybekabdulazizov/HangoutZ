import { Route, Routes } from 'react-router-dom';

import Layout from './components/shared/Layout';

const Home = () => {
  return <>Hello world</>;
};

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
