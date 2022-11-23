import React from 'react';
import styled from 'styled-components';
import image from 'assets/imgs/artist.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  img {
    margin: 40px 0px;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 20px 0px;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  align-self: center;
`;

const Logo = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
  display: flex;
  flex-direction: row;
`;

const LeftSide = styled.div`
  background-color: ${({ theme }) => theme.colors.blue};
  display: flex;
  justify-content: flex-end;
  padding-left: 20px;
  color: ${({ theme }) => theme.colors.darkBlue};
`;

const RightSide = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  color: ${({ theme }) => theme.colors.blue};
`;

const LoginButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.fontSize.l};
  display: flex;
  padding: 5px 10px;
  border: none;
  border-radius: 20px;
`;

const H2 = styled.h2`
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.fontSize.l};
  padding: 20px;
  text-align: center;
  font-weight: 500;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  margin: auto;
  width: 90%;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: 700;
  padding: 5px 0px;
  border: none;
  border-radius: 20px;
`;

const StartView = () => {
  return (
    <Wrapper>
      <Header>
        <Logo>
          <LeftSide>Art</LeftSide>
          <RightSide>Works</RightSide>
        </Logo>
        <LoginButton>Zaloguj się</LoginButton>
      </Header>
      <H2>Wejdź do świata kultury i odkrywaj twórców z ArtWorks</H2>
      <Button>Przeglądaj</Button>
      <img src={image} />
      <Button>Załóż portfolio artystyczne</Button>
    </Wrapper>
  );
};

export default StartView;
