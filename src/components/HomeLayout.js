import React from 'react';

const homeLayout = ({ leftChildren, rightChildren }) => {
  return (
    <div className="page home">
      <div className="layoutArea">
        <div className="leftArea">
          <div className="topArea">
            <dl>
              <dt>Today</dt>
              <dd>2312</dd>
            </dl>
            <dl>
              <dt>Total</dt>
              <dd>31234</dd>
            </dl>
          </div>
          {leftChildren}
        </div>
        <div className="rightArea">
          <div className="topArea">
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
          {rightChildren}
        </div>
      </div>
    </div>
  );
};

export default homeLayout;
