import React from 'react';
import testImg from '../../style/images/logo.png';

const HomeLeft = () => {
  return (
    <div className="homeArea">
      <div className="textArea">
        <span className="text">Today... 감성</span>
      </div>
      <div className="profileArea">
        <img src={testImg} alt="" />
      </div>
      <div className="memoArea">
        <span className="memo">메모</span>
      </div>
      <div className="btnArea">
        <button type="button" className="btn">
          EDIT
        </button>
        <button type="button" className="btn">
          HISTORY
        </button>
        <button type="button" className="btn">
          COUSIN
        </button>
      </div>
      <div className="selectArea">
        <select name="select">
          <option value="value01">파도타기</option>
          <option value="value02">파도타기2</option>
        </select>
      </div>
    </div>
  );
};

export default HomeLeft;
