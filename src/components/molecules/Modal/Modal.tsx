import React, { useState } from 'react';
import styled from 'styled-components';
const Wrapper = styled.div``;

const Modal: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Modal;
