// import { AppState, Auth0Provider } from '@auth0/auth0-react';
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// type Props = {
//   children: React.ReactNode;
// };

// const Auth0ProviderWithNavigate = ({ children }: Props) => {
//   const navigate = useNavigate();

//   const domain: string = import.meta.env.VITE_AUTH0_DOMAIN;
//   const clientId: string = import.meta.env.VITE_AUTH0_CLIENT_ID;
//   const redirectUri: string = import.meta.env.VITE_AUTH0_CALLBACK_URL;
//   const audience: string = import.meta.env.VITE_AUTH0_AUDIENCE;

//   if (!domain || !clientId || !redirectUri || !audience) {
//     throw new Error('Unable to initialize auth');
//   }

//   // This function runs after the user has logged in.
//   const onRedirectCallback = (appState?: AppState) => {
//     navigate(appState?.returnTo || '/auth-callback');
//   };

//   return (
//     <Auth0Provider
//       domain={domain}
//       clientId={clientId}
//       authorizationParams={{
//         redirect_uri: redirectUri,
//         audience,
//       }}
//       onRedirectCallback={onRedirectCallback}
//     >
//       {children}
//     </Auth0Provider>
//   );
// };

// export default Auth0ProviderWithNavigate;

import { AppState, Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();

  const domain: string = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId: string = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri: string = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience: string = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error('Unable to initialize auth');
  }

  // This function runs after the user has logged in.
  const onRedirectCallback = (appState?: AppState) => {
    navigate('/auth-callback', {
      state: { page: appState?.returnTo ? appState?.returnTo : '/' },
    });
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
