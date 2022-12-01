import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from 'context/AuthContext/AuthContext';
import Logo from 'components/atoms/Logo/Logo';

const Wrapper = styled.div`
  z-index: 1000;
  top: 0;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
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

const AuthNav: React.FC = () => {
  const { dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    dispatch({ type: 'LOGIN', payload: null });
  };

  return (
    <Wrapper>
      <Logo props />
      <LogoutButton onClick={handleLogout}>Wyloguj się</LogoutButton>
    </Wrapper>
  );
};

export default AuthNav;
