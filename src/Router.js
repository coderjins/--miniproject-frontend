import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './pages/Main/Main';
import Signup from './pages/Signup/Signup';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
