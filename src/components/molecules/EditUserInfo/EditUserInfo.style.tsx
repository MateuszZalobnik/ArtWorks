import { BsXCircleFill } from 'react-icons/bs';
import styled from 'styled-components';

export const Wrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSize.l};
  width: 80%;
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  min-height: max-content;
  max-height: 100vh;
  color: ${({ theme }) => theme.colors.darkBlue};
  ${({ theme }) => theme.mq.desktop} {
    width: 40%;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  label {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  }
  input {
    font-size: ${({ theme }) => theme.fontSize.m};
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadius.s};
    border: 2px solid ${({ theme }) => theme.colors.blue};
    :focus {
      border: none;
      outline: ${({ theme }) => theme.colors.darkBlue} solid 2px;
    }
  }
  select {
    font-size: ${({ theme }) => theme.fontSize.m};
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadius.s};
    border: 2px solid ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.darkBlue};
    :focus {
      border: none;
      outline: ${({ theme }) => theme.colors.darkBlue} solid 2px;
    }
  }
  textarea {
    font-size: ${({ theme }) => theme.fontSize.s};
    resize: none;
    height: 10vh;
    color: ${({ theme }) => theme.colors.darkBlue};
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadius.s};
    border: 2px solid ${({ theme }) => theme.colors.blue};
    :focus {
      border: none;
      outline: ${({ theme }) => theme.colors.darkBlue} solid 2px;
    }
  }
`;

export const Button = styled.button`
  margin-top: 20px;
  font-size: ${({ theme }) => theme.fontSize.l};
  color: ${({ theme }) => theme.colors.grey};
  background-color: ${({ theme }) => theme.colors.darkBlue};
  border-radius: ${({ theme }) => theme.borderRadius.s};
  font-weight: bold;
  border: none;
  padding: 10px;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.darkBlue};
    background-color: ${({ theme }) => theme.colors.blue};
  }

  :disabled {
    opacity: 0.6;
  }
`;

export const ErrorMessage = styled.div`
  margin-top: 20px;
  text-align: center;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.colors.red};
`;

export const StyledCloseButton = styled(BsXCircleFill)`
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.xxl};
`;
