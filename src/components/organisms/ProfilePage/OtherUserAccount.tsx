import React, { useEffect, useState } from 'react';
import profilePlaceholder from 'assets/imgs/profilePlaceholder.svg';
import useFirestore from 'hooks/useFirestore/useFirestore';
import { FaHeadphones } from 'react-icons/fa';
import { BsCameraFill, BsFilm, BsPaletteFill, BsPlusLg } from 'react-icons/bs';
import PostItem from 'components/molecules/PostItem/PostItem';
import { DocumentData } from 'firebase/firestore';
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
  Username,
  UserWrapper,
} from './ProfilePage.style';

const OtherUserAccount: React.FC = () => {
  const [user, setUser] = useState<null | DocumentData>(null);
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const { setFirestoreLoading, firestoreLoading, getQueryCollection } =
    useFirestore();

  const { username } = useParams();

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
    if (firestoreLoading == true && username) {
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
          }
        });
    }
  }, [firestoreLoading, user]);

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
              {user.category != '' ? (
                <CategoryWrapper>{CategoryView()}</CategoryWrapper>
              ) : null}
            </ImgWrapper>
            <InfoWrapper>
              <Username>{user.username}</Username>
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
            {posts.length ? (
              posts.map((item: DocumentData) => (
                <PostItem uid={null} data={item} key={item.id} />
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

export default OtherUserAccount;
