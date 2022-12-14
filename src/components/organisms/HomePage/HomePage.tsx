import PostItem from 'components/molecules/PostItem/PostItem';
import useFirestore from 'hooks/useFirestore/useFirestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DocumentData } from 'firebase/firestore';
import AddNewPostButton from 'components/atoms/AddNewPostButton/AddNewPostButton';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkBlue};
`;

const PostWrapper = styled.div``;

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<DocumentData[]>([]);

  const { getAllCollection, firestoreLoading } = useFirestore();

  useEffect(() => {
    if (firestoreLoading == true) {
      getAllCollection('posts').then((querySnapshot) => {
        setPosts([]);
        querySnapshot.forEach((doc) => {
          setPosts((prev) => [...prev, doc.data()]);
        });
      });
      getAllCollection('posts');
    }
  }, [firestoreLoading]);

  return (
    <Wrapper>
      <AddNewPostButton />
      <PostWrapper>
        {posts.length
          ? posts.map((item) => <PostItem data={item} key={item.id} />)
          : null}
      </PostWrapper>
    </Wrapper>
  );
};

export default HomePage;
