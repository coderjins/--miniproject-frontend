import React, { useState } from 'react';
import '../../style/sass/findpwd.scss';
import backArrow from '../../style/images/backArrow.png';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button';

const FindPwd = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEmailVerification = async () => {
    try {
      const data = {
        email,
      };
      const response = await fetch(
        'http://192.168.35.107:8000/users/emailAuth',
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
        'http://192.168.35.107:8000/users/emailAuth/emailVerifyNumber',
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
    navigate('/users/signIn');
  };

  return (
    <div className="findIdRequire">
      <div className="header">
        <button className="back" onClick={handleBackButtonClick}>
          <img className="backArrow" src={backArrow} alt="Join backArrow" />
          <div className="BackText">뒤로</div>
        </button>
      </div>
      <div className="container">
        <div className="titleText">비밀번호 찾기</div>

        <div className="findIdInputFrame">
          <input
            className="emailInput"
            type="text"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Button onClick={handleEmailVerification}>인증번호 받기</Button>

          <input
            className="emailInput"
            type="text"
            placeholder="인증번호를 입력해주세요"
            value={verificationCode}
            onChange={e => setVerificationCode(e.target.value)}
          />
          <input
            className="emailInput"
            type="text"
            placeholder="새 비밀번호를 입력해주세요"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <input
            className="emailInput"
            type="text"
            placeholder="새 비밀번호를 다시한번 입력해주세요"
          />
          <Button onClick={handleFindPwd}>새 비밀번호 등록하기</Button>
        </div>
      </div>
    </div>
  );
};

export default FindPwd;
