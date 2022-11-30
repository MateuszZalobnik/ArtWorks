import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { storage } from 'firabase-config';
import profilePlaceholder from 'assets/imgs/profilePlaceholder.svg';
import publish from 'assets/imgs/publish.svg';
import { ref, getDownloadURL } from 'firebase/storage';
import useFirestore from 'hooks/useFirestore/useFirestore';
import useStorage from 'hooks/useStorage/useStorage';

const Wrapper = styled.div`
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkBlue};
`;

const ImgWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid ${({ theme }) => theme.colors.blue};
  background-color: ${({ theme }) => theme.colors.grey};
  object-fit: cover;
`;

const Username = styled.div`
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: 700;
`;

const UploadProfileButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

const ProfilePage: React.FC = () => {
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const {
    userData,
    getData,
    firestoreLoading,
    userDocRef,
    setFirestoreLoading,
  } = useFirestore();
  const { deleteFile, uploadFile, storageLoading } = useStorage();
  const hiddenFileInput = useRef<any>(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];

    const uploadImage = async () => {
      if (userData) {
        if (fileUploaded == null) return;
        if ('profileImgPath' in userData && userData.profileImgPath != '') {
          setProfileImageUrl('');
          deleteFile(userData.profileImgPath);
        }
        const imagePath = `artworks/${userData.id}/profileImage/${fileUploaded.name}`;
        uploadFile(imagePath, fileUploaded);
      }
    };

    uploadImage();
  };

  useEffect(() => {
    if (firestoreLoading == true || storageLoading == true) {
      getData(userDocRef);
    } else {
      console.log(userData);
      if (
        userData &&
        'profileImgPath' in userData &&
        userData.profileImgPath != ''
      ) {
        const imageRef = ref(storage, userData.profileImgPath);

        getDownloadURL(imageRef)
          .then((url) => {
            setProfileImageUrl(url);
          })
          .catch(() => {
            console.log('wait...');
            setFirestoreLoading(true);
          });
      }
    }
  }, [profileImageUrl, uploadFile, firestoreLoading, storageLoading]);

  return (
    <Wrapper>
      {userData ? (
        <>
          <ImgWrapper>
            <ProfileImage
              src={profileImageUrl != '' ? profileImageUrl : profilePlaceholder}
            />
            <UploadProfileButton onClick={handleClick}>
              <img src={publish} />
            </UploadProfileButton>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: 'none' }}
            />
          </ImgWrapper>
          <Username>{userData.username}</Username>
        </>
      ) : (
        <>
          <ImgWrapper>
            <ProfileImage src={profilePlaceholder} />
          </ImgWrapper>
          <Username>wait</Username>
        </>
      )}
    </Wrapper>
  );
};

export default ProfilePage;
