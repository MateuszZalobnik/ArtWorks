import React, { useEffect, useRef, useState, useContext } from 'react';
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
import { AuthContext } from 'context/AuthContext/AuthContext';
import { DocumentData, DocumentReference } from 'firebase/firestore';
import AddNewPostButton from 'components/atoms/AddNewPostButton/AddNewPostButton';
import { useParams } from 'react-router-dom';
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

const ProfilePage: React.FC<{
  userDocRef: DocumentReference;
  setIsOpenEditWindow: any;
}> = ({ userDocRef, setIsOpenEditWindow }) => {
  const [user, setUser] = useState<null | DocumentData>(null);
  const [myAccount, setMyAccount] = useState(false);
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const {
    setFirestoreLoading,
    firestoreLoading,
    getQueryCollection,
    updateDocument,
  } = useFirestore();
  const { deleteFile, uploadFile, storageLoading } = useStorage();
  const hiddenFileInput = useRef<any>(null);
  const {
    state: { uid },
  } = useContext(AuthContext);

  const { username } = useParams();

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];

    const uploadImage = async () => {
      if (user) {
        if (fileUploaded == null) return;
        if ('profileImgUrl' in user && user.profileImgUrl != '') {
          deleteFile(user.profileImgUrl);
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
    if (user) {
      switch (user.category) {
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
    console.log(user);
    if (firestoreLoading == true || storageLoading == true) {
      if (username) {
        getQueryCollection('users', 'username', '==', username)
          .then((querySnapshot) => {
            setUser(null);
            querySnapshot.forEach((doc) => {
              setUser(doc.data());
            });
          })
          .then(() => {
            if (user) {
              getQueryCollection('posts', 'userId', '==', user.id)
                .then((querySnapshot) => {
                  setPosts([]);
                  querySnapshot.forEach((doc) => {
                    setPosts((prev) => [...prev, doc.data()]);
                  });
                })
                .then(() => {
                  setFirestoreLoading(false);
                });
              if (user.id == uid) {
                setMyAccount(true);
              } else {
                setMyAccount(false);
              }
            }
          });
      }
    }
  }, [uploadFile, firestoreLoading, storageLoading]);

  return (
    <Wrapper>
      {user ? (
        <>
          <BackgroundImgWrapper>
            {user.profileImgUrl && user.profileImgUrl != '' ? (
              <BackgroundImg src={user.profileImgUrl} />
            ) : null}
          </BackgroundImgWrapper>

          <UserWrapper>
            <ImgWrapper>
              <ProfileImage
                src={
                  user.profileImgUrl && user.profileImgUrl != ''
                    ? user.profileImgUrl
                    : profilePlaceholder
                }
              />
              {myAccount ? (
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
              ) : null}
              {user.category != '' ? (
                <CategoryWrapper>{CategoryView()}</CategoryWrapper>
              ) : null}
            </ImgWrapper>
            <InfoWrapper>
              <Username>
                {myAccount ? (
                  <StyledEditButton
                    onClick={() => {
                      setIsOpenEditWindow(true);
                    }}
                  />
                ) : null}
                {user.username}
              </Username>
              <NumberWrapper>
                <Number>
                  {user.numberOfViews.length}
                  <span>views</span>
                </Number>
                <Number>
                  {user.numberOfFollows.length}
                  <span>follows</span>
                </Number>
              </NumberWrapper>
              <DescriptionWrapper>
                {user.description != '' ? user.description : 'Brak opisu'}
              </DescriptionWrapper>
            </InfoWrapper>
          </UserWrapper>
          <PostWrapper>
            {myAccount ? <AddNewPostButton /> : null}
            {posts.length ? (
              posts.map((item: DocumentData) => (
                <PostItem data={item} key={item.id} />
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

export default ProfilePage;
