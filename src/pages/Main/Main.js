import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
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
        localStorage.setItem('accessToken', result.data.accessToken);
        navigate('/home');
      } else {
        console.log('로그인 실패');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생', error);
    }
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
    navigate('/Signup');
  };
  const handlefindIdButtonClick = () => {
    navigate('/FindID');
  };
  const handlefindPwdButtonClick = () => {
    navigate('/FindPW');
  };
  return (
    <div className="page main">
      <div className="mainArea">
        <h1 className="logo">
          <span className="blind">logo</span>
        </h1>
        <div className="loginArea">
          <div className="loginGroup">
            <h2 className="loginTitle">LOGIN</h2>
            <form>
              <div className="formInput">
                <label htmlFor="email" className="formLabel blind">
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  className="formControl"
                  placeholder="이메일"
                  onChange={inputEmail}
                />
              </div>
              <div className="formInput">
                <label htmlFor="password" className="formLabel blind">
                  비밀번호
                </label>
                <input
                  type="password"
                  id="password"
                  className="formControl"
                  placeholder="비밀번호"
                  onChange={inputPassword}
                />
              </div>
            </form>
            <div className="btnArea">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  handleSignIn();
                }}
                disabled={!validMail || !ablePassword}
              >
                로그인
              </button>
            </div>
          </div>
          <div className="loginGroup">
            <div className="btnArea btnBetween">
              <button
                type="button"
                className="btn"
                onClick={handlefindIdButtonClick}
              >
                아이디 찾기
              </button>
              <button
                type="button"
                className="btn"
                onClick={handlefindPwdButtonClick}
              >
                비밀번호 찾기
              </button>
            </div>
          </div>
          <div className="loginGroup">
            <div className="btnArea">
              <button
                type="button"
                className="btn"
                onClick={handleSignupButtonClick}
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
