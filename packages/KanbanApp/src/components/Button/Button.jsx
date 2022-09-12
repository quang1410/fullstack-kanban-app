import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

import { colors } from 'styles/theme';
import { ThreeDotsLoader } from 'components/ThreeDotsLoader';

import { SIZE_BUTTON } from 'utils/constants';

const ButtonStyled = styled.button`
  ${({ size, Color, BgColor }) => {
    const currentSize = SIZE_BUTTON[size];
    return `
    border-radius: ${currentSize.borderRadius};
    height: ${currentSize.height};
    min-width: ${currentSize.minWidth};
    line-height: ${currentSize.height};
    padding: ${currentSize.padding};
    color: ${Color};
    background-color: ${BgColor};
    border: 0;
    position: relative;
    .cp-children {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${currentSize.fontSize};;
      font-weight: ${currentSize.fontWeight};;
      img {
        width: 20rem;
        height: 20rem;
        margin-right: 7rem;
      }
      span {
        display: inline-block;
        line-height: 20rem;
      }
    }
`;
  }};

  .cp-loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    width: 100%;
    height: 100%;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
  &.isLoading {
    .cp-children {
      opacity: 0;
    }
    .cp-loading {
      opacity: 1;
    }

    &:disabled {
      opacity: 1;
    }
  }
  &:hover {
    box-shadow: 0 2rem 8rem 0 ${colors.grey1000_20};
    transition: 200ms ease-in-out;
  }
`;

const Button = ({ children, loading, bgColor, color, className, ...rest }) => {
  return (
    <ButtonStyled
      {...rest}
      className={`${loading ? 'isLoading' : ''} ${className}
      `}
      Color={color}
      BgColor={bgColor}
    >
      {loading && (
        <div className="cp-loading">
          <ThreeDotsLoader color={color} />
        </div>
      )}

      <div className="cp-children">{children}</div>
    </ButtonStyled>
  );
};

Button.propTypes = {
  loading: PropTypes.bool,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultProps = {
  loading: false,
  bgColor: 'rgba(255, 255, 255, 0.98)',
  color: colors.electricViolet,
  className: '',
  size: 'M',
  children: React.Fragment,
};

export default React.memo(Button);
