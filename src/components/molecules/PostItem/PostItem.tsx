import { db } from 'firabase-config';
import { doc, DocumentData } from 'firebase/firestore';
import useFirestore from 'hooks/useFirestore/useFirestore';
import React, { useEffect} from 'react';
import styled from 'styled-components';
import profilePlaceholder from 'assets/imgs/profilePlaceholder.svg';
import { BsTrashFill } from 'react-icons/bs';
import useStorage from 'hooks/useStorage/useStorage';

const Wrapper = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 90%;
  margin: 50px auto;
  color: ${({ theme }) => theme.colors.darkBlue};
  background-color: ${({ theme }) => theme.colors.white};
`;

const UserInfo = styled.div`
  margin: 4px;
  display: flex;
  justify-content: space-between;
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border: 3px solid ${({ theme }) => theme.colors.darkBlue};
    border-radius: 50%;
  }
`;

const ContentWrapper = styled.div`
  padding: 0;
  img {
    margin-top: 20px;
    width: 100%;
    object-fit: contain;
  }
`;

const DeleteButton = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  color: ${({ theme }) => theme.colors.darkBlue};
`;

interface PostItemProps {
  data: DocumentData;
}

const PostItem: React.FC<PostItemProps> = ({ data }) => {
  const { userData, getDocument, firestoreLoading, DeleteDocument } =
    useFirestore();
  const { deleteFile } = useStorage();
  const DocRef = doc(db, 'users', data.userId);

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
        console.log(data, userData);
      }
    }
  }, [firestoreLoading]);

  return (
    <Wrapper>
      {userData ? (
        <>
          <DeleteButton onClick={() => handleDelete(data.id)}>
            <BsTrashFill />
          </DeleteButton>
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
        <br />
        tagi:
        {data.tags.map((item: string) => item + ' ')}
      </ContentWrapper>
    </Wrapper>
  );
};

export default PostItem;
