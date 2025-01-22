import React from 'react';
import styled from 'styled-components';

const LoadingEye = () => {
    return (
        <StyledWrapper>
            <div className="loader">
                <span />
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .loader {
    --eye: #fff;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loader::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    border: 5px solid var(--eye);
    border-radius: 100%;
    animation: translate-keyframes 2.50s infinite linear;
  }

  .loader span {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border-top: 12px solid var(--eye);
    border-bottom: 5px solid var(--eye);
    outline: 2px solid var(--eye);
  }

  .loader span {
    animation: rotate-keyframes 2.50s infinite linear;
  }

  @keyframes translate-keyframes {
    0% {
      transform: translate(-100%, -50%);
    }

    95% {
      transform: translate(50%, -50%);
    }

    96% {
      transform: translate(-50%, -50%);
    }

    100% {
      transform: translate(-100%, -50%);
    }
  }

  @keyframes rotate-keyframes {
    90% {
      height: 40px;
    }

    95% {
      height: 0px;
    }

    100% {
      height: 40px;
    }
  }`;

export default LoadingEye;
