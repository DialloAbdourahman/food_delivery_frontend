import {
  CheckoutSessionRequest,
  useCreateCheckoutSession,
} from '@/api/OrderApi';
import { useGetRestaurant } from '@/api/RestaurantApi';
import CheckoutButton from '@/components/CheckoutButton';
import MenuItem from '@/components/MenuItem';
import OrderSummary from '@/components/OrderSummary';
import RestaurantInfo from '@/components/RestaurantInfo';
import { Card, CardFooter } from '@/components/ui/card';
import { UserFormData } from '@/forms/user-profile-form/UserProfileForm';
import { MenuItem as MenuItemType } from '@/types';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems: CartItem[];

      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) => {
          if (cartItem._id === menuItem._id) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => item._id !== cartItem._id
      );

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }
    const checkoutData: CheckoutSessionRequest = {
      cartItems: cartItems.map((cartItem) => {
        return {
          menuItemId: cartItem._id,
          name: cartItem.name,
          quantity: cartItem.quantity.toString(),
        };
      }),

      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        email: userFormData.email as string,
      },
      restaurantId: restaurant._id,
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  if (isLoading || !restaurant) {
    return <span>Loading...</span>;
  }

  return (
    <div className='flex flex-col gap-10'>
      <AspectRatio ratio={16 / 5}>
        <img
          className='rounded-md object-cover h-full w-full'
          src={restaurant.imageUrl}
        />
      </AspectRatio>
      <div className='grid md:grid-cols-[4fr_2fr] gap-5 md:px-32'>
        <div className='flex flex-col gap-4'>
          <RestaurantInfo restaurant={restaurant} />
          <span className='text-2xl font-bold tracking-tight'>Menu</span>
          {restaurant.menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              removeFromCart={removeFromCart}
              restaurant={restaurant}
              cartItems={cartItems}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
