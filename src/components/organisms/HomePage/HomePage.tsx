import PostItem from 'components/molecules/PostItem/PostItem';
import useFirestore from 'hooks/useFirestore/useFirestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DocumentData } from 'firebase/firestore';
import AddNewPostButton from 'components/atoms/AddNewPostButton/AddNewPostButton';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AllPostsState } from 'store/allPosts/allPosts';
import { setAllPosts } from 'store/actions/actions';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkBlue};
`;

const PostWrapper = styled.div``;

const HomePage: React.FC<{ uid: string | null }> = ({ uid }) => {
  const dispatch = useDispatch();
  const allPosts = useSelector(
    (state: { allposts: AllPostsState }) => state.allposts.posts
  );
  const { getAllCollection } = useFirestore();

  useEffect(() => {
    const posts: DocumentData[] = [];
    getAllCollection('posts')
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          posts.push(doc.data());
        });
      })
      .then(() => {
        dispatch(setAllPosts(posts));
      });
  }, []);

  return (
    <Wrapper>
      {uid ? <AddNewPostButton /> : null}
      <PostWrapper>
        {allPosts && allPosts.length
          ? allPosts.map((item) => (
              <PostItem uid={uid} data={item} key={item.id} />
            ))
          : null}
      </PostWrapper>
    </Wrapper>
  );
};

export default HomePage;
