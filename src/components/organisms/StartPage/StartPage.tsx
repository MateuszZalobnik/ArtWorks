import React from 'react';
import Logo from 'components/atoms/Logo/Logo';
import {
  ButtonsWrapper,
  Content,
  H2,
  LoginButton,
  SignupButton,
  Wrapper,
} from './StartPage.style';
import HomePage from '../HomePage/HomePage';

const StartPage = () => {
  return (
    <>
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
      <HomePage uid={null} />
    </>
  );
};

export default StartPage;
