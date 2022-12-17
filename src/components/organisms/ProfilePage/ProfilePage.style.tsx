import styled from 'styled-components';
import { BsXCircleFill } from 'react-icons/bs';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkBlue};
`;

export const UserWrapper = styled.div`
  ${({ theme }) => theme.mq.desktop} {
    width: 25%;
    position: absolute;
    top: 10vh;
    left: 5%;
  }
`;

export const ImgWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
`;

export const ProfileImage = styled.img`
  background-color: ${({ theme }) => theme.colors.grey};
  height: 35vh;
  object-fit: cover;
`;

export const Username = styled.div`
  padding-left: 8px;
  display: flex;
  flex: wrap;
  width: 70%;
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: 700;
  ${({ theme }) => theme.mq.desktop} {
    padding-left: 0px;
    justify-content: center;
    width: 100%;
  }
`;

export const UploadProfileButton = styled.div`
  font-size: ${({ theme }) => theme.fontSize.l};
  position: absolute;
  left: 10px;
  bottom: 10px;
  cursor: pointer;
  border-radius: 50%;
  padding: 5px;
  background-color: ${({ theme }) => theme.colors.white};
  opacity: 0.4;
  :hover {
    opacity: 1;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.darkBlue};
  background-color: ${({ theme }) => theme.colors.white};
  padding-bottom: 20px;

  ${({ theme }) => theme.mq.desktop} {
    padding-top: 50px;
  }
`;

export const PostWrapper = styled.div`
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.white},
    ${({ theme }) => theme.colors.darkBlue} 100px
  );
  padding-top: 100px;

  ${({ theme }) => theme.mq.desktop} {
    background: ${({ theme }) => theme.colors.darkBlue};
    width: 70%;
    margin-left: 30%;
    padding-top: 10px;
    margin-top: 2vh;
    height: 63vh;
    overflow: auto;
  }
`;

export const NumberWrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
`;
export const Number = styled.div`
  line-height: 24px;
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.xl};
  width: 30%;
  :first-child {
    border-right: 4px solid ${({ theme }) => theme.colors.darkBlue};
  }

  span {
    font-size: ${({ theme }) => theme.fontSize.m};
    font-weight: 400;
  }
`;

export const DescriptionWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSize.m};
`;

export const CategoryWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  right: 20px;
  bottom: -50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.xxl};
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border-bottom: 4px solid ${({ theme }) => theme.colors.darkBlue};
  border-left: 2px solid ${({ theme }) => theme.colors.darkBlue};
  border-right: 2px solid ${({ theme }) => theme.colors.darkBlue};

  ${({ theme }) => theme.mq.desktop} {
    left: 50%;
    transform: translate(-50%);
  }
`;

export const BackgroundImg = styled.img`
  background-color: ${({ theme }) => theme.colors.blue};
  height: 35vh;
  width: 100%;
  object-fit: cover;
`;

export const BackgroundImgWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.blue};
  height: 35vh;
  width: 100%;
  display: none;

  ${({ theme }) => theme.mq.desktop} {
    display: block;
  }
`;

export const PostInfo = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.l};
`;

export const StyledCloseButton = styled(BsXCircleFill)`
  position: absolute;
  top: 22vh;
  z-index: 1001;
  cursor: pointer;
`;

export const EditUserInfoWrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  flex-direction: column;
  top: 0;
  background: rgba(255, 255, 255, 0.5);
  height: 100vh;
  width: 100%;
  z-index: 1000;
  font-size: ${({ theme }) => theme.fontSize.xxl};
`;
