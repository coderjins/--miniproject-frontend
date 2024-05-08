import React, { useEffect, useRef, useState } from 'react';
import '../../style/sass/pictureRight.scss';
import axios from 'axios';
import {
  FOLDERS_READ_API,
  PHOTOS_API,
  UPLOAD_PHOTO_API,
  SCRAP_PHOTO_API,
} from '../../config/apiConfig';

const PictureRight = ({ selectedFolderIdProp, folderNames }) => {
  const [updatePhoto, setUpdatePhoto] = useState(false);
  const [photoName, setPhotoName] = useState('');
  const [photoURL, setPhotoURL] = useState(null);
  const [photosFromDB, setPhotosFromDB] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState('');

  const fileInputRef = useRef(null);

  let token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          alert('올바르지 않은 접근입니다.');
          return;
        }
        const [foldersResponse, photosResponse] = await Promise.all([
          axios.get(FOLDERS_READ_API, {
            headers: { Authorization: token },
          }),
          axios.get(
            selectedFolderIdProp
              ? `${PHOTOS_API}?folderId=${selectedFolderIdProp}`
              : PHOTOS_API,

            {
              headers: { Authorization: token },
            },
          ),
        ]);

        if (photosResponse.status === 200 && foldersResponse.status === 200) {
          setPhotosFromDB(photosResponse.data.data);
          const fetchedFolderNames = foldersResponse.data.data;

          if (!selectedFolderIdProp && fetchedFolderNames.length > 0) {
            setSelectedFolderId(fetchedFolderNames[0].id);
          }
        } else {
          console.log('데이터를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('데이터 불러오기 중 오류 발생', error);
      }
    };

    fetchData();
  }, [selectedFolderIdProp]);

  const handleUploadClick = async () => {
    if (updatePhoto) {
      await handleUploadPhoto();
    } else {
      setUpdatePhoto(true);
    }
  };

  const handleTitleChange = e => {
    setPhotoName(e.target.value);
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    setPhotoURL(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleScrap = async photoId => {
    try {
      const response = await axios.put(
        `${SCRAP_PHOTO_API}?photoId=${photoId}`,
        { headers: { Authorization: token } },
      );
      if (response.status === 200) {
        // 스크랩 요청 후에 스크랩 정보를 다시 가져와서 업데이트
        const updatedPhotosResponse = await axios.get(
          `${SCRAP_PHOTO_API}?folderId=${selectedFolderIdProp}`,
          { headers: { Authorization: token } },
        );
        if (updatedPhotosResponse.status === 200) {
          setPhotosFromDB(updatedPhotosResponse.data.data);
          alert('사진이 성공적으로 스크랩되었습니다.');
        } else {
          alert('스크랩에 실패했습니다.');
        }
      } else {
        alert('스크랩에 실패했습니다.');
      }
    } catch (error) {
      console.error('스크랩 중 오류 발생:', error);
      alert('스크랩 중 오류가 발생했습니다.');
    }
  };

  const filteredPhotos = selectedFolderIdProp
    ? photosFromDB.filter(photo => photo.folderId === selectedFolderIdProp)
    : photosFromDB;

  const handleFolderChange = e => {
    const selectedFolderId = parseInt(e.target.value, 10);
    const selectedFolder = folderNames.find(
      folder => folder.id === selectedFolderId,
    );
    if (selectedFolder) {
      setSelectedFolderId(selectedFolder.id);
    }
  };

  const handleUploadPhoto = async () => {
    try {
      const formData = new FormData();
      formData.append('photo', photoURL);
      formData.append('photoName', photoName);
      formData.append('folderId', selectedFolderId);

      const response = await axios.post(UPLOAD_PHOTO_API, formData, {
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 201) {
        const newPhoto = response.data;
        setPhotosFromDB([...photosFromDB, newPhoto]);
        alert('사진이 성공적으로 등록되었습니다.');
        setUpdatePhoto(false);

        const updatedPhotosResponse = await axios.get(
          `${PHOTOS_API}?folderId=${selectedFolderId}`,
          { headers: { Authorization: token } },
        );
        if (updatedPhotosResponse.status === 200) {
          setPhotosFromDB(updatedPhotosResponse.data.data);
        } else {
          alert('사진 정보를 가져오는데 실패했습니다.');
        }
      } else {
        alert('사진 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('사진 등록 중 오류 발생:', error);
      alert('사진 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="homeArea">
      <div className="photo">
        <div className="uploadButtonGroup">
          <button
            type="button"
            className="uploadPhoto"
            onClick={handleUploadClick}
          >
            {updatePhoto ? '등록' : '사진 올리기'}
          </button>
        </div>
        <div className="photoArea">
          {updatePhoto ? (
            <div className="uploadPhotoContainer">
              <div className="uploadPhotoGroup">
                <input
                  type="text"
                  className="uploadPhotoTitle"
                  placeholder="제목을 입력하세요"
                  value={photoName}
                  onChange={handleTitleChange}
                />
                <div className="uploadPhotoInfoGroup">
                  <select
                    className="folderSelect"
                    onChange={handleFolderChange}
                  >
                    <option value="-">- 선택 -</option>{' '}
                    {folderNames.map(folder => (
                      <option key={folder.id} value={folder.id}>
                        {folder.folderName}
                      </option>
                    ))}
                  </select>
                  <div className="uploadMainPhoto">
                    {!photoURL && (
                      <>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <button
                          type="button"
                          className="uploadSelectPhoto"
                          onClick={handleButtonClick}
                        >
                          파일 선택
                        </button>
                      </>
                    )}
                    {photoURL && (
                      <img
                        className="uploadPhotoImg"
                        src={
                          photoURL instanceof File
                            ? URL.createObjectURL(photoURL)
                            : photoURL
                        }
                        alt="Main"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : photosFromDB.length > 0 ? (
            <div className="photosContainer">
              {filteredPhotos.map(photo => (
                <div className="photoGroup" key={photo.id}>
                  <div className="photoTitle">{photo.photoContent}</div>
                  <div className="photoInfoGroup">
                    <div className="photoInfo">
                      <div>
                        {photo.createdAt} 스크랩수 : {photo.scrap}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="copyAddress"
                      onClick={() => handleScrap(photo.id)}
                    >
                      스크랩
                    </button>
                  </div>
                  <div className="mainPhoto">
                    <img
                      className="photoImg"
                      src={`http://172.30.1.98:8000/photos/uploads/${photo.photoFileName}`}
                      alt={photo.photoContent}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="noContentsInfo">사진을 등록하세요.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PictureRight;
