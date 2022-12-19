import React from 'react';
import Logo from 'components/atoms/Logo/Logo';
import { signOut } from 'firebase/auth';
import { auth } from 'firabase-config';
import {
  LogoutButton,
  Nav,
  SearchInput,
  StyledLink,
  Wrapper,
} from './AuthDeskNav.style';
import { useDispatch } from 'react-redux';
import { logout } from 'store/actions/actions';

const AuthDeskNav: React.FC<{ myAccount: string }> = ({ myAccount }) => {
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

  return (
    <Wrapper>
      <Nav>
        <ul>
          <li>
            <Logo props />
          </li>
          <li>
            <SearchInput type="text" placeholder="search" />
          </li>
          <li>
            <StyledLink
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              to="/auth"
              end
            >
              odkrywaj
            </StyledLink>
          </li>
          <li>
            <StyledLink
              to={'/' + myAccount}
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

export default AuthDeskNav;
