import PostItem from 'components/molecules/PostItem/PostItem';
import useFirestore from 'hooks/useFirestore/useFirestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsPlusCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { DocumentData } from 'firebase/firestore';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkBlue};
`;

const PostWrapper = styled.div``;

const LinkNewPost = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 50px;
  cursor: pointer;
`;

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
    } else {
      //   console.log(collectionData);
    }
  }, [firestoreLoading]);

  return (
    <Wrapper>
      <LinkNewPost to="/add">
        <BsPlusCircle />
      </LinkNewPost>
      <PostWrapper>
        {posts.length
          ? posts.map((item) => <PostItem data={item} key={item.id} />)
          : null}
      </PostWrapper>
    </Wrapper>
  );
};

export default HomePage;
