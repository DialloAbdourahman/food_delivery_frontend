import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth0 } from '@auth0/auth0-react';
import { SheetClose } from './ui/sheet';

const MobileNavLinks = () => {
  const { logout } = useAuth0();

  return (
    <>
      <Link
        to={'/user-profile'}
        className='flex bg-white items-center font-bold hover:text-orange-500'
      >
        <SheetClose className=' w-full text-left'>User Profile</SheetClose>
      </Link>
      <Link
        to={'/manage-restaurant'}
        className='flex bg-white items-center font-bold hover:text-orange-500'
      >
        <SheetClose className=' w-full text-left'>My Restaurant</SheetClose>
      </Link>
      <Link
        to={'/order-status'}
        className='flex bg-white items-center font-bold hover:text-orange-500'
      >
        <SheetClose className=' w-full text-left'>Order Status</SheetClose>
      </Link>
      <Button
        className='flex items-center px-3 bg-orange-500 bg-gray-500'
        onClick={() => logout()}
      >
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLinks;
