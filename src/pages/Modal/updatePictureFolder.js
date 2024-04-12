import React, { useState, useEffect } from 'react';
import closeButton from '../../style/images/icon/close_111152.png';
import '../../style/sass/updatePictureFolder.scss';

let token = localStorage.getItem('accessToken');

const UpdatePictureFolderModal = ({
  isOpen,
  onClose,
  selectedFolderName,
  selectedFolderId,
  onUpdateFolder,
}) => {
  const [folderName, setFolderName] = useState('');
  const [folderId, setFolderId] = useState('');

  useEffect(() => {
    // 모달이 열릴 때 기존 폴더 이름을 설정
    console.log('selectedFolderName:', selectedFolderName);
    setFolderName(selectedFolderName);
    setFolderId(selectedFolderId);
  }, [selectedFolderName]);

  const handleUpdate = () => {
    const folderId = selectedFolderId;
    fetch(`http://172.30.1.98:8000/folders/update?folderId=${folderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        oldFolderName: selectedFolderName,
        newFolderName: folderName,
      }),
    })
      .then(response => response.json())
      .then(data => {
        // 폴더 이름 업데이트 후에 폴더 목록을 다시 가져옴
        fetch('http://172.30.1.98:8000/folders/read', {
          headers: {
            Authorization: token,
          },
        })
          .then(response => response.json())
          .then(data => {
            onUpdateFolder(data.data);
            onClose();
          })
          .catch(error => {
            console.error('폴더 데이터 반환 오류:', error);
            onClose();
          });
      })
      .catch(error => {
        console.error('폴더 이름 업데이트 오류', error);
      });
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="updateModalContent">
        <button className="closeButton">
          <img
            className="buttonImage"
            src={closeButton}
            alt="Close"
            onClick={onClose}
          />
        </button>

        <h1>폴더 이름 수정</h1>

        <h2 className="basicFolderName">{selectedFolderName}</h2>
        <input
          type="text"
          placeholder="폴더 이름을 입력하세요"
          value={folderName}
          onChange={e => setFolderName(e.target.value)}
        />
        <div className="modalButtons">
          <button onClick={handleUpdate}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePictureFolderModal;
