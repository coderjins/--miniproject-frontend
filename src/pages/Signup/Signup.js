import React from 'react';

const Signup = () => {
  return (
    <div className="page signup">
      <div className="signupArea">
        <h2 className="signupTitle">WELCOME!!!</h2>
        <form>
          <div className="formInput">
            <label htmlFor="email" className="formLabel blind">
              이메일
            </label>
            <input
              type="email"
              id="email"
              className="formControl"
              placeholder="이메일을 입력해주세요"
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
              placeholder="비밀번호를 입력해주세요"
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
              placeholder="비밀번호를 다시한번 입력해주세요"
            />
          </div>
          <div className="formInput">
            <label htmlFor="name" className="formLabel blind">
              이름
            </label>
            <input
              type="text"
              id="name"
              className="formControl"
              placeholder="이름을 입력해주세요"
            />
          </div>
          <div className="formInput">
            <label htmlFor="phoneNumber" className="formLabel blind">
              전화번호
            </label>
            <input
              type="number"
              id="phoneNumber"
              className="formControl"
              placeholder="전화번호를 입력해주세요"
            />
          </div>
          <div className="formInput">
            <label htmlFor="nickname" className="formLabel blind">
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              className="formControl"
              placeholder="닉네임을 입려해주세요"
            />
          </div>
        </form>
        <div className="btnArea">
          <button type="button" className="btn">
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
