import React from 'react';

const FindID = () => {
  return (
    <div className="page find">
      <div className="findArea">
        <h2 className="findTitle">아이디 찾기</h2>
        <form>
          <div className="formInput">
            <label htmlFor="phoneNumber" className="formLabel blind">
              전화번호
            </label>
            <input
              type="number"
              id="phoneNumber"
              className="formControl"
              placeholder="휴대폰 번호를 입력해주세요 (- 제외)"
            />
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
        </form>
        <div className="btnArea">
          <button type="button" className="btn">
            인증번호 받기
          </button>
        </div>
        <div className="btnArea">
          <button type="button" className="btn">
            아이디 찾기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindID;
