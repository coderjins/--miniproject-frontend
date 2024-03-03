import React from 'react';

const DiaryRight = () => {
  return (
    <div className="homeArea">
      <div className="diary">
        <div className="diaryArea">
          <div className="diaryGroup">
            <div className="titleArea">
              <span className="time">글 작성한 날짜</span>
              <span className="title">다이어리 글 제목</span>
            </div>
            <div className="contents">다이어리 작성 내용</div>
          </div>
          <div className="writeGrouo">
            <button type="button" className="btn">
              일촌공개
            </button>
            <div className="writeBox">
              <div className="inputBox">
                <label htmlFor="write" className="formLabel blind">
                  글 쓰기
                </label>
                <input type="text" id="write" className="formControl" />
              </div>
              <div className="btnBox">
                <button type="button" className="btn">
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="btnArea">
          <button type="button" className="btn box">
            목록
          </button>
          <div className="btnGroup">
            <button type="button" className="btn">
              이전글
            </button>
            <button type="button" className="btn">
              다음글
            </button>
          </div>
          <button type="button" className="btn box">
            글쓰기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiaryRight;
