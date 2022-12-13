import React, { useEffect, useRef, useState, useContext } from 'react';
import styled from 'styled-components';
import profilePlaceholder from 'assets/imgs/profilePlaceholder.svg';
import useFirestore from 'hooks/useFirestore/useFirestore';
import useStorage from 'hooks/useStorage/useStorage';
import { FaHeadphones } from 'react-icons/fa';
import { BsUpload } from 'react-icons/bs';
import PostItem from 'components/molecules/PostItem/PostItem';
import { AuthContext } from 'context/AuthContext/AuthContext';
import { DocumentData } from 'firebase/firestore';
import AddNewPostButton from 'components/atoms/AddNewPostButton/AddNewPostButton';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkBlue};
`;

const UserWrapper = styled.div`
  ${({ theme }) => theme.mq.desktop} {
    width: 25%;
    position: absolute;
    top: 10vh;
    left: 5%;
  }
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
  background-color: ${({ theme }) => theme.colors.grey};
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
  ${({ theme }) => theme.mq.desktop} {
    padding-left: 0px;
    justify-content: center;
    width: 100%;
  }
`;

const UploadProfileButton = styled.div`
  font-size: ${({ theme }) => theme.fontSize.l};
  position: absolute;
  left: 10px;
  bottom: 10px;
  cursor: pointer;
  border-radius: 50%;
  padding: 5px;
  background-color: ${({ theme }) => theme.colors.white};
  opacity: 0.4;
  :hover {
    opacity: 1;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.darkBlue};
  background-color: ${({ theme }) => theme.colors.white};
  padding-bottom: 20px;

  ${({ theme }) => theme.mq.desktop} {
    padding-top: 50px;
  }
`;

const PostWrapper = styled.div`
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.white},
    ${({ theme }) => theme.colors.darkBlue} 100px
  );
  padding-top: 100px;

  ${({ theme }) => theme.mq.desktop} {
    background: ${({ theme }) => theme.colors.darkBlue};
    width: 70%;
    margin-left: 30%;
    padding-top: 10px;
    margin-top: 2vh;
    height: 63vh;
    overflow: auto;
  }
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

  ${({ theme }) => theme.mq.desktop} {
    left: 50%;
    transform: translate(-50%);
  }
`;

const BackgroundImg = styled.img`
  background-color: ${({ theme }) => theme.colors.blue};
  height: 35vh;
  width: 100%;
  object-fit: cover;
  filter: blur(1px);
  -webkit-filter: blur(1px);
  display: none;
  ${({ theme }) => theme.mq.desktop} {
    display: block;
  }
`;

const PostInfo = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.l};
`;

const ProfilePage: React.FC = () => {
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const {
    userData,
    getDocument,
    firestoreLoading,
    userDocRef,
    setFirestoreLoading,
    getQueryCollection,
    updateDocument,
  } = useFirestore();
  const { deleteFile, uploadFile, storageLoading } = useStorage();
  const hiddenFileInput = useRef<any>(null);
  const {
    state: { uid },
  } = useContext(AuthContext);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];

    const uploadImage = async () => {
      if (userData) {
        if (fileUploaded == null) return;
        if ('profileImgUrl' in userData && userData.profileImgUrl != '') {
          deleteFile(userData.profileImgUrl);
          updateDocument(userDocRef, {
            profileImgUrl: '',
          });
        }
        const imagePath = `artworks/users/${userData.id}/profileImage/${fileUploaded.name}`;
        uploadFile(imagePath, fileUploaded, userDocRef, 'profileImgUrl');
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
      getDocument(userDocRef);
      getQueryCollection('posts', 'userId', '==', uid).then((querySnapshot) => {
        setPosts([]);
        querySnapshot.forEach((doc) => {
          setPosts((prev) => [...prev, doc.data()]);
        });
      });
    }
  }, [uploadFile, firestoreLoading, storageLoading]);

  return (
    <Wrapper>
      {userData ? (
        <>
          <BackgroundImg>
            {userData.profileImgUrl && userData.profileImgUrl != '' ? (
              <img src={userData.profileImgUrl} />
            ) : null}
          </BackgroundImg>

          <UserWrapper>
            <ImgWrapper>
              <ProfileImage
                src={
                  userData.profileImgUrl && userData.profileImgUrl != ''
                    ? userData.profileImgUrl
                    : profilePlaceholder
                }
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
          </UserWrapper>
          <PostWrapper>
            <AddNewPostButton />
            {posts.length ? (
              posts.map((item: any) => <PostItem data={item} key={item.id} />)
            ) : (
              <PostInfo>Jeszcze nie masz żadnych postów</PostInfo>
            )}
          </PostWrapper>
        </>
      ) : (
        <UserWrapper>
          <ImgWrapper>
            <ProfileImage src={profilePlaceholder} />
          </ImgWrapper>
        </UserWrapper>
      )}
    </Wrapper>
  );
};

export default ProfilePage;
