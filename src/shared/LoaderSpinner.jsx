import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="gradient-spinner">
        <div className="gradient-spinner__dot" />
        <div className="gradient-spinner__dot" />
        <div className="gradient-spinner__dot" />
        <div className="gradient-spinner__dot" />
        <div className="gradient-spinner__dot" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .gradient-spinner {
    --uib-size: 5rem;
    --uib-speed: 1.5s;
    --uib-color: linear-gradient(45deg, #ff7eb3, #ff758c, #ff6e6a, #ffb17e);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--uib-size);
    width: var(--uib-size);
  }

  .gradient-spinner__dot {
    position: absolute;
    height: 25%;
    width: 25%;
    border-radius: 50%;
    background-image: var(--uib-color);
    background-size: 200% 200%;
    transform-origin: center;
    animation: pulse-scale var(--uib-speed) ease-in-out infinite, gradient-move 2s linear infinite;
    box-shadow: 0 0 10px rgba(255, 115, 162, 0.5), 0 0 20px rgba(255, 115, 162, 0.3);
  }

  .gradient-spinner__dot:nth-child(1) {
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: calc(var(--uib-speed) * -0.2);
  }

  .gradient-spinner__dot:nth-child(2) {
    top: 50%;
    left: 100%;
    transform: translate(-50%, -50%);
    animation-delay: calc(var(--uib-speed) * -0.4);
  }

  .gradient-spinner__dot:nth-child(3) {
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: calc(var(--uib-speed) * -0.6);
  }

  .gradient-spinner__dot:nth-child(4) {
    top: 50%;
    left: 0%;
    transform: translate(-50%, -50%);
    animation-delay: calc(var(--uib-speed) * -0.8);
  }

  .gradient-spinner__dot:nth-child(5) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: 0s;
    height: 30%;
    width: 30%;
  }

  @keyframes pulse-scale {
    0%, 100% {
      transform: scale(0.7);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.3);
      opacity: 1;
    }
  }

  @keyframes gradient-move {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export default Loader;
