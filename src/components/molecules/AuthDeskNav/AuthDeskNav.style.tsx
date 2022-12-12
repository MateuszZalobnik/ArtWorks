import styled, { keyframes } from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

export const Wrapper = styled.div`
  display: none;
  ${({ theme }) => theme.mq.desktop} {
    display: block;
  }
`;

export const StyledLink = styled(NavLink)`
  border: none;
  border-bottom: 3px solid ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.fontSize.l};
  display: flex;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 20px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.darkBlue};

  &.active {
    background-color: ${({ theme }) => theme.colors.darkBlue} !important;
    color: ${({ theme }) => theme.colors.grey};
  }
`;

export const LogoutButton = styled(Link)`
  text-decoration: none;
  position: absolute;
  top: 10px;
  left: 5px;
  padding: 5px 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  color: ${({ theme }) => theme.colors.blue};
  font-size: ${({ theme }) => theme.fontSize.l};
`;

export const Nav = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.darkBlue};
  padding: 20px 20px;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
  height: 100vh;
  width: 25%;
  background-color: ${({ theme }) => theme.colors.blue};
  position: fixed;
  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0;
    list-style-type: none;
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 40px;
    }
  }
`;

export const SearchInput = styled.input`
  border: none;
  border-bottom: 3px solid ${({ theme }) => theme.colors.darkBlue};
  background-color: ${({ theme }) => theme.colors.grey};
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.fontSize.l};
  display: flex;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 20px;

  :focus {
    outline: ${({ theme }) => theme.colors.darkBlue} solid 2px;
  }
`;
