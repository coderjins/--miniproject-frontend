import React, { useState } from 'react';
import Button from '../../components/button';
import '../../style/sass/signin.scss';
import logo from '../../style/images/logo.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignIn = async () => {
    try {
      const data = {
        email,
        password,
      };
      const response = await fetch('http://172.30.1.98:8000/users/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
      } else {
        console.log('로그인 실패');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생', error);
    }
  };
  const loginClick = () => {
    alert('로그인 시도');
  };

  const inputEmail = event => {
    const email = event.target.value;
    setEmail(email);
  };

  const inputPassword = e => {
    const password = e.target.value;
    setPassword(password);
  };
  const emailOption = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const validMail = email.match(emailOption) !== null;

  const ablePassword = password.length > 10;

  const navigate = useNavigate();

  const handleSignupButtonClick = () => {
    navigate('/users/signUp');
  };
  const handlefindIdButtonClick = () => {
    navigate('/users/findId');
  };
  const handlefindPwdButtonClick = () => {
    navigate('/users/findPwd');
  };

  return (
    <div className="Login">
      <div className="imageWrapper">
        <img className="Logo" src={logo} alt="Login Logo" />
      </div>
      <div className="container">
        <div className="input">
          <input
            type="text"
            className="email"
            placeholder="이메일"
            onChange={inputEmail}
          />
          <input
            type="password"
            className="password"
            placeholder="비밀번호"
            onChange={inputPassword}
          />
        </div>

        <Button
          onClick={() => {
            loginClick();
            handleSignIn();
          }}
          disabled={!validMail || !ablePassword}
        >
          로그인
        </Button>
        <div className="login_option">
          <button className="signUp" onClick={handleSignupButtonClick}>
            회원가입
          </button>
          <span className="line">|</span>
          <button className="findUserInfo" onClick={handlefindIdButtonClick}>
            아이디찾기
          </button>
          <span className="line">|</span>
          <button className="findUserInfo" onClick={handlefindPwdButtonClick}>
            비밀번호찾기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
