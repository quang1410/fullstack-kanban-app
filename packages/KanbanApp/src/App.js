import React from 'react';
import { IntlProvider } from 'react-intl';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseLine from '@mui/material/CssBaseline';

import Routers from './routes';
import AppLocale from 'lngProvider';

import 'styles/global.scss';
import { useSelector } from 'hooks';

const App = () => {
  const { locale } = useSelector(({ AppStore }) => ({
    locale: AppStore.locale,
  }));

  const currentAppLocale = AppLocale[locale];

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <CssBaseLine />
      <Routers />
    </IntlProvider>
  );
};

export default App;
