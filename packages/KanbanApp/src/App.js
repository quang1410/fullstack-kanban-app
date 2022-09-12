import React from 'react';
import { IntlProvider } from 'react-intl';

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
      <Routers />
    </IntlProvider>
  );
};

export default App;
