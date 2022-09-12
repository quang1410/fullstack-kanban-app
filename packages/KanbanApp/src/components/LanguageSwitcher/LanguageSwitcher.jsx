import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import icArrowDownW from 'assets/images/ic-18-18-downarrow-w.svg';
import icArrowDownB from 'assets/images/ic-18-18-downarrow-b.svg';

import { colors } from 'styles/theme';
import { useOnClickOutside } from 'hooks';

import { LANGUAGE_DATA } from 'utils/constants';
import IntlMessages from 'utils/IntlMessages';

const LanguageDropdownStyle = styled.div`
  position: relative;
  display: inline-block;
  line-height: 1.4;

  .cp-select {
    background-color: transparent;
    border: 0;
    font-size: 14rem;
    padding-right: 18rem;
    position: relative;
    opacity: ${(props) => props.Opacity};
    color: ${colors.white};
    &::after {
      content: '';
      background-image: url('${icArrowDownW}');
      background-position: right;
      width: 18rem;
      height: 18rem;
      position: absolute;
      top: 0;
      right: 0;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  ul {
    position: absolute;
    top: 100rem;
    left: 0%;
    transform: translateY(-100%);
    background-color: ${colors.white};
    color: ${colors.gray600};
    box-shadow: 0 2rem 13rem 0 rgba(0, 0, 0, 0.09);
    li {
      width: 100%;
      margin-right: 0;
      line-height: 1;
      button {
        background-color: transparent;
        border: 0;
        font-size: 14rem;
        height: 34rem;
        line-height: 34rem;
        padding: 0 16rem;
        min-width: 120rem;
        text-align: left;
        color: rgba(1, 5, 5, 0.66);
      }
      &.isActive {
        button {
          background-color: rgba(1, 5, 5, 0.06);
        }
      }
    }
  }
  &.isOpen {
    .cp-select {
      &::after {
        transform: rotate(180deg);
      }
    }
  }

  &.isBlackTheme {
    .cp-select {
      color: ${colors.eggplant};
      &::after {
        background-image: url('${icArrowDownB}');
      }
    }
  }
`;

export const LanguageSwitcher = ({
  isBlackTheme,
  className,
  opacity,
  setLocale,
  locale,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef();
  useOnClickOutside(wrapperRef, () => setIsOpen(false));
  const onSwitchLang = (lang) => {
    setLocale(lang);
    setIsOpen(false);
  };

  const handleClickButton = () => {
    setIsOpen(!isOpen);
  };

  const groupClassName = [
    isOpen ? 'isOpen' : '',
    isBlackTheme ? 'isBlackTheme' : '',
    className,
  ];
  return (
    <LanguageDropdownStyle
      ref={wrapperRef}
      className={groupClassName.join(' ')}
      Opacity={opacity}
    >
      <button type="button" className="cp-select" onClick={handleClickButton}>
        <div className="btn_text">
          <IntlMessages
            id={LANGUAGE_DATA.filter((item) => item.locale === locale)[0]?.name}
          />
        </div>
      </button>
      {isOpen && (
        <ul>
          {LANGUAGE_DATA.map((item) => (
            <li
              className={item.locale === locale ? 'isActive' : ''}
              key={item.locale}
            >
              <button onClick={() => onSwitchLang(item)}>
                <IntlMessages id={item.name} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </LanguageDropdownStyle>
  );
};

LanguageSwitcher.propTypes = {
  className: PropTypes.string,
  isBlackTheme: PropTypes.bool,
  opacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setLocale: PropTypes.func,
  locale: PropTypes.string,
};

LanguageSwitcher.defaultProps = {
  className: null,
  isBlackTheme: false,
  opacity: 0.45,
  setLocale: () => {},
  locale: 'en',
};

export default LanguageSwitcher;
