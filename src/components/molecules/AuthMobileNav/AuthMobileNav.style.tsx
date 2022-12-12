import styled, { keyframes } from 'styled-components';
import { BsList } from 'react-icons/bs';
import { Link, NavLink } from 'react-router-dom';

export const Wrapper = styled.div`
  ${({ theme }) => theme.mq.desktop} {
    display: none;
  }
`;

export const MenuButton = styled(BsList)`
  position: fixed;
  top: 0;
  right: 0;
  font-size: 70px;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.blue};
  border-radius: 20px 0px 0px 20px;
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

const slideLeft = keyframes`
from {
  margin-left: 100%;
  z-index: 2;

}

to {
  margin-left: 0px;
  z-index: 2;

}
`;

const slideRight = keyframes`
from {
  margin-left: 0px;
  z-index: 2;
}

to {
  margin-left: 100%;
  z-index: 2;
}
`;

export const Nav = styled.div<{ isOpen: boolean }>`
  animation: ${(props) => (props.isOpen ? slideLeft : slideRight)} 1s;
  margin-left: ${(props) => (props.isOpen ? '0' : '100%')};
  display: flex;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.darkBlue};
  padding: 70px 80px;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
  height: 100vh;
  width: 100%;
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
