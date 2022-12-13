import React from 'react';
import styled from 'styled-components';
import Logo from 'components/atoms/Logo/Logo';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  padding-top: 50px;
`;

const H2 = styled.h2`
  color: ${({ theme }) => theme.colors.grey};
  font-size: ${({ theme }) => theme.fontSize.xl};
  width: 300px;
  padding: 20px;
  text-align: justify;
  font-weight: 400;
  margin: auto;
  ${({ theme }) => theme.mq.desktop} {
    font-size: ${({ theme }) => theme.fontSize.xxl};
    width: 600px;
  }
`;

const LoginButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.darkBlue};
  border-radius: ${({ theme }) => theme.borderRadius.s};
  display: flex;
  padding: 5px 10px;
  text-decoration: none;
  cursor: pointer;
  justify-content: center;

  :hover {
    color: ${({ theme }) => theme.colors.blue};
    background-color: ${({ theme }) => theme.colors.darkBlue};
  }
`;

const SignupButton = styled(Link)`
  color: ${({ theme }) => theme.colors.blue};
  border-radius: ${({ theme }) => theme.borderRadius.s};
  display: flex;
  justify-content: center;
  margin-top: 40px;
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
  margin: auto;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSize.xl};
  text-align: center;
  width: 50%;
`;

const Content = styled.div`
  display: flex;
  margin: auto;
  width: 90%;
  flex-direction: column;
  ${({ theme }) => theme.mq.desktop} {
    width: 70%;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const StartPage = () => {
  return (
    <Wrapper>
      <Logo props />
      <Content>
        <H2>Wejdź do świata kultury i odkrywaj twórców z ArtWorks</H2>
        <ButtonsWrapper>
          <LoginButton to="/login">Zaloguj się</LoginButton>
          <SignupButton to="/signup">Dołącz</SignupButton>
        </ButtonsWrapper>
      </Content>
    </Wrapper>
  );
};

export default StartPage;
