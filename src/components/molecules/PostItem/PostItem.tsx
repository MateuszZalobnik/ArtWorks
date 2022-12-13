import { db } from 'firabase-config';
import { doc, DocumentData } from 'firebase/firestore';
import useFirestore from 'hooks/useFirestore/useFirestore';
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import profilePlaceholder from 'assets/imgs/profilePlaceholder.svg';
import { BsTrashFill } from 'react-icons/bs';
import useStorage from 'hooks/useStorage/useStorage';
import { AuthContext } from 'context/AuthContext/AuthContext';

const Wrapper = styled.div`
  position: relative;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 90%;
  margin: 50px auto;
  color: ${({ theme }) => theme.colors.darkBlue};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.s};
`;

const UserInfo = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.s};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.darkBlue};
  margin: 10px;
  font-size: ${({ theme }) => theme.fontSize.m};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  img {
    background-color: ${({ theme }) => theme.colors.blue};
    width: 70px;
    height: 70px;
    object-fit: cover;
    border: 3px solid ${({ theme }) => theme.colors.white};
    border-radius: 50%;
  }
`;

const ContentWrapper = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    margin-top: 20px;
    width: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.s};
    object-fit: contain;
  }
`;

const DeleteButton = styled.div`
  position: absolute;
  left: 0;
  top: -30px;
  background-color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.darkBlue};
  border-radius: ${({ theme }) => theme.borderRadius.s};
  cursor: pointer;
`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: end;
  color: ${({ theme }) => theme.colors.darkBlue};
`;

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
