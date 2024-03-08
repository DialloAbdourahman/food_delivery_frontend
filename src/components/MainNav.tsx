import { useAuth0 } from '@auth0/auth0-react';
import { Button } from './ui/button';
import UsernameMenu from './UsernameMenu';
import { Link, useLocation } from 'react-router-dom';

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { pathname } = useLocation();

  return (
    <>
      <span className='flex space-x-2 items-center'>
        {isAuthenticated ? (
          <>
            <Link
              to={'/order-status'}
              className='font-bold hover:text-orange-500'
            >
              Order Status{' '}
            </Link>
            <UsernameMenu />
          </>
        ) : (
          <Button
            variant={'ghost'}
            className='font-bold hover:text-orange-300 hover:bg-white'
            onClick={() =>
              loginWithRedirect({
                appState: {
                  returnTo: pathname,
                },
              })
            }
          >
            Log In
          </Button>
        )}
      </span>
    </>
  );
};

export default MainNav;
