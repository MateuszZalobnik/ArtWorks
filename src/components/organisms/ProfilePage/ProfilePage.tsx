import React, { useEffect, useRef, useState, useContext } from 'react';
import profilePlaceholder from 'assets/imgs/profilePlaceholder.svg';
import useFirestore from 'hooks/useFirestore/useFirestore';
import useStorage from 'hooks/useStorage/useStorage';
import { FaHeadphones } from 'react-icons/fa';
import {
  BsUpload,
  BsPencilSquare,
  BsCameraFill,
  BsFilm,
  BsPaletteFill,
  BsPlusLg,
} from 'react-icons/bs';
import PostItem from 'components/molecules/PostItem/PostItem';
import { AuthContext } from 'context/AuthContext/AuthContext';
import { DocumentData, DocumentReference } from 'firebase/firestore';
import AddNewPostButton from 'components/atoms/AddNewPostButton/AddNewPostButton';
import {
  BackgroundImg,
  BackgroundImgWrapper,
  CategoryWrapper,
  DescriptionWrapper,
  EditUserInfoWrapper,
  ImgWrapper,
  InfoWrapper,
  Number,
  NumberWrapper,
  PostInfo,
  PostWrapper,
  ProfileImage,
  StyledCloseButton,
  UploadProfileButton,
  Username,
  UserWrapper,
  Wrapper,
} from './ProfilePage.style';
import EditUserInfo from 'components/molecules/EditUserInfo/EditUserInfo';
import { useParams } from 'react-router-dom';

const ProfilePage: React.FC<{ userDocRef: DocumentReference }> = ({
  userDocRef,
}) => {
  const { username } = useParams();
  const [isOpenEditWindow, setIsOpenEditWindow] = useState(false);
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const {
    userData,
    getDocument,
    firestoreLoading,
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
        case 'photo':
          return <BsCameraFill />;
          break;
        case 'movie':
          return <BsFilm />;
          break;
        case 'painting':
          return <BsPaletteFill />;
          break;
        case 'other':
          return <BsPlusLg />;
          break;

        default:
          break;
      }
    }
  };

  useEffect(() => {
    console.log(username);
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
          {isOpenEditWindow ? (
            <EditUserInfoWrapper>
              <StyledCloseButton
                onClick={() => {
                  setIsOpenEditWindow(false);
                }}
              />
              <EditUserInfo
                userDocRef={userDocRef}
                username={userData.username}
                description={userData.description}
                category={userData.category}
              />
            </EditUserInfoWrapper>
          ) : null}
          <BackgroundImgWrapper>
            {userData.profileImgUrl && userData.profileImgUrl != '' ? (
              <BackgroundImg src={userData.profileImgUrl} />
            ) : null}
          </BackgroundImgWrapper>

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
              {userData.category != '' ? (
                <CategoryWrapper>{CategoryView()}</CategoryWrapper>
              ) : null}
            </ImgWrapper>
            <InfoWrapper>
              <Username>
                <BsPencilSquare
                  onClick={() => {
                    setIsOpenEditWindow(true);
                  }}
                />
                {userData.username}
              </Username>
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
              <DescriptionWrapper>
                {userData.description != ''
                  ? userData.description
                  : 'Brak opisu'}
              </DescriptionWrapper>
            </InfoWrapper>
          </UserWrapper>
          <PostWrapper>
            <AddNewPostButton />
            {posts.length ? (
              posts.map((item: DocumentData) => (
                <PostItem data={item} key={item.id} />
              ))
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
