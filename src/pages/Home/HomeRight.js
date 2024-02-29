import React from 'react';

const HomeRight = () => {
  return (
    <div className="homeArea">
      <div className="mainArea">
        <div className="newsArea titleArea">
          <span className="title">Update news</span>
          <div className="contentBox">content</div>
        </div>
        <div className="countArea">
          <ul>
            <li>
              <span className="title">사진첩</span>
              <span className="num">21</span>
            </li>
            <li>
              <span className="title">방명록</span>
              <span className="num">231</span>
            </li>
            <li>
              <span className="title">다이어리</span>
              <span className="num">1314</span>
            </li>
          </ul>
        </div>
        <div className="friendsArea titleArea">
          <span className="title">What friends say</span>
          <div className="contentBox">content</div>
        </div>
        <div className="musicArea">
          <div className="contentBox">content</div>
        </div>
        <div className="photoArea titleArea">
          <span className="title">favorite photo</span>
          <div className="contentBox">content</div>
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
