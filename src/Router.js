import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './pages/Main/Main';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
