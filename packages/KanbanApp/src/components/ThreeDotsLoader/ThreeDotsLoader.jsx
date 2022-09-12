import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from 'styles/theme';

const Loader = styled.div`
  span {
    width: 6rem;
    height: 6rem;
    margin: 0 2rem;
    background-color: ${({ color }) => color};
    border-radius: 50%;
    transform: translatey(3rem);
    display: inline-block;
    animation-name: jumpingDots;
    animation-duration: 0.8s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
  @keyframes jumpingDots {
    20% {
      transform: translatey(0);
    }
    50% {
      transform: translatey(-5rem);
    }
  }
`;

const ThreeDotsLoader = ({ color }) => (
  <Loader color={color} className="loader">
    <span />
    <span />
    <span />
  </Loader>
);

ThreeDotsLoader.propTypes = {
  color: PropTypes.string,
};

ThreeDotsLoader.defaultProps = {
  color: colors.white,
};

export default memo(ThreeDotsLoader);
