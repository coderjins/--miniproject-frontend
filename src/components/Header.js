import React from 'react';

const Header = () => {
  return (
    <div className="header">
      <div className="leftArea">
        <div className="countArea">
          <dl>
            <dt>Today</dt>
            <dd>2312</dd>
          </dl>
          <dl>
            <dt>Total</dt>
            <dd>31234</dd>
          </dl>
        </div>
      </div>
      <div className="rightArea">
        <div className="titleArea">
          <span className="title">홈페이지 이름</span>
          <button type="button" className="btn">
            수정
          </button>
        </div>
        <div className="urlArea">
          <button type="button" className="btn">
            <span className="blind">로그아웃</span>
          </button>
          <span className="url">홈페이지 url</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
