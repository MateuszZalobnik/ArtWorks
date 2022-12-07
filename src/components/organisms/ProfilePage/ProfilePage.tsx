import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { auth, storage } from 'firabase-config';
import profilePlaceholder from 'assets/imgs/profilePlaceholder.svg';
import { ref, getDownloadURL } from 'firebase/storage';
import useFirestore from 'hooks/useFirestore/useFirestore';
import useStorage from 'hooks/useStorage/useStorage';
import { FaHeadphones } from 'react-icons/fa';
import { BsUpload } from 'react-icons/bs';

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
  height: 35vh;
  object-fit: cover;
`;

const Username = styled.div`
  padding-left: 8px;
  display: flex;
  flex: wrap;
  width: 70%;
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: 700;
`;

const UploadProfileButton = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  position: absolute;
  left: 0;
  bottom: 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.darkBlue};
  background-color: ${({ theme }) => theme.colors.white};
  background: linear-gradient(
    ${({ theme }) => theme.colors.white} 50%,
    ${({ theme }) => theme.colors.darkBlue}
  );
  padding-bottom: 200px;
`;

const PostWrapper = styled.div`
  height: 505px;
  padding-top: 200px;
`;

const NumberWrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
`;
const Number = styled.div`
  line-height: 24px;
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.xl};
  width: 30%;
  :first-child {
    border-right: 4px solid ${({ theme }) => theme.colors.darkBlue};
  }

  span {
    font-size: ${({ theme }) => theme.fontSize.m};
    font-weight: 400;
  }
`;

const DescriptionWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSize.m};
`;

const CategoryWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  right: 20px;
  bottom: -50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.xxl};
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border-bottom: 4px solid ${({ theme }) => theme.colors.darkBlue};
  border-left: 2px solid ${({ theme }) => theme.colors.darkBlue};
  border-right: 2px solid ${({ theme }) => theme.colors.darkBlue};
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

  const CategoryView = () => {
    if (userData) {
      switch (userData.category) {
        case 'music':
          return <FaHeadphones />;
          break;
        default:
          break;
      }
    }
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
              <BsUpload />
            </UploadProfileButton>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: 'none' }}
            />
            <CategoryWrapper>{CategoryView()}</CategoryWrapper>
          </ImgWrapper>
          <InfoWrapper>
            <Username>{userData.username}</Username>
            <NumberWrapper>
              <Number>
                {userData.numberOfViews.length}
                <span>views</span>
              </Number>
              <Number>
                {userData.numberOfFollows.length}
                <span>follows</span>
              </Number>
            </NumberWrapper>
            <DescriptionWrapper>{userData.description}</DescriptionWrapper>
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
