import React, { FC } from "react";
import { NavLink, Route } from "react-router-dom";
import s from './Header.module.css';
import { Avatar, Button, Col, Row } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUserLogin, selectIsAuth } from "../../redux/auth-selectors";
import { logout } from "../../redux/auth-reducer";


export type MapPropsType = {
}


export const Header: FC<MapPropsType> = (props) => {

  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectCurrentUserLogin);

  const dispatch = useDispatch();

  const logoutCallback = () => {
    dispatch<any>(logout())
  }

  const { Header} = Layout;
  return (
    <Header>
        <Row>
          <Col span={20}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} >
              <div className={s.head}>
                Social Network
              </div>
            </Menu>
          </Col>
          {isAuth ?
            <>
              <Col span={1}>
                <Avatar alt={login || ''} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              </Col>
              <Col span={2} style={{color: 'white'}}>
                {login}
              </Col>
              <Col span={1}>
                <Button onClick={logoutCallback}>Log out</Button>
              </Col>
            </>
            : <Col span={4}>
              <Button>
                <NavLink to={'/login'}>Login</NavLink> 
              </Button>
            </Col>}
        </Row>
      </Header>



  // <header className={s.header}>
  //   <img className={s.img1} src="https://img.freepik.com/premium-vector/logo-letter-sn_638109-16.jpg"/>
  //   <span className={s.h1}>Social network</span>  

  //   <div className={s.loginBlock}>
  //     {props.isAuth ? <div>
  //       <div>{props.login}</div> 
  //         <button onClick={props.logout}>Log out</button>
  //       </div>
  //       :<NavLink to={'/login'}>Login</NavLink> }
  //   </div>
  // </header>
  )
}