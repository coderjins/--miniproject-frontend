import React, { useState } from 'react';
import '../../style/sass/findid.scss';
import backArrow from '../../style/images/backArrow.png';
import Button from '../../components/button';
import { useNavigate } from 'react-router-dom';

const FindId = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  // const [foundId, setFoundId] = useState(null);
  const navigate = useNavigate();
  const handlePhoneNumberVerification = async () => {
    try {
      const data = {
        phoneNumber,
      };
      const response = await fetch(
        'http://192.168.35.241:8000/users/phoneAuth',
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
        alert('올바르지 않은 번호입니다.');
      }
    } catch (error) {
      alert('회원가입 중 오류 발생', error);
    }
  };
  const handleFindId = async () => {
    try {
      const data = {
        phoneNumber,
        verificationCode,
      };
      console.log(data);
      const response = await fetch(
        'http://192.168.35.241:8000/users/phoneAuth/phoneVerifyNumber',
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
        alert(`아이디 찾기 성공! 아이디: ${result.email}`);
      } else {
        alert('아이디 찾기 실패');
      }
    } catch (error) {
      alert('요청 중 오류 발생', error);
    }
  };
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
        <div className="titleText">아이디 찾기</div>

        <div className="findIdInputFrame">
          <input
            className="phoneNumberInput"
            type="text"
            placeholder="휴대폰 번호를 입력해주세요(- 제외)"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
          />

          <input
            className="phoneNumberInput"
            type="text"
            placeholder="인증번호를 입력해주세요"
            value={verificationCode}
            onChange={e => setVerificationCode(e.target.value)}
          />
        </div>
      </div>
      <Button onClick={handlePhoneNumberVerification}>인증번호 받기</Button>
      <Button onClick={handleFindId}>아이디 찾기</Button>
    </div>
  );
};

export default FindId;
