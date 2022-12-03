import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LogoWrapper = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize.xl};
  height: max-content;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const LeftSide = styled.div`
  background-color: ${({ theme }) => theme.colors.blue};
  display: flex;
  justify-content: flex-end;
  padding-left: 5px;
  color: ${({ theme }) => theme.colors.darkBlue};
`;

const RightSide = styled.div`
  padding-right: 5px;
  display: flex;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  color: ${({ theme }) => theme.colors.blue};
`;

const Logo: React.FC<{ props: any }> = () => {
  return (
    <LogoWrapper to="/">
      <LeftSide>Art</LeftSide>
      <RightSide>Works</RightSide>
    </LogoWrapper>
  );
};

export default Logo;
