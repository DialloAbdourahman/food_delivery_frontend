import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from '@/api/MyRestaurantApi';
import OrderItemCart from '@/components/OrderItemCart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ManageRestaurantForm from '@/forms/manage-restaurant-form/ManageRestaurantForm';

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { isLoading: isUpdateLoading, updateMyRestaurant } =
    useUpdateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const {
    orders,
    isLoading: isGetMyRestaurantLoading,
    refetch,
  } = useGetMyRestaurantOrders();

  const isEditing = !!restaurant;

  if (isGetMyRestaurantLoading || isCreateLoading || isUpdateLoading) {
    return <span>Loading...</span>;
  }

  return (
    <Tabs defaultValue='orders'>
      <TabsList>
        <TabsTrigger value='orders'>Orders</TabsTrigger>
        <TabsTrigger value='manage-restaurant'>Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value='orders'
        className='space-y-5 bg-gray-50 p-10 rounded-lg'
      >
        <h2 className=' text-2xl font-bold'>{orders?.length} active orders</h2>
        {orders?.map((order) => (
          <OrderItemCart order={order} refetch={refetch} />
        ))}
      </TabsContent>
      <TabsContent value='manage-restaurant'>
        <ManageRestaurantForm
          restaurant={restaurant}
          onSave={isEditing ? updateMyRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;
