import React from 'react';
import '../../style/sass/findid.scss';
import backArrow from '../../style/images/backArrow.png';
import Button from '../../components/button';
import { useNavigate } from 'react-router-dom';

const FindId = () => {
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
        <div className="titleText">아이디 찾기</div>

        <div className="findIdInputFrame">
          <input
            className="phoneNumberInput"
            type="text"
            placeholder="휴대폰 번호를 입력해주세요(- 제외)"
          />

          <input
            className="phoneNumberInput"
            type="text"
            placeholder="인증번호를 입력해주세요"
          />
        </div>
      </div>
      <Button>인증번호 받기</Button>
      <Button>아이디 찾기</Button>
    </div>
  );
};

export default FindId;
