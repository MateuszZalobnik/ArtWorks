import React from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinkNewPost = styled(Link)`
  width: max-content;
  margin: 50px auto 0px auto;
  font-size: ${({ theme }) => theme.fontSize.xxl};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

const AddNewPostButton: React.FC = () => {
  return (
    <LinkNewPost to="/auth/add">
      <BsPlusCircle />
    </LinkNewPost>
  );
};

export default AddNewPostButton;
