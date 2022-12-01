import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { storage } from 'firabase-config';
import profilePlaceholder from 'assets/imgs/profilePlaceholder.svg';
import publish from 'assets/imgs/publish.svg';
import { ref, getDownloadURL } from 'firebase/storage';
import useFirestore from 'hooks/useFirestore/useFirestore';
import useStorage from 'hooks/useStorage/useStorage';
import AuthNav from 'components/molecules/AuthNav/AuthNav';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkBlue};
`;

const ImgWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
`;

const ProfileImage = styled.img`
  object-fit: cover;
`;

const Username = styled.div`
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: 700;
`;

const UploadProfileButton = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const InfoWrapper = styled.div`
  color: ${({ theme }) => theme.colors.darkBlue};
  background-color: ${({ theme }) => theme.colors.white};
  padding-bottom: 200px;
`;

const PostWrapper = styled.div`
  padding-top: 200px;
  -webkit-box-shadow: 0px -51px 64px 70px rgba(40, 48, 68, 1);
  -moz-box-shadow: 0px -51px 64px 70px rgba(40, 48, 68, 1);
  box-shadow: 0px -51px 64px 70px rgba(40, 48, 68, 1);
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
      <AuthNav />
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
          <InfoWrapper>
            <Username>{userData.username}</Username>
            {userData.description} <br />
            {userData.numberOfViews.length}
            {userData.numberOfFollows.length}
          </InfoWrapper>
          <PostWrapper></PostWrapper>
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
