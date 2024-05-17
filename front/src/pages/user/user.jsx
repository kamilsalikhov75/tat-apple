import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/loading/loading';
import { UserInfo } from '../../components/user-info/user-info';
import { UserOrders } from '../../components/user-orders/user-orders';
import { path } from '../../const';
import './user.css';

const initialUser = {
  name: '',
  email: '',
};
function User() {
  const [user, setUser] = useState(initialUser);
  const token = window.localStorage.getItem('token') || '';
  const [orders, setOrders] = useState([]);
  const [currentTab, setCurrentTab] = useState('info');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    try {
      if (token) {
        setIsLoading(true);
        const promise = axios.get('http://localhost:3001/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        promise
          .then((responce) => responce.data)
          .then((data) => setUser(data.userData))
          .catch((error) => navigate(path.login))
          .finally(() => setIsLoading(false));
      } else {
        navigate(path.login);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (user.email) {
      const promise = axios.get('http://localhost:3001/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      promise
        .then((responce) => responce.data)
        .then((data) => setOrders(data))
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="user">
      <h1 className="title">{`Привет  ${user.name}!`}</h1>
      <div className="user__tabs">
        <button
          onClick={() => setCurrentTab('info')}
          className={
            currentTab === 'info' ? 'user__tab user__tab--active' : 'user__tab'
          }
        >
          Личные данные
        </button>
        <button
          onClick={() => setCurrentTab('orders')}
          className={
            currentTab === 'orders'
              ? 'user__tab user__tab--active'
              : 'user__tab'
          }
        >
          Заказы
        </button>
      </div>
      {currentTab === 'info' && <UserInfo user={user} />}
      {currentTab === 'orders' && <UserOrders orders={orders} />}
    </div>
  );
}

export { User };
