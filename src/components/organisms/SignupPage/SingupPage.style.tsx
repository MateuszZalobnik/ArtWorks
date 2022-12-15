import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  img {
    margin: 40px 0px;
  }
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
  input {
    outline: none;
    margin-top: 20px;
    color: ${({ theme }) => theme.colors.darkBlue};
    font-size: ${({ theme }) => theme.fontSize.l};
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadius.s};
    border: none;
    :focus {
      outline: ${({ theme }) => theme.colors.darkBlue} solid 2px;
    }
  }

  ${({ theme }) => theme.mq.desktop} {
    width: 20%;
  }
`;

export const H3 = styled.h3`
  display: flex;
  justify-content: center;
  margin: 0px;
`;

export const ErrorMessage = styled.div`
  margin-top: 20px;
  text-align: center;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.colors.red};
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
`;

export const LogoWrapper = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translate(-50%);
`;
