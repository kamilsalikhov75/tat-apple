import './sidebar.css';

import logo from '../../assets/logo.png';
import { path, store } from '../../const';
import {
  airpodsIcon,
  applewatchIcon,
  cartIcon,
  caseIcon,
  catalogIcon,
  chargerIcon,
  iphoneIcon,
  phoneIcon,
  shopIcon,
  userIcon,
  vkIcon,
} from '../../icons';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to={path.main} className="logo">
        <img src={logo} alt="" className="logo-img" />
      </Link>

      <div className="sidebar__block">
        <Link to={path.user} className="sidebar__link sidebar__link--white">
          <img src={userIcon} className="sidebar__img" />
          Профиль
        </Link>

        <Link to={path.cart} className="sidebar__link sidebar__link--white">
          <img src={cartIcon} className="sidebar__img" />
          Корзина
        </Link>
      </div>

      <div className="sidebar__block">
        <Link to={path.main} className="sidebar__link">
          <img src={catalogIcon} className="sidebar__img" />
          Каталог
        </Link>
        <Link to={path.iphone} className="sidebar__link">
          <img src={iphoneIcon} className="sidebar__img" />
          iPhone
        </Link>
        <Link to={path.airpods} className="sidebar__link">
          <img src={airpodsIcon} className="sidebar__img" />
          AirPods
        </Link>
        <Link to={path.applewatch} className="sidebar__link">
          <img src={applewatchIcon} className="sidebar__img" />
          AppleWatch
        </Link>
        <Link to={path.case} className="sidebar__link">
          <img src={caseIcon} className="sidebar__img" />
          Чехлы
        </Link>
        <Link to={path.charger} className="sidebar__link">
          <img src={chargerIcon} className="sidebar__img" />
          Зарядные устройства
        </Link>
      </div>

      <div className="sidebar__block">
        <a href={path.vk} target="_blank" className="sidebar__link">
          <img src={vkIcon} className="sidebar__img" />
          Группа вконтакте
        </a>
      </div>

      <div className="sidebar__block">
        <div className="sidebar__links">
          <a href={path.store.kazan} target="_blank" className="sidebar__link">
            <img src={shopIcon} className="sidebar__img" />
            {store.kazan}
          </a>
          <a href="tel:+89600440201" className="sidebar__link">
            <img src={phoneIcon} className="sidebar__img" />
            89600440201
          </a>
        </div>
        <div className="sidebar__links">
          <a href={path.store.chelny} target="_blank" className="sidebar__link">
            <img src={shopIcon} className="sidebar__img" />
            {store.chelny}
          </a>
          <a href="tel:+89871857272" className="sidebar__link">
            <img src={phoneIcon} className="sidebar__img" />
            89871857272
          </a>
        </div>
        <div className="sidebar__links">
          <a
            href={path.store.almetevsk}
            target="_blank"
            className="sidebar__link"
          >
            <img src={shopIcon} className="sidebar__img" />
            {store.almetevsk}
          </a>
          <a href="tel:+89869062009" className="sidebar__link">
            <img src={phoneIcon} className="sidebar__img" />
            89869062009
          </a>
        </div>
      </div>
    </div>
  );
}
export { Sidebar };
