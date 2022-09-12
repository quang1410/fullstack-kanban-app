import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { LanguageSwitcher } from 'components/LanguageSwitcher';
import { Button } from 'components/Button';

import IntlMessages from 'utils/IntlMessages';

const HeaderStyled = styled.header`
  color: #fff;
  display: flex;
  align-items: center;
  background-color: #0a5291;

  .Header-brand {
    margin: 20px 10px;
  }

  .Header-navbar {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .Header-navbar-right {
    margin-left: auto;

    select {
      margin-left: 16px;
    }
  }

  .Header-navbar-item,
  .Header-navbar-right {
    float: left;

    a {
      display: block;
      color: white;
      text-align: center;
      padding: 0 16px;
      text-decoration: none;
    }

    a:hover {
      color: #47b2e4;
    }

    a.active {
      color: #47b2e4;
    }
  }
`;

const Header = ({ locale, setLocale }) => {
  const intl = useIntl();
  console.log('intl', intl);
  return (
    <HeaderStyled>
      <h1 className="Header-brand">
        <IntlMessages id="Name_app" />
      </h1>
      <ul className="Header-navbar">
        <li className="Header-navbar-item">
          <Link className="Header-navbar-item" to="/">
            <Button color={'#0a5291'}>
              <IntlMessages id="app_nav_home" />
            </Button>
          </Link>
        </li>
        <li className="Header-navbar-item">
          <Link className="Header-navbar-item" to="/about">
            <Button color={'#0a5291'}>
              <IntlMessages id="app_nav_about" />
            </Button>
          </Link>
        </li>
      </ul>
      <div className="Header-navbar-right">
        <LanguageSwitcher locale={locale} setLocale={setLocale} />
        <Link className="Header-navbar-item" to="/login">
          <Button color={'#0a5291'}>
            <IntlMessages id="app_login" />
          </Button>
        </Link>
        <Link className="Header-navbar-item" to="/signup">
          <Button color={'#0a5291'}>
            <IntlMessages id="app_signup" />
          </Button>
        </Link>
      </div>
    </HeaderStyled>
  );
};

export default Header;
