import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignIn/SignUp';
import FindId from './pages/SignIn/FindId';
import FindPwd from './pages/SignIn/FindPwd';
import Signup from './pages/Signup/Signup';
import Main from './pages/Main/Main';
import FindID from './pages/Find/FindID';
import FindPW from './pages/Find/FindPW';
import Home from './pages/Home/Home';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/users/signin" element={<SignIn />} />
          <Route path="/users/signup" element={<SignUp />} />
          <Route path="/users/findid" element={<FindId />} />
          <Route path="/users/findpwd" element={<FindPwd />} />
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/findid" element={<FindID />} />
          <Route path="/findpw" element={<FindPW />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
