import React, { useState } from 'react';
import backArrow from '../../style/images/backArrow.png';
import { useNavigate } from 'react-router-dom';

const FindID = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const navigate = useNavigate();
  const handlePhoneNumberVerification = async () => {
    try {
      const data = {
        phoneNumber,
      };
      const response = await fetch('http://172.30.1.98:8000/users/phoneAuth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
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
        'http://172.30.1.98:8000/users/phoneAuth/phoneVerifyNumber',
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
    navigate('/');
  };
  return (
    <div className="page find">
      <div className="findArea">
        <button className="back" onClick={handleBackButtonClick}>
          <img className="backArrow" src={backArrow} alt="Join backArrow" />
          <div className="BackText">뒤로</div>
        </button>
        <h2 className="findTitle">아이디 찾기</h2>
        <form>
          <div className="formInput">
            <label htmlFor="phoneNumber" className="formLabel blind">
              전화번호
            </label>
            <input
              type="text"
              id="phoneNumber"
              className="formControl"
              value={phoneNumber}
              placeholder="휴대폰 번호를 입력해주세요 (- 제외)"
              onChange={e => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="formInput">
            <label htmlFor="Authentication number" className="formLabel blind">
              인증번호
            </label>
            <input
              type="text"
              id="Authentication number"
              className="formControl"
              placeholder="인증번호를 입력해주세요"
              value={verificationCode}
              onChange={e => setVerificationCode(e.target.value)}
            />
          </div>
        </form>
        <div className="btnArea">
          <button
            type="button"
            className="btn"
            onClick={handlePhoneNumberVerification}
          >
            인증번호 받기
          </button>
        </div>
        <div className="btnArea">
          <button type="button" className="btn" onClick={handleFindId}>
            아이디 찾기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindID;
