import React, { useState } from 'react';
import closeButton from '../../style/images/icon/close_111152.png';
import '../../style/sass/addPictureFolder.scss';

const AddPictureFolderDialog = ({ isOpen, onClose, onAddFolder }) => {
  const [folderName, setFolderName] = useState('');

  const handleConfirm = async () => {
    await onAddFolder(folderName);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="addModalContent">
        <button className="closeButton">
          <img
            className="buttonImage"
            src={closeButton}
            alt="Close"
            onClick={onClose}
          />
        </button>

        <h1>새 폴더 추가</h1>
        <input
          type="text"
          placeholder="폴더 이름을 입력하세요"
          value={folderName}
          onChange={e => setFolderName(e.target.value)}
        />
        <div className="modalButtons">
          <button onClick={handleConfirm}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default AddPictureFolderDialog;
