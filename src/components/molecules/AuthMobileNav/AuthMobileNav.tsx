import React, { useState } from 'react';
import Logo from 'components/atoms/Logo/Logo';
import { signOut } from 'firebase/auth';
import { auth } from 'firabase-config';
import {
  LogoutButton,
  MenuButton,
  Nav,
  SearchInput,
  StyledLink,
  Wrapper,
} from './AuthMobileNav.style';
import { useDispatch } from 'react-redux';
import { logout } from 'store/actions/actions';

const AuthMobileNav: React.FC<{ myAccount: string }> = ({ myAccount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
      })
      .catch(() => {
        // An error happened.
      });
  };

  const openNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper>
      <MenuButton onClick={openNav} />
      <Nav isOpen={isOpen}>
        <ul>
          <li>
            <Logo props />
          </li>
          <li>
            <SearchInput type="text" placeholder="search" />
          </li>
          <li>
            <StyledLink
              onClick={openNav}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              to="/auth"
              end
            >
              odkrywaj
            </StyledLink>
          </li>
          <li>
            <StyledLink
              onClick={openNav}
              to={'/'+myAccount}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              moje konto
            </StyledLink>
          </li>
        </ul>
        <LogoutButton to="/login" onClick={handleLogout}>
          wyloguj się
        </LogoutButton>
      </Nav>
    </Wrapper>
  );
};

export default AuthMobileNav;
