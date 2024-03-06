// import { useEffect, useRef } from 'react';
// import { useCreateMyUser } from '@/api/MyUserApi';
// import { useAuth0 } from '@auth0/auth0-react';
// import { useNavigate } from 'react-router-dom';

// const AuthCallbackPage = () => {
//   const { user } = useAuth0();
//   const { createUser } = useCreateMyUser();
//   const navigate = useNavigate();

//   // To be maximally sure that this runs only once.
//   const hasCreatedUser = useRef(false);

//   useEffect(() => {
//     if (user?.sub && user?.email && !hasCreatedUser.current) {
//       createUser({ auth0Id: user.sub, email: user.email });
//       hasCreatedUser.current = true;
//     }
//     navigate('/');
//   }, [createUser, navigate, user]);

//   return <>Loading... at the authcallback page </>;
// };

// export default AuthCallbackPage;

import { useEffect, useRef } from 'react';
import { useCreateMyUser } from '@/api/MyUserApi';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthCallbackPage = () => {
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();
  const navigate = useNavigate();
  const {
    state: { page },
  } = useLocation();

  // To be maximally sure that this runs only once.
  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }
    navigate(page);
  }, [createUser, navigate, user]);

  return <>Loading... at the authcallback page </>;
};

export default AuthCallbackPage;
