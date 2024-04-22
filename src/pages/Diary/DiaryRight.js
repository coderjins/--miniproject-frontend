import React, { useState } from 'react';
import backArrow from '../../style/images/backArrow.png';

const DiaryRight = () => {
  const [showDiaryList, setShowDiaryList] = useState(false);
  const [showWriteDiary, setShowWriteDiary] = useState(false);
  const [showEditDiary, setShowEditDiary] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showDeleteBox, setShowDeleteBox] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const clickDiaryList = () => {
    setShowDiaryList(true);
    setShowWriteDiary(false);
    setShowEditDiary(false);
    setShowComment(false);
  };

  const clickWriteDiary = event => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    if (selectedValue === 'write') {
      setShowDiaryList(false);
      setShowWriteDiary(true);
      setShowEditDiary(false);
      setShowComment(false);
    } else if (selectedValue === 'edit') {
      setShowEditDiary(true);
      setShowComment(false);
    } else if (selectedValue === 'delete') {
      setShowDiaryList(false);
      setShowWriteDiary(false);
      setShowEditDiary(false);
      setShowComment(false);
      setShowDeleteBox(true);
    }
  };

  const clickComment = () => {
    setShowComment(true);
  };

  const backDiaryView = () => {
    setShowDiaryList(false);
    setShowWriteDiary(false);
    setShowEditDiary(false);
    setShowComment(false);
    setShowDeleteBox(false);
    setSelectedOption('');
  };

  return (
    <div className="homeArea">
      <div className="diary">
        <div className="diaryContainer">
          {showDiaryList && (
            <div className="diaryList">
              <button className="backArrow" onClick={backDiaryView}>
                <img className="backArrowImg" src={backArrow} />
                <span>뒤로</span>
              </button>
              <div className="diaryListInfoArea">
                <h1>다이어리 목록</h1>
              </div>
              <div className="diaryTitleGrid">
                <div className="diaryTitleNumber">No</div>
                <div className="diaryTitle">제목</div>
                <div className="diaryTitlePostingTime">작성일자</div>
                <div className="diaryTitleComments">댓글수</div>
              </div>
              <div className="diaryGrid">
                <button className="diaryItem">
                  <div className="diaryItemNumber">1</div>
                  <div className="diaryItemTitle">아이템 제목입니다</div>
                  <div className="diaryItemPostingTime">2024-04-15</div>
                  <div className="diaryItemComments">1</div>
                </button>
              </div>
              <div className="paginationButtons">
                <button className="paginationButton">이전</button>
                <button className="paginationButton">1</button>
                <button className="paginationButton">다음</button>
              </div>
            </div>
          )}
          {showWriteDiary && (
            <div className="writeDiary">
              <button className="writeDiaryBackArrow" onClick={backDiaryView}>
                <img className="writeDiaryBackArrowImg" src={backArrow} />
                <span>뒤로</span>
              </button>
              <div className="postItem">
                <div className="diaryWriteInfoArea">
                  <h1>다이어리 작성</h1>
                </div>
                <div>
                  <div className="postHeader">
                    <input
                      type="text"
                      className="postHeaderInput"
                      placeholder="제목을 입력하세요."
                    />
                  </div>
                  <div className="postContent">
                    <textarea
                      className="postContentInput"
                      placeholder="내용을 입력하세요"
                      rows="15"
                      cols="30"
                      style={{ resize: 'none' }}
                    ></textarea>
                  </div>
                  <div className="postFooter">
                    <div className="privacySetting">
                      <label>
                        <input type="radio" name="privacy" value="public" />
                        전체
                      </label>
                      <label>
                        <input type="radio" name="privacy" value="private" />
                        일촌 공개
                      </label>
                    </div>
                    <button>게시물 작성</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showEditDiary && (
            <div className="editDiary">
              <button className="editDiaryBackArrow" onClick={backDiaryView}>
                <img className="editDiaryBackArrowImg" src={backArrow} />
                <span>뒤로</span>
              </button>
              <div className="editItem">
                <div className="diaryEditInfoArea">
                  <h1>다이어리 수정</h1>
                </div>
                <div>
                  <div className="editHeader">
                    <input
                      type="text"
                      className="editHeaderInput"
                      placeholder="수정할 제목을 입력하세요."
                    />
                  </div>
                  <div className="editContent">
                    <textarea
                      className="editContentInput"
                      placeholder="수정할 내용을 입력하세요"
                      rows="15"
                      cols="30"
                      style={{ resize: 'none' }}
                    ></textarea>
                  </div>
                  <div className="editFooter">
                    <div className="editPrivacySetting">
                      <label>
                        <input type="radio" name="privacy" value="public" />
                        전체
                      </label>
                      <label>
                        <input type="radio" name="privacy" value="private" />
                        일촌 공개
                      </label>
                    </div>
                    <button>수정 완료</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showComment && (
            <div className="writeGroup">
              <button className="commentsBackArrow" onClick={backDiaryView}>
                <img className="commentsBackArrowImg" src={backArrow} />
                <span>뒤로</span>
              </button>
              <div className="commentsWrapper">
                <div className="commentsInfo">댓글</div>
                <div className="commentsContainer">
                  <div className="commentsArea">
                    <div className="commentsUserInfo">
                      <span className="commentUser">유저이름</span>
                      <span className="commentPostTime">작성시간</span>
                    </div>
                    <div className="comment">
                      댓글 창이에요!
                      ddddddhaskofwihefiowahefoiahwegwpeihgwheoghaweghawpehgawoeighawpoeghaowe
                    </div>
                    <button className="deleteComment">삭제</button>
                  </div>
                </div>
              </div>
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
          )}
          {showDeleteBox && (
            <div>
              <div className="dimmedBackground"></div>
              <div className="deleteBox">
                <div className="deleteContent">
                  <h2>글을 삭제하시겠습니까?</h2>
                  <div className="deleteBtnGroup">
                    <button className="confirmDeleteBtn">확인</button>
                    <button
                      className="cancelDeleteBtn"
                      onClick={() => {
                        setShowDeleteBox(false);
                        setSelectedOption('');
                      }}
                    >
                      취소
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!showDiaryList &&
            !showWriteDiary &&
            !showEditDiary &&
            !showComment && (
              <div className="diaryArea">
                <div className="diaryGroup">
                  <div className="titleArea">
                    <span className="time">글 작성한 날짜</span>
                    <span className="title">다이어리 글 제목</span>
                  </div>
                  <div className="contents">다이어리 작성 내용</div>
                </div>
                <div className="diaryInfoArea">
                  <button
                    type="button"
                    className="commentBtn"
                    onClick={clickComment}
                  >
                    댓글보기
                  </button>
                  <div className="diaryInfo">일촌 공개</div>
                </div>
                <div className="btnArea">
                  <button
                    type="button"
                    className="btn box"
                    onClick={clickDiaryList}
                  >
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

                  <select
                    type="button"
                    className="btn box selectBox"
                    value={selectedOption}
                    onChange={clickWriteDiary}
                  >
                    <option>게시물 관리</option>
                    <option value="write">글 쓰기</option>
                    <option value="edit">글 수정</option>
                    <option value="delete">글 삭제</option>
                  </select>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default DiaryRight;
