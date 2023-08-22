import { Navigate, Route, Routes } from 'react-router-dom';

import AppLayout from '../App'
import PrivateRoute from './private-route';
import React from 'react';
import { routes } from './layouts-routes';

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<PrivateRoute />} >
          {routes.map(({ path, Component }, i) => (
            <Route element={<AppLayout />} key={i}>
                <Route exact
                  path={`${process.env.PUBLIC_URL}`}
                  element={<Navigate to={`${process.env.PUBLIC_URL}/bebidas/bebidas`} />}
                />
              <Route path={path} element={Component} />
            </Route>
          ))}
        </Route>
      </Routes>
    </>
  );


};

export default MainRoutes;