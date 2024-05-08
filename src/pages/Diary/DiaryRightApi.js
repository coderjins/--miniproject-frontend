import axios from 'axios';
import {
  GET_DIARY_API,
  POST_DIARY_API,
  UPDATE_DIARY_API,
  DELETE_DIARY_API,
  GET_DIARY_COMMENTS_API,
  POST_COMMENT_API,
  DELETE_COMMENT_API,
} from '../../config/apiConfig';

const token = localStorage.getItem('accessToken');

export const fetchDiaryInfo = async () => {
  try {
    if (!token) {
      alert('올바르지 않은 접근입니다.');
      return null;
    }

    const diaryResponse = await axios.get(GET_DIARY_API, {
      headers: { Authorization: token },
    });

    if (diaryResponse.status === 200) {
      return diaryResponse.data.data;
    } else {
      console.log('데이터를 불러오는데 실패했습니다.');
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.error('서버 응답 오류', error.response.data);
    } else if (error.request) {
      console.error('서버 응답 없음', error.request);
    } else {
      console.error('오류 발생', error.message);
    }
    return null;
  }
};

export const postDiary = async (diaryTitle, diaryContent, token) => {
  try {
    const data = {
      title: diaryTitle,
      content: diaryContent,
    };

    const response = await fetch(POST_DIARY_API, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 201) {
      return {
        success: true,
        message: '다이어리가 성공적으로 작성되었습니다.',
      };
    } else {
      return { success: false, message: '다이어리 작성에 실패했습니다.' };
    }
  } catch (error) {
    console.error('다이어리 작성 중 오류 발생', error);
    return { success: false, message: '다이어리 작성 중 오류가 발생했습니다.' };
  }
};

export const updateDiary = async (
  selectedDiaryId,
  editedTitle,
  editedContent,
  token,
) => {
  try {
    const response = await fetch(`${UPDATE_DIARY_API}/${selectedDiaryId}`, {
      method: 'PUT',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newTitle: editedTitle,
        newContent: editedContent,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update diary.');
    }

    return { success: true, message: 'Diary updated successfully.' };
  } catch (error) {
    console.error('Error updating diary:', error);
    return { success: false, message: 'Failed to update diary.' };
  }
};

export const deleteDiary = async (selectedDiaryId, token) => {
  try {
    const response = await fetch(`${DELETE_DIARY_API}/${selectedDiaryId}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    });

    if (response.ok) {
      return {
        success: true,
        message: '다이어리가 성공적으로 삭제되었습니다.',
      };
    } else {
      return { success: false, message: '다이어리 삭제에 실패했습니다.' };
    }
  } catch (error) {
    console.error('다이어리 삭제 중 오류 발생', error);
    return { success: false, message: '다이어리 삭제 중 오류가 발생했습니다.' };
  }
};

export const fetchDiaryComments = async (selectedDiaryId, token) => {
  console.log('dfsadf', token);
  try {
    const response = await fetch(
      `${GET_DIARY_COMMENTS_API}/${selectedDiaryId}/comments`,
      {
        headers: { Authorization: token },
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      console.log('댓글을 불러오는데 실패했습니다.');
      return [];
    }
  } catch (error) {
    console.error('댓글을 불러오는 중 오류 발생', error);
    return [];
  }
};

export const postCommentToServer = async (
  selectedDiaryId,
  commentContent,
  token,
) => {
  try {
    const data = {
      content: commentContent,
    };

    const response = await fetch(
      `${POST_COMMENT_API}/${selectedDiaryId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(data),
      },
    );

    if (response.status === 201) {
      return { success: true, message: '댓글이 성공적으로 작성되었습니다.' };
    } else {
      return { success: false, message: '댓글 작성에 실패했습니다.' };
    }
  } catch (error) {
    console.error('댓글 작성 중 오류 발생', error);
    return { success: false, message: '댓글 작성 중 오류가 발생했습니다.' };
  }
};

export const deleteComment = async (selectedDiaryId, commentId, token) => {
  try {
    const response = await axios.delete(
      `${DELETE_COMMENT_API}/${selectedDiaryId}/comments/${commentId}`,
      {
        headers: { Authorization: token },
      },
    );

    if (response.status === 200) {
      return {
        success: true,
        message: '댓글이 성공적으로 삭제되었습니다.',
      };
    } else {
      return { success: false, message: '댓글 삭제에 실패했습니다.' };
    }
  } catch (error) {
    console.error('댓글 삭제 중 오류 발생', error);
    return { success: false, message: '댓글 삭제 중 오류가 발생했습니다.' };
  }
};
