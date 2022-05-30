import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { privatesRoute,publicRoutes } from "./routes/routes";
import PrivateRoute from './routes/privateRoute';
import PublicRoute from './routes/publicRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        {privatesRoute.map((route,index)=>{
          let Page = route.component
          return <Route key={index} path={route.path} element={<PrivateRoute><Page/></PrivateRoute>} />
        })}
          {publicRoutes.map((route,index)=>{
          let Page = route.component
          return <Route key={index} path={route.path} element={<PublicRoute><Page/></PublicRoute>} />
        })}
      </Routes>
    </div>
  );
}

export default App;
