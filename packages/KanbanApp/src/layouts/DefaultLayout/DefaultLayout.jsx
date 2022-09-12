import { Header } from 'components/Header';
import React from 'react';
import { useDispatch, useSelector } from 'hooks';

const DefaultLayout = ({ children }) => {
  const { locale } = useSelector(({ AppStore }) => ({
    locale: AppStore.locale,
  }));

  const { setLocale } = useDispatch(({ AppStore }) => ({
    setLocale: AppStore.setLocale,
  }));
  return (
    <>
      <Header locale={locale} setLocale={setLocale} />
      {children}
    </>
  );
};

export default DefaultLayout;
