import { db } from 'firabase-config';
import { doc, DocumentData } from 'firebase/firestore';
import useFirestore from 'hooks/useFirestore/useFirestore';
import React, { useEffect, useState } from 'react';
import profilePlaceholder from 'assets/imgs/profilePlaceholder.svg';
import {
  BsCameraFill,
  BsFilm,
  BsPaletteFill,
  BsPlusLg,
  BsTrashFill,
} from 'react-icons/bs';
import useStorage from 'hooks/useStorage/useStorage';
import {
  CategoryWrapper,
  ContentWrapper,
  DateWrapper,
  DeleteButton,
  DescriptionWrapper,
  StyledLink,
  UserInfo,
  Wrapper,
} from './PostItem.style';
import { useSelector } from 'react-redux';
import { UserState } from 'store/user/user';
import { FaHeadphones } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setAllPosts, setPosts, setSpinner } from 'store/actions/actions';

interface PostItemProps {
  data: DocumentData;
  uid: string | null;
}

const PostItem: React.FC<PostItemProps> = ({ data, uid }) => {
  const [date, setDate] = useState('');
  const { userData, getDocument, firestoreLoading, deleteDocument } =
    useFirestore();
  const { deleteFile } = useStorage();
  const DocRef = doc(db, 'users', data.userId);
  const { getQueryCollection, getAllCollection } = useFirestore();
  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state: { user: UserState }) => state.user.user
  );

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

  const displayTimestamp = () => {
    const date = new Date(data.timeStamp.seconds * 1000);
    const dateString = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });
    setDate(dateString);
  };

  const handleDelete = async (id: string) => {
    dispatch(setSpinner(true));
    if (data.mediaUrl && data.mediaUrl != '') {
      const filePath = data.mediaUrl;
      deleteFile(filePath);
    }
    deleteDocument('posts', id).then(() => {
      const posts: DocumentData[] = [];
      if (uid) {
        getQueryCollection('posts', 'userId', '==', uid)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              posts.push(doc.data());
            });
          })
          .then(() => {
            dispatch(setPosts(posts));
          });
      }

      const allPosts: DocumentData[] = [];
      getAllCollection('posts')
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            allPosts.push(doc.data());
          });
        })
        .then(() => {
          dispatch(setAllPosts(allPosts));
          dispatch(setSpinner(false));
        });
    });
  };

  useEffect(() => {
    if (firestoreLoading == true) {
      getDocument(DocRef);
    } else {
      if (userData) {
        displayTimestamp();
      }
    }
  }, [firestoreLoading]);

  return (
    <Wrapper>
      {userData ? (
        <>
          <DateWrapper>{date}</DateWrapper>
          {userData.id == uid ? (
            <DeleteButton
              className="deleteBtn"
              onClick={() => handleDelete(data.id)}
            >
              <BsTrashFill />
            </DeleteButton>
          ) : null}
          <StyledLink to={`/${userData.username}`}>
            <UserInfo>
              <img
                src={
                  userData.profileImgUrl && userData.profileImgUrl != ''
                    ? userData.profileImgUrl
                    : profilePlaceholder
                }
              />
              {userData.id == uid ? currentUser?.username : userData.username}
              <CategoryWrapper>{CategoryView()}</CategoryWrapper>
            </UserInfo>
          </StyledLink>
        </>
      ) : null}
      <ContentWrapper>
        <DescriptionWrapper>{data.description}</DescriptionWrapper>
        {data.mediaUrl ? <img src={data.mediaUrl} /> : null}
      </ContentWrapper>
    </Wrapper>
  );
};

export default PostItem;
