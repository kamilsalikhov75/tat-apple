import { UserOrder } from '../user-order/user-order';
import './user-orders.css';

function UserOrders({ orders }) {
  return (
    <div className="user__orders">
      <h2 className="subtitle">Заказы</h2>
      {orders.map((order, index) => {
        return (
          <UserOrder
            key={order._id}
            orderNumber={index + 1}
            createdAt={order.createdAt}
            products={order.products}
            price={order.price}
            status={order.status}
          />
        );
      })}
    </div>
  );
}

export { UserOrders };
