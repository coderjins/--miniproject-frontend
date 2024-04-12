import React, { useState } from 'react';
import backArrow from '../../style/images/backArrow.png';
import { useNavigate } from 'react-router-dom';

const FindPW = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reEnteredPassword, setReEnteredPassword] = useState('');

  const handleEmailVerification = async () => {
    try {
      const data = {
        email,
      };
      const response = await fetch('http://172.30.1.98:8000/users/emailAuth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        alert('인증번호가 발송되었습니다! ㅎㅎ ^^ ㅋㅋ;;');
      } else {
        alert('올바르지 않은 이메일입니다;;');
      }
    } catch (error) {
      alert('비밀번호 찾기 중 오류 발생', error);
    }
  };
  const handleFindPwd = async () => {
    try {
      const data = {
        email,
        verificationCode,
        newPassword,
      };
      const response = await fetch(
        'http://172.30.1.98:8000/users/emailAuth/emailVerifyNumber',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );
      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        alert(result.message);
      } else {
        alert('올바르지 않은 인증번호입니다.');
      }
    } catch (error) {
      alert('비밀번호 등록 중 오류 발생', error);
    }
  };
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate('/');
  };

  const isPasswordValid =
    newPassword === reEnteredPassword && newPassword.length >= 10;

  return (
    <div className="page find">
      <div className="findArea">
        <button className="back" onClick={handleBackButtonClick}>
          <img className="backArrow" src={backArrow} alt="Join backArrow" />
          <div className="BackText">뒤로</div>
        </button>
        <h2 className="findTitle">비밀번호 찾기</h2>
        <form>
          <div className="formInput">
            <label htmlFor="email" className="formLabel blind">
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className="formControl"
              placeholder="이메일을 입력해주세요"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="btnArea">
            <button
              type="button"
              className="btn"
              onClick={handleEmailVerification}
            >
              본인 인증하기
            </button>
          </div>
          <div className="formInput">
            <label htmlFor="Authentication number" className="formLabel blind">
              인증번호
            </label>
            <input
              type="number"
              id="Authentication number"
              className="formControl"
              value={verificationCode}
              placeholder="인증번호를 입력해주세요"
              onChange={e => setVerificationCode(e.target.value)}
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
              value={newPassword}
              placeholder="새 비밀번호를 입력해주세요"
              onChange={e => setNewPassword(e.target.value)}
            />
          </div>
          <div className="formInput">
            <label htmlFor="rePassword" className="formLabel blind">
              비밀번호 다시 입력
            </label>
            <input
              type="password"
              id="rePassword"
              className="formControl"
              placeholder="새 비밀번호를 다시한번 입력해주세요"
              onChange={e => setReEnteredPassword(e.target.value)}
            />
          </div>
          {newPassword.length > 0 &&
            reEnteredPassword.length > 0 &&
            !isPasswordValid && (
              <p style={{ color: 'red' }}>
                비밀번호가 일치하지 않거나 10자 이상이어야 합니다.
              </p>
            )}
        </form>
        <div className="btnArea">
          <button
            type="button"
            className="btn"
            onClick={handleFindPwd}
            disabled={!isPasswordValid}
          >
            새 비밀번호 등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindPW;
