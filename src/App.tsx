import { Route, Routes } from 'react-router-dom';

const Home = () => {
  return <>Hello world</>;
};

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
