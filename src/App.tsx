import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { privatesRoute } from './routes/routes';
import PrivateRoute from './routes/privateRoute';

function App() {
  return (
    <div className='App'>
      <Routes>
        {privatesRoute.map((route, index) => {
          let Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <PrivateRoute>
                  <Page />
                </PrivateRoute>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
