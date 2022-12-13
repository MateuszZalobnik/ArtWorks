import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from 'components/atoms/Logo/Logo';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 20px;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  align-self: center;
`;

const LoginButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.fontSize.m};
  border-radius: ${({ theme }) => theme.borderRadius.s};
  display: flex;
  padding: 5px 10px;
  text-decoration: none;
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.colors.blue};
    background-color: ${({ theme }) => theme.colors.darkBlue};
  }
`;

const SignupButton = styled(Link)`
  color: ${({ theme }) => theme.colors.blue};
  font-size: ${({ theme }) => theme.fontSize.m};
  border-radius: ${({ theme }) => theme.borderRadius.s};
  display: flex;
  margin-left: 15px;
  padding: 5px 10px;
  text-decoration: none;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.darkBlue};
    background-color: ${({ theme }) => theme.colors.blue};
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mq.desktop} {
    flex-direction: row;
  }
`;

const NotAuthHeader: React.FC = () => {
  return (
    <Wrapper>
      <Logo props />
      <ButtonsWrapper>
        <LoginButton to="/login">Zaloguj się</LoginButton>
        <SignupButton to="/signup">Dołącz</SignupButton>
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default NotAuthHeader;
