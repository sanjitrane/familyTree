import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Routes from './Routes';
import Header from '../components/Header'

export default () => {
  return (
    <BrowserRouter>
      <div>
      {/* <Header /> */}
      {renderRoutes(Routes)}
      </div>
    </BrowserRouter>
  );
};