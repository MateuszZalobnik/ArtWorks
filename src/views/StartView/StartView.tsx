import React from 'react';
import styled from 'styled-components';
import image from 'assets/imgs/artist.svg';
import Header from 'components/molecules/Header/Header';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  img {
    margin: 40px 0px;
  }
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
      <Header BtnVisible={true} />
      <H2>Wejdź do świata kultury i odkrywaj twórców z ArtWorks</H2>
      <Button>Przeglądaj</Button>
      <img src={image} />
      <Button>Załóż portfolio artystyczne</Button>
    </Wrapper>
  );
};

export default StartView;
