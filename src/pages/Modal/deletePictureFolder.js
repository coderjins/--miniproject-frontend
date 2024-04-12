import React from 'react';
import closeButton from '../../style/images/icon/close_111152.png';
import '../../style/sass/deletePictureFolder.scss';

const DeletePictureFolderModal = ({
  isOpen,
  onClose,
  selectedFolderName,
  onDeleteFolder,
}) => {
  const handleConfirmDelete = () => {
    onDeleteFolder(selectedFolderName);
    onClose();
  };
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="deleteModalContent">
        <button className="closeButton">
          <img
            className="buttonImage"
            src={closeButton}
            alt="Close"
            onClick={onClose}
          />
        </button>

        <h1>폴더 삭제</h1>
        <h2 className="deleteFolderName">{selectedFolderName}</h2>
        <div className="modalButtons">
          <button onClick={handleConfirmDelete}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePictureFolderModal;
