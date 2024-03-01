import React from 'react';
import testImg from '../../style/images/logo.png';

const VisitorsRight = () => {
  return (
    <div className="homeArea">
      <div className="visitors">
        <div className="readArea">
          <div className="imgArea">
            <img src={testImg} alt="" />
          </div>
          <div className="readBox">
            <div className="textArea">
              <p className="text">게시글 내용</p>
            </div>
            <div className="btnArea">
              <button type="button" className="btn">
                등록
              </button>
            </div>
          </div>
        </div>
        <div className="readArea">
          <div className="imgArea">
            <img src={testImg} alt="" />
          </div>
          <div className="readBox">
            <div className="textArea">
              <p className="text">게시글 내용</p>
            </div>
            <div className="btnArea">
              <button type="button" className="btn">
                등록
              </button>
            </div>
          </div>
        </div>
        <div className="readArea">
          <div className="imgArea">
            <img src={testImg} alt="" />
          </div>
          <div className="readBox">
            <div className="textArea">
              <p className="text">게시글 내용</p>
            </div>
            <div className="btnArea">
              <button type="button" className="btn">
                등록
              </button>
            </div>
          </div>
        </div>
        <div className="writeArea">
          <div className="topBox">
            <div className="leftBox">
              <span className="title">no. 29 감성</span>
              <span className="time">2024.03.01</span>
            </div>
            <div className="rightBox">
              <ul className="list">
                <li>
                  <button type="button" className="btn">
                    비밀로 하기
                  </button>
                </li>
                <li>
                  <button type="button" className="btn">
                    삭제
                  </button>
                </li>
                <li>
                  <button type="button" className="btn">
                    수정
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="contentsBox">
            <div className="imgArea">
              <img src={testImg} alt="" />
            </div>
            <div className="readBox">
              <div className="textArea">
                <span className="secret">
                  비밀이야(이 글은 홈주인과 작성자만 볼 수 있어요)
                </span>
                <p className="text">게시글 내용</p>
              </div>
            </div>
          </div>
          <div className="bottomBox">
            <div className="inputArea">
              <label htmlFor="write" className="formLabel blind">
                글 쓰기
              </label>
              <input type="text" id="write" className="formControl" />
            </div>
            <div className="btnArea">
              <button type="button" className="btn">
                등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorsRight;
