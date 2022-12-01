import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from 'components/atoms/Logo/Logo';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 20px 0px;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  align-self: center;
`;

const LoginButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.fontSize.l};
  display: flex;
  padding: 5px 10px;
  border-radius: 20px;
  text-decoration: none;
`;

const SignupButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.fontSize.l};
  display: flex;
  padding: 5px 10px;
  border-radius: 20px;
  text-decoration: none;
`;

const ButtonsWrapper = styled.div``;

const Header: React.FC<{ BtnVisible?: boolean }> = ({ BtnVisible = false }) => {
  return (
    <Wrapper>
      <Logo props />
      {BtnVisible ? (
        <ButtonsWrapper>
          <LoginButton to="/login">Zaloguj się</LoginButton>
          <SignupButton to="/signup">Dołącz</SignupButton>
        </ButtonsWrapper>
      ) : null}
    </Wrapper>
  );
};

export default Header;
