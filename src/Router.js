import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './pages/Main/Main';
import Signup from './pages/Signup/Signup';
import FindID from './pages/Find/FindID';
import FindPW from './pages/Find/FindPW';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/findid" element={<FindID />} />
          <Route path="/findpw" element={<FindPW />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
