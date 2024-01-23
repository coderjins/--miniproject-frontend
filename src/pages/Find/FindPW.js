import React from 'react';

const FindPW = () => {
  return (
    <div className="page find">
      <div className="findArea">
        <h2 className="findTitle">비밀번호 찾기</h2>
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
          <div className="btnArea">
            <button type="button" className="btn">
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
              placeholder="인증번호를 입력해주세요"
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
              placeholder="새 비밀번호를 입력해주세요"
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
            />
          </div>
        </form>
        <div className="btnArea">
          <button type="button" className="btn">
            새 비밀번호 등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindPW;
