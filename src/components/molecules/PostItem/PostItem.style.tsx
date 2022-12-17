import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 90%;
  margin: 50px auto;
  color: ${({ theme }) => theme.colors.darkBlue};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.s};
`;

export const UserInfo = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.s};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.fontSize.m};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  img {
    background-color: ${({ theme }) => theme.colors.blue};
    width: 70px;
    height: 70px;
    object-fit: cover;
    border: 3px solid ${({ theme }) => theme.colors.white};
    border-radius: 50%;
  }
`;

export const ContentWrapper = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    margin-top: 20px;
    width: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.s};
    object-fit: contain;
  }
`;

export const DescriptionWrapper = styled.div`
  padding: 20px;
  flex-wrap: wrap;
  word-wrap: break-word;
`;

export const DeleteButton = styled.div`
  position: absolute;
  left: 0;
  top: -30px;
  background-color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.darkBlue};
  border-radius: ${({ theme }) => theme.borderRadius.s};
  cursor: pointer;
`;

export const DateWrapper = styled.div`
  display: flex;
  justify-content: end;
  color: ${({ theme }) => theme.colors.darkBlue};
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
  margin: 10px;
`;
