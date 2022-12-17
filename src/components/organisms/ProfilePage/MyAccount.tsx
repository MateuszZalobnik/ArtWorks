import React, { useEffect, useRef, useState } from 'react';
import profilePlaceholder from 'assets/imgs/profilePlaceholder.svg';
import useFirestore from 'hooks/useFirestore/useFirestore';
import useStorage from 'hooks/useStorage/useStorage';
import { FaHeadphones } from 'react-icons/fa';
import {
  BsUpload,
  BsCameraFill,
  BsFilm,
  BsPaletteFill,
  BsPlusLg,
} from 'react-icons/bs';
import PostItem from 'components/molecules/PostItem/PostItem';
import { DocumentData, DocumentReference } from 'firebase/firestore';
import {
  Wrapper,
  BackgroundImg,
  BackgroundImgWrapper,
  CategoryWrapper,
  DescriptionWrapper,
  ImgWrapper,
  InfoWrapper,
  Number,
  NumberWrapper,
  PostInfo,
  PostWrapper,
  ProfileImage,
  UploadProfileButton,
  Username,
  UserWrapper,
  StyledEditButton,
} from './ProfilePage.style';
import { UserState } from 'features/user/user';
import { useSelector } from 'react-redux';

const MyAccount: React.FC<{
  uid: string;
  userDocRef: DocumentReference;
  setIsOpenEditWindow: any;
}> = ({ userDocRef, setIsOpenEditWindow, uid }) => {
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const {
    setFirestoreLoading,
    firestoreLoading,
    getQueryCollection,
    updateDocument,
  } = useFirestore();
  const { deleteFile, uploadFile, storageLoading } = useStorage();
  const hiddenFileInput = useRef<any>(null);

  const currentUser = useSelector(
    (state: { user: UserState }) => state.user.user
  );

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];

    const uploadImage = async () => {
      if (currentUser) {
        if (fileUploaded == null) return;
        if ('profileImgUrl' in currentUser && currentUser.profileImgUrl != '') {
          deleteFile(currentUser.profileImgUrl);
          updateDocument(userDocRef, {
            profileImgUrl: '',
          });
        }
        const imagePath = `artworks/users/${uid}/profileImage/${fileUploaded.name}`;
        uploadFile(imagePath, fileUploaded, userDocRef, 'profileImgUrl');
      }
    };

    uploadImage();
  };

  const CategoryView = () => {
    if (currentUser) {
      switch (currentUser.category) {
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
    console.log(currentUser);
    if (currentUser && firestoreLoading == true) {
      getQueryCollection('posts', 'userId', '==', currentUser.id)
        .then((querySnapshot) => {
          setPosts([]);
          querySnapshot.forEach((doc) => {
            setPosts((prev) => [...prev, doc.data()]);
          });
        })
        .then(() => {
          setFirestoreLoading(false);
        });
    }
  }, [uploadFile, firestoreLoading, storageLoading]);

  return (
    <Wrapper>
      {currentUser ? (
        <>
          <BackgroundImgWrapper>
            {currentUser.profileImgUrl && currentUser.profileImgUrl != '' ? (
              <BackgroundImg src={currentUser.profileImgUrl} />
            ) : null}
          </BackgroundImgWrapper>

          <UserWrapper>
            <ImgWrapper>
              <ProfileImage
                src={
                  currentUser.profileImgUrl && currentUser.profileImgUrl != ''
                    ? currentUser.profileImgUrl
                    : profilePlaceholder
                }
              />
              <>
                <UploadProfileButton onClick={handleClick}>
                  <BsUpload />
                </UploadProfileButton>
                <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                />
              </>
              {currentUser.category != '' ? (
                <CategoryWrapper>{CategoryView()}</CategoryWrapper>
              ) : null}
            </ImgWrapper>
            <InfoWrapper>
              <Username>
                <StyledEditButton
                  onClick={() => {
                    setIsOpenEditWindow(true);
                  }}
                />
                {currentUser.username}
              </Username>
              <NumberWrapper>
                <Number>
                  {currentUser.numberOfViews.length}
                  <span>views</span>
                </Number>
                <Number>
                  {currentUser.numberOfFollows.length}
                  <span>follows</span>
                </Number>
              </NumberWrapper>
              <DescriptionWrapper>
                {currentUser.description != ''
                  ? currentUser.description
                  : 'Brak opisu'}
              </DescriptionWrapper>
            </InfoWrapper>
          </UserWrapper>
          <PostWrapper>
            {posts.length ? (
              posts.map((item: DocumentData) => (
                <PostItem data={item} uid={uid} key={item.id} />
              ))
            ) : (
              <PostInfo>Brak postów do wyświetlenia</PostInfo>
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

export default MyAccount;
