import React from 'react';

const Tab = () => {
  return (
    <div className="tab">
      <ul className="tabArea">
        <li>
          <button type="button" className="btn active">
            홈
          </button>
        </li>
        <li>
          <button type="button" className="btn">
            사진첩
          </button>
        </li>
        <li>
          <button type="button" className="btn">
            다이어리
          </button>
        </li>
        <li>
          <button type="button" className="btn">
            방명록
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Tab;
