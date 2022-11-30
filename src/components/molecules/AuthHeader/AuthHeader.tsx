import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AuthContext } from 'context/AuthContext/AuthContext';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 20px 0px;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  align-self: center;
`;

const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
  text-decoration: none;
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

const LogoutButton = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.fontSize.l};
  display: flex;
  padding: 5px 10px;
  border-radius: 20px;
  text-decoration: none;
`;

const AuthHeader: React.FC = () => {
  const { dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    dispatch({ type: 'LOGIN', payload: null });
  };

  return (
    <Wrapper>
      <Logo to="/">
        <LeftSide>Art</LeftSide>
        <RightSide>Works</RightSide>
      </Logo>
      <LogoutButton onClick={handleLogout}>Wyloguj się</LogoutButton>
    </Wrapper>
  );
};

export default AuthHeader;
