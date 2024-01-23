import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignIn/SignUp';
import FindId from './pages/SignIn/FindId';
import FindPwd from './pages/SignIn/FindPwd';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/users/signin" element={<SignIn />} />
        <Route path="/users/signup" element={<SignUp />} />
        <Route path="/users/findid" element={<FindId />} />
        <Route path="/users/findpwd" element={<FindPwd />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
