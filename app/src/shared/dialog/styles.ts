import styled, { keyframes } from 'styled-components';
import { rem } from '@app/styles/mixins';
import { backgroundColor, textColor } from '@app/styles/variables';

const displayByScale = keyframes`
    from {
        transform: scale(.5);
    }

    to {
        transform: scale(1);
    }
`;

const fadeIn = keyframes`
    0% {opacity: 0;}
  100% {opacity: 1;}
`;

export const OverlayContainerDiv = styled.div`
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;

  .backdrop {
    position: absolute;
    pointer-events: none;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(98, 1, 237, 0.5);
    z-index: 1000;
    animation: ${fadeIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .overlay-wrapper {
    position: fixed;
    pointer-events: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .overlay {
    background: ${backgroundColor};
    max-width: ${rem(800)};
    min-width: ${rem(400)};
    border-radius: ${rem(4)};
    max-height: calc(100% - 96px);
    z-index: 1001;
    flex: 0 1 auto;
    margin: ${rem(48)};
    display: flex;
    position: relative;
    overflow-y: auto;
    flex-direction: column;
    box-shadow: 0 ${rem(11)} ${rem(15)} ${rem(-7)} rgba(0, 0, 0, 0.2),
      0 ${rem(24)} ${rem(38)} ${rem(3)} rgba(0, 0, 0, 0.14), 0 ${rem(9)} ${rem(46)} ${rem(8)} rgba(0, 0, 0, 0.12);
    animation: ${displayByScale} 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: ${textColor};
  }
`;

export const dialogXPadding = `2rem`;
