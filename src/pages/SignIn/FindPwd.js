import React from 'react';
import '../../style/sass/findpwd.scss';
import backArrow from '../../style/images/backArrow.png';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button';

const FindPwd = () => {
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
          />
          <Button>인증번호 받기</Button>

          <input
            className="emailInput"
            type="text"
            placeholder="인증번호를 입력해주세요"
          />
          <input
            className="emailInput"
            type="text"
            placeholder="새 비밀번호를 입력해주세요"
          />
          <input
            className="emailInput"
            type="text"
            placeholder="새 비밀번호를 다시한번 입력해주세요"
          />
          <Button>새 비밀번호 등록하기</Button>
        </div>
      </div>
    </div>
  );
};

export default FindPwd;
