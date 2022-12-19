import { SpinnerState } from 'store/spinner/spinner';
import { useSelector } from 'react-redux';
import { GridLoader } from 'react-spinners';
import styled, { CSSProperties } from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  background: rgba(255, 255, 255, 0.5);
  height: 100vh;
  width: 100%;
`;

const override: CSSProperties = {
  display: 'block',
};

const SpinnerWrapper = styled.div``;

const LoadingSpinner = () => {
  const spinner = useSelector(
    (state: { spinner: SpinnerState }) => state.spinner.spinner
  );

  return (
    <>
      {spinner ? (
        <Wrapper>
          <SpinnerWrapper>
            <GridLoader
              color={'#283044'}
              loading={spinner}
              cssOverride={override}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </SpinnerWrapper>
        </Wrapper>
      ) : null}
    </>
  );
};

export default LoadingSpinner;
