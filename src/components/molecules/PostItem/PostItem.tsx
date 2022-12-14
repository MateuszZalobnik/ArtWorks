import { db } from 'firabase-config';
import { doc, DocumentData } from 'firebase/firestore';
import useFirestore from 'hooks/useFirestore/useFirestore';
import React, { useEffect, useState, useContext } from 'react';
import profilePlaceholder from 'assets/imgs/profilePlaceholder.svg';
import { BsTrashFill } from 'react-icons/bs';
import useStorage from 'hooks/useStorage/useStorage';
import { AuthContext } from 'context/AuthContext/AuthContext';
import {
  ContentWrapper,
  DateWrapper,
  DeleteButton,
  UserInfo,
  Wrapper,
} from './PostItem.style';

interface PostItemProps {
  data: DocumentData;
}

const PostItem: React.FC<PostItemProps> = ({ data }) => {
  const [date, setDate] = useState('');
  const { userData, getDocument, firestoreLoading, DeleteDocument } =
    useFirestore();
  const { deleteFile } = useStorage();
  const DocRef = doc(db, 'users', data.userId);
  const {
    state: { uid },
  } = useContext(AuthContext);

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
    if (data.mediaUrl && data.mediaUrl != '') {
      const filePath = data.mediaUrl;
      deleteFile(filePath);
    }
    DeleteDocument('posts', id);
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
            <DeleteButton onClick={() => handleDelete(data.id)}>
              <BsTrashFill />
            </DeleteButton>
          ) : null}
          <UserInfo>
            <img
              src={
                userData.profileImgUrl && userData.profileImgUrl != ''
                  ? userData.profileImgUrl
                  : profilePlaceholder
              }
            />
            {userData.username}
            <div>{userData.category}</div>
          </UserInfo>
        </>
      ) : null}
      <ContentWrapper>
        {data.description}
        {data.mediaUrl ? <img src={data.mediaUrl} /> : null}
      </ContentWrapper>
    </Wrapper>
  );
};

export default PostItem;
