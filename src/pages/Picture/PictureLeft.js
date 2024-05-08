import React, { useState, useEffect } from 'react';
import '../../style/sass/pictureLeft.scss';
import folderImage from '../../style/images/icon/file-1294464_1280 1.png';
import gear from '../../style/images/icon/gear-1119298_1280 1.png';
import AddPictureFolderModal from '../Modal/addPictureFolder';
import UpdatePictureFolderModal from '../Modal/updatePictureFolder';
import DeletePictureFolderModal from '../Modal/deletePictureFolder';
import {
  FOLDERS_MAKE_API,
  FOLDERS_READ_API,
  FOLDERS_DELETE_API,
} from '../../config/apiConfig';

const PictureLeft = ({ onSelectFolder, onUpdateFolders }) => {
  const [folderOption, setFolderOption] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeletModalOpen, setDeleteModalOpen] = useState(false);
  const [folders, setFolders] = useState([]);
  const [selectedFolderName, setSelectedFolderName] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState('');

  let token = localStorage.getItem('accessToken');
  // 새로운 폴더 추가 함수
  const handleAddFolder = newFolderName => {
    fetch(FOLDERS_MAKE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ folderName: newFolderName }),
    })
      .then(response => response.json())
      .then(data => {
        // 새로운 폴더가 추가된 후에 폴더 목록을 다시 가져옴
        fetch(FOLDERS_READ_API, {
          headers: {
            Authorization: token,
          },
        })
          .then(response => response.json())
          .then(data => {
            setFolders(data.data);
            onUpdateFolders(data.data);
            onSelectFolder(data.data[0].id);
          })
          .catch(error => {
            console.error('폴더 데이터 반환 오류:', error);
          });

        setAddModalOpen(false); // 추가 모달 닫기
      })
      .catch(error => {
        console.error('폴더 데이터 전송 오류:', error);
      });
  };

  // 폴더 업데이트 함수
  const handleUpdateFolder = updatedFolderData => {
    setFolders(updatedFolderData);
  };

  //폴더 삭제 함수
  const handleDeleteFolder = () => {
    fetch(FOLDERS_DELETE_API, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ folderName: selectedFolderName }),
    })
      .then(response => response.json())
      .then(data => {
        // 폴더 삭제 후에 폴더 목록을 다시 가져옴
        fetch(FOLDERS_READ_API, {
          headers: {
            Authorization: token,
          },
        })
          .then(response => response.json())
          .then(data => {
            setFolders(data.data);
            onUpdateFolders(data.data);
            setDeleteModalOpen(false);
          })
          .catch(error => {
            console.error('폴더 데이터 반환 오류:', error);
            setDeleteModalOpen(false);
          });
      })
      .catch(error => {
        console.error('폴더 삭제 오류:', error);
      });
  };

  // 폴더 데이터 불러오기
  useEffect(() => {
    fetch(FOLDERS_READ_API, {
      headers: {
        Authorization: token,
      },
    })
      .then(response => response.json())
      .then(data => {
        setFolders(data.data);
        onUpdateFolders(data.data);
      })
      .catch(error => {
        console.error('폴더 데이터 반환 오류:', error);
      });
  }, []);

  // 폴더 관리 옵션 변경 함수
  const handleManageFolderClick = () => {
    setFolderOption(!folderOption);
  };

  const handleConfirmClick = () => {
    setFolderOption(false);
  };

  // 폴더 추가 모달 열기 함수
  const handleAddFolderClick = () => {
    setAddModalOpen(true);
  };
  // 폴더 추가 모달 닫기 함수
  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };
  // 폴더 수정 모달 열기 함수
  const handleUpdateFolderClick = (folderId, folderName) => {
    setSelectedFolderId(folderId);
    setSelectedFolderName(folderName);
    setUpdateModalOpen(true);
  };
  // 폴더 수정 모달 닫기 함수
  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };
  // 폴더 삭제 모달 열기 함수
  const handleDeleteFolderClick = (folderId, folderName) => {
    setSelectedFolderId(folderId);
    setSelectedFolderName(folderName);
    setDeleteModalOpen(true);
  };
  // 폴더 삭제 모달 닫기 함수
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleFolderClick = folderId => {
    setSelectedFolderId(folderId);
    onSelectFolder(folderId);
  };

  return (
    <div className="homeArea">
      <div className="photoFolderArea">
        <div className="photoFolderGroup">
          {folders.map(folder => (
            <div key={folder.id} className="photoFolder">
              <img
                className="folderImage"
                src={folderImage}
                alt="이미지 준비중"
              />
              <button
                className="photoFolderName"
                onClick={() => handleFolderClick(folder.id)}
              >
                {folder.folderName}
              </button>
              <div className="folderOptions">
                {folderOption && (
                  <>
                    <button
                      onClick={() =>
                        handleUpdateFolderClick(folder.id, folder.folderName)
                      }
                    >
                      수정
                    </button>
                    <span>|</span>
                    <button
                      onClick={() =>
                        handleDeleteFolderClick(folder.id, folder.folderName)
                      }
                    >
                      삭제
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="folderManagementArea">
          {!folderOption && (
            <button
              type="button"
              className="manageFolderName"
              onClick={handleManageFolderClick}
            >
              <img className="gearImage" src={gear} alt="이미지 준비중" />
              <div className="managefolderNameText">폴더관리</div>
            </button>
          )}
          {folderOption && (
            <>
              <button
                type="button"
                className="confirmButton"
                onClick={handleConfirmClick}
              >
                확인
              </button>
              <button
                type="button"
                className="addFolderButton"
                onClick={handleAddFolderClick}
              >
                폴더 추가
              </button>
            </>
          )}
        </div>
      </div>

      {isAddModalOpen && (
        <AddPictureFolderModal
          isOpen={isAddModalOpen}
          onClose={handleCloseAddModal}
          onAddFolder={handleAddFolder}
        />
      )}
      {isUpdateModalOpen && (
        <UpdatePictureFolderModal
          isOpen={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          selectedFolderName={selectedFolderName}
          selectedFolderId={selectedFolderId}
          onUpdateFolder={handleUpdateFolder}
        />
      )}
      {isDeletModalOpen && (
        <DeletePictureFolderModal
          isOpen={isDeletModalOpen}
          onClose={handleCloseDeleteModal}
          selectedFolderName={selectedFolderName}
          onDeleteFolder={handleDeleteFolder}
        />
      )}
    </div>
  );
};

export default PictureLeft;
