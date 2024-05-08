import React, { useEffect, useState, useRef } from 'react';
import backArrow from '../../style/images/backArrow.png';
import {
  fetchDiaryInfo,
  postDiary,
  updateDiary,
  deleteDiary,
  fetchDiaryComments,
  postCommentToServer,
  deleteComment,
} from './DiaryRightApi';
let token = localStorage.getItem('accessToken');
const DiaryRight = () => {
  const [showDiaryList, setShowDiaryList] = useState(false);
  const [showWriteDiary, setShowWriteDiary] = useState(false);
  const [showEditDiary, setShowEditDiary] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showDeleteBox, setShowDeleteBox] = useState(false);
  const [showCommentDeleteBox, setShowCommentDeleteBox] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [diaryInfo, setDiaryInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [mainDiaryCurrentPage, setMainDiaryCurrentPage] = useState(1);
  const [diaryTitle, setDiaryTitle] = useState('');
  const [diaryContent, setDiaryContent] = useState('');
  const [selectedDiaryIndex, setSelectedDiaryIndex] = useState(null);
  const [editingDiaryTitle, setEditingDiaryTitle] = useState('');
  const [editingDiaryContent, setEditingDiaryContent] = useState('');
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  const observer = useRef();

  const clickDiaryList = () => {
    setShowDiaryList(true);
    setShowWriteDiary(false);
    setShowEditDiary(false);
    setShowComment(false);
  };

  const showDiaryDetailPage = index => {
    const selectedDiaryId = sortedDiaryInfo[index].id;

    setSelectedDiaryIndex(selectedDiaryId);
    setMainDiaryCurrentPage(diaryInfo.length - index);
    setShowDiaryList(false);
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
      const selectedDiaryId = sortedDiaryInfo[mainDiaryCurrentPage - 1].id;
      const selectedDiary = sortedDiaryInfo.find(
        diary => diary.id === selectedDiaryId,
      );
      setEditingDiaryTitle(selectedDiary.diaryTitle);
      setEditingDiaryContent(selectedDiary.diaryContent);
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

  const backDiaryView = () => {
    setShowDiaryList(false);
    setShowWriteDiary(false);
    setShowEditDiary(false);
    setShowComment(false);
    setShowDeleteBox(false);
    setShowCommentDeleteBox(false);
    setSelectedOption('');
  };

  //메인 페이지 페이지네이션 관련 부분

  const handleNextMainPage = () => {
    if (mainDiaryCurrentPage < diaryInfo.length) {
      setMainDiaryCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevMainPage = () => {
    if (mainDiaryCurrentPage > 1) {
      setMainDiaryCurrentPage(prevPage => prevPage - 1);
    }
  };

  const isFirstDiary = mainDiaryCurrentPage === 1;
  const isLastDiary = mainDiaryCurrentPage === diaryInfo.length;

  const sortedDiaryInfo = [...diaryInfo].reverse();

  // infinity scroll 부분
  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
    });
    if (observer.current && !loading && hasMore) {
      // document.querySelector()를 사용하여 관찰할 요소를 선택
      const targetElement = document.querySelector('#end-of-list');
      if (targetElement) {
        observer.current.observe(targetElement);
      }
    }
  }, [loading, hasMore]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchDiaryInfo();
      // generateMockData();
      console.log('불러온 데이터', data);
      setDiaryInfo(prevData => [...prevData, ...data]);
      setCurrentPage(prevPage => prevPage + 1);
      if (data.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleObserver = entities => {
    const target = entities[0];
    if (target.isIntersecting && !loading && hasMore) {
      fetchData();
    }
  };
  //

  const handlePostDiary = async () => {
    const { success, message } = await postDiary(
      diaryTitle,
      diaryContent,
      token,
    );
    if (success) {
      alert(message);
      fetchData();
      backDiaryView();
    } else {
      alert(message);
    }
  };

  const handleEditDiary = async () => {
    if (sortedDiaryInfo.length === 0) {
      console.error('Error: sortedDiaryInfo array is empty.');
      return;
    }
    try {
      const selectedDiaryId = sortedDiaryInfo[mainDiaryCurrentPage - 1].id;

      const editedTitle = editingDiaryTitle;
      const editedContent = editingDiaryContent;

      const { success, message } = await updateDiary(
        selectedDiaryId,
        editedTitle,
        editedContent,
        token,
      );

      if (success) {
        alert(message);
        fetchData(); // 수정 후 데이터 다시 불러오기
        backDiaryView(); // 수정 후 화면 처음으로 돌아가기
      } else {
        alert(message);
      }
    } catch (error) {
      console.error('Error editing diary', error);
    }
  };

  const handleChangeTitle = e => {
    setDiaryTitle(e.target.value);
  };

  const handleChangeContent = e => {
    setDiaryContent(e.target.value);
  };

  const handleDeleteDiary = async () => {
    const selectedDiaryId = sortedDiaryInfo[mainDiaryCurrentPage - 1].id;
    const { success, message } = await deleteDiary(selectedDiaryId, token);
    if (success) {
      alert(message);
      fetchData(); // 삭제 후 데이터 다시 불러오기
      backDiaryView(); // 다이어리 화면으로 돌아가기
    } else {
      alert(message);
    }
  };

  const clickShowComment = async () => {
    if (sortedDiaryInfo.length === 0) {
      console.error('Error: sortedDiaryInfo array is empty.');
      return;
    }
    const selectedDiaryId = sortedDiaryInfo[mainDiaryCurrentPage - 1].id;
    try {
      // 서버에서 선택된 다이어리의 댓글 데이터를 받아옵니다.
      const data = await fetchDiaryComments(selectedDiaryId, token);
      // 받아온 댓글 데이터를 설정합니다.
      setComments(data);
      // 댓글을 보여주는 상태를 true로 설정합니다.
      setShowComment(true);
    } catch (error) {
      console.error('Error fetching comments', error);
    }
  };
  // useEffect(() => {
  //   clickShowComment();
  // }, []);

  const handleChangeNewComment = e => {
    setNewComment(e.target.value);
  };

  const handleAddComment = async () => {
    const selectedDiaryId = sortedDiaryInfo[mainDiaryCurrentPage - 1].id;
    try {
      console.log('Token:', token);
      // 서버로 새로운 댓글을 보냅니다.
      const response = await postCommentToServer(
        selectedDiaryId,
        newComment,
        token,
      );
      if (response.success) {
        // 새로운 댓글이 성공적으로 추가되었음을 알리기 위해 newComment 상태를 변경합니다.
        setNewComment('');
        const data = await fetchDiaryComments(selectedDiaryId, token);
        setComments(data);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error('Error adding comment', error);
    }
  };

  const handleDeleteComment = async commentId => {
    try {
      const selectedDiaryId = sortedDiaryInfo[mainDiaryCurrentPage - 1].id;
      const response = await deleteComment(selectedDiaryId, commentId, token);
      if (response.success) {
        alert(response.message);
        const updatedComments = comments.filter(
          comment => comment.id !== commentId,
        );
        setComments(updatedComments);
        setShowCommentDeleteBox(false);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error('Error deleting comment', error);
    }
  };

  return (
    <div className="homeArea">
      <div className="diary">
        <div className="diaryContainer">
          {showDiaryList && (
            <div
              className="diaryList"
              style={{ overflowY: 'scroll', maxHeight: '100%' }}
            >
              <button className="backArrow" onClick={backDiaryView}>
                <img className="backArrowImg" src={backArrow} alt="backArrow" />
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
              {diaryInfo.map((post, index) => (
                <div
                  className="diaryGrid"
                  key={index}
                  onClick={() => showDiaryDetailPage(index)}
                >
                  <div className="diaryItem">
                    <div className="diaryItemNumber">{index + 1}</div>
                    <div className="diaryItemTitle">{post.diaryTitle}</div>
                    <div className="diaryItemPostingTime">
                      {post.postingTime}
                    </div>
                    <div className="diaryItemComments">
                      {post.comments ? post.comments.length : 0}
                    </div>
                  </div>
                </div>
              ))}
              {loading && <div>Loading...</div>}
              <div id="end-of-list" style={{ height: '10px' }} />
            </div>
          )}
          {showWriteDiary && (
            <div className="writeDiary">
              <button className="writeDiaryBackArrow" onClick={backDiaryView}>
                <img
                  className="writeDiaryBackArrowImg"
                  src={backArrow}
                  alt="backArrow"
                />
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
                      value={diaryTitle}
                      onChange={handleChangeTitle}
                    />
                  </div>
                  <div className="postContent">
                    <textarea
                      className="postContentInput"
                      placeholder="내용을 입력하세요"
                      rows="15"
                      cols="30"
                      style={{ resize: 'none' }}
                      value={diaryContent}
                      onChange={handleChangeContent}
                    />
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
                    <button onClick={handlePostDiary}>게시물 작성</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showEditDiary && (
            <div className="editDiary">
              <button className="editDiaryBackArrow" onClick={backDiaryView}>
                <img
                  className="editDiaryBackArrowImg"
                  src={backArrow}
                  alt="backArrow"
                />
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
                      value={editingDiaryTitle}
                      onChange={e => setEditingDiaryTitle(e.target.value)}
                    />
                  </div>
                  <div className="editContent">
                    <textarea
                      className="editContentInput"
                      placeholder="수정할 내용을 입력하세요"
                      rows="15"
                      cols="30"
                      style={{ resize: 'none' }}
                      value={editingDiaryContent}
                      onChange={e => setEditingDiaryContent(e.target.value)}
                    />
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
                    <button onClick={handleEditDiary}>수정 완료</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showComment && (
            <div className="writeGroup">
              <button className="commentsBackArrow" onClick={backDiaryView}>
                <img
                  className="commentsBackArrowImg"
                  src={backArrow}
                  alt="backArrow"
                />
                <span>뒤로</span>
              </button>
              <div className="commentsWrapper">
                <div className="commentsInfo">댓글</div>
                <div className="commentsContainer">
                  {comments.length === 0 ? (
                    <div className="noCommentsMessage">
                      새로운 댓글을 달아보세요!
                    </div>
                  ) : (
                    comments.map(comment => (
                      <div className="commentsArea" key={comment.id}>
                        <div className="commentsUserInfo">
                          <span className="commentUser">
                            {comment.username}
                          </span>
                          <span className="commentPostTime">
                            {comment.createdAt}
                          </span>
                        </div>
                        <div className="comment">{comment.content}</div>
                        <button
                          className="deleteComment"
                          onClick={() => setShowCommentDeleteBox(comment)}
                        >
                          삭제
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="writeBox">
                <div className="inputBox">
                  <label htmlFor="write" className="formLabel blind">
                    글 쓰기
                  </label>
                  <input
                    type="text"
                    id="write"
                    className="formControl"
                    value={newComment}
                    onChange={handleChangeNewComment}
                  />
                </div>
                <div className="btnBox">
                  <button
                    type="button"
                    className="btn"
                    onClick={handleAddComment}
                  >
                    확인
                  </button>
                </div>
              </div>
            </div>
          )}
          {showDeleteBox && (
            <div>
              <div className="dimmedBackground" />
              <div className="deleteBox">
                <div className="deleteContent">
                  <h2>글을 삭제하시겠습니까?</h2>
                  <div className="deleteBtnGroup">
                    <button
                      className="confirmDeleteBtn"
                      onClick={handleDeleteDiary}
                    >
                      확인
                    </button>
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
          {showCommentDeleteBox && (
            <div>
              <div className="dimmedBackground" />
              <div className="deleteBox">
                <div className="deleteContent">
                  <h2>댓글을 삭제하시겠습니까?</h2>
                  <div className="deleteBtnGroup">
                    <button
                      className="confirmDeleteBtn"
                      onClick={() =>
                        handleDeleteComment(showCommentDeleteBox.id)
                      }
                    >
                      확인
                    </button>
                    <button
                      className="cancelDeleteBtn"
                      onClick={() => setShowCommentDeleteBox(false)}
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
                  {diaryInfo.length === 0 ? (
                    <div className="noDiaryDataMessage">
                      게시물을 등록해보세요!
                    </div>
                  ) : (
                    <div>
                      <div className="titleArea">
                        <span className="time">
                          {sortedDiaryInfo[mainDiaryCurrentPage - 1].createdAt}
                        </span>
                        <span className="title">
                          {sortedDiaryInfo[mainDiaryCurrentPage - 1].diaryTitle}
                        </span>
                      </div>
                      <div className="contents">
                        {sortedDiaryInfo[mainDiaryCurrentPage - 1].diaryContent}
                      </div>
                    </div>
                  )}
                </div>
                <div className="diaryInfoArea">
                  <button
                    type="button"
                    className="commentBtn"
                    onClick={clickShowComment}
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
                    <button
                      type="button"
                      className="btn"
                      onClick={handlePrevMainPage}
                      disabled={isFirstDiary}
                    >
                      이전글
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={handleNextMainPage}
                      disabled={isLastDiary}
                    >
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
