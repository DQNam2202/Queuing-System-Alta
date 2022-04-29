import React from 'react';
import './App.scss';
import { useRoutes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes/routes';

function App() {
  const routingPrivate = useRoutes(privateRoutes);
  const routingPublic = useRoutes(publicRoutes);

  return (
    <div className='App'>
      {routingPrivate}
      {routingPublic}
    </div>
  );
}

export default App;
