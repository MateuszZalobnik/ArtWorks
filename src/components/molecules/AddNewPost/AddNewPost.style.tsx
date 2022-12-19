import { BsUpload } from 'react-icons/bs';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  margin-top: 100px;
  width: 80%;
  position: relative;
  padding: 40px 10px;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.fontSize.l};
  border-radius: ${({ theme }) => theme.borderRadius.s};

  label {
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.l};
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const Button = styled.button`
  margin-top: 40px;
  font-size: ${({ theme }) => theme.fontSize.l};
  color: ${({ theme }) => theme.colors.grey};
  background-color: ${({ theme }) => theme.colors.darkBlue};
  border-radius: ${({ theme }) => theme.borderRadius.s};
  font-weight: bold;
  border: none;
  padding: 10px;
  cursor: pointer;
  :disabled {
    opacity: 0.6;
  }
`;

export const Textarea = styled.textarea`
  resize: none;
  margin: 10px 0px;
  height: 50px;
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.fontSize.s};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.s};
  border: none;
  :focus {
    outline: ${({ theme }) => theme.colors.darkBlue} solid 2px;
  }
`;

export const UploadStyled = styled(BsUpload)`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  width: 100%;
  margin-top: 20px;
  text-align: center;
  cursor: pointer;
`;

export const ErrorMessage = styled.div`
  margin-top: 20px;
  text-align: center;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.colors.red};
`;
