import './App.css';
//import 'antd/dist/reset.css'
//import Header from './сomponents/Header/Header';
import Navbar from './сomponents/Navbar/Navbar';
import News from './сomponents/News/News';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React from 'react';
//import store, { updateNewPostText } from './redux/store';
import DialogsContainer from './сomponents/Dialogs/DialogsContainer';
//import UsersContainer from './сomponents/Users/UsersContainer';
import ProfileContainer, { withRouter } from './сomponents/Profile/ProfileContainer';
//import HeaderContainer from './сomponents/Header/HeaderContainer';
import {Login} from './сomponents/Login/Login';
import { connect } from 'react-redux';
import {getAuthUserData} from "./redux/auth-reducer"
import { compose } from 'redux';
import {initializeApp} from "./redux/app-reducer"
import Preloader from './сomponents/common/preloader/Preloader';
import BookSection from './сomponents/Book section/BookSection';
import { AppStateType } from './redux/redux-store';
import { UsersPage } from './сomponents/Users/UsersContainer';

import s from '../src/сomponents/Navbar/Navbar.module.css'
import { NavLink } from "react-router-dom";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Col, MenuProps, Row } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import { Avatar } from 'antd';
import { Header } from './сomponents/Header/Header';
import Todolist from './сomponents/ToDoList/Todolist';

const { Content, Footer, Sider } = Layout;




type MapPropsType = ReturnType<typeof mapStateToProps> 

type DispatchPropsType = {
  initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {

  componentDidMount() {
    this.props.initializeApp();
    // window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  render() {

    if(!this.props.initialized) {
      return <Preloader />
    }



    return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Content style={{ padding: '0 50px' }}>
        <Layout style={{ padding: '24px 0'/*, background: colorBgContainer */}}>
          <Sider style={{ /*background: colorBgContainer*/ minHeight: "85vh", maxHeight: "85vh"}} width={300}>
            <Menu
              mode="inline"
              //defaultSelectedKeys={['1']}
              //defaultOpenKeys={['sub1']}
              style={{ height: '100%'}}
              /*items={items2}*/
            >
              <MenuItem key="1" style={{fontSize: '20px' }}><NavLink to="/profile">Profile</NavLink></MenuItem>
              <MenuItem style={{fontSize: '20px'}}><NavLink to="/users">Users</NavLink></MenuItem>
              <MenuItem style={{fontSize: '20px'}}><NavLink to="/todolist">To do list</NavLink></MenuItem>
              <MenuItem style={{fontSize: '20px'}}><NavLink to="/sectionbook">Book section</NavLink></MenuItem>
              <MenuItem style={{fontSize: '20px'}}><NavLink to="/dialogs">Message</NavLink></MenuItem>
              <MenuItem style={{fontSize: '20px'}}><NavLink to="/news">News</NavLink></MenuItem>
            </Menu>

            
          </Sider>
          
          
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Routes>
            <Route path='/' element={<Navigate to="/profile" />} />
            <Route path='/profile' element={<ProfileContainer/>}>
              <Route path=':userId' element={<ProfileContainer />} />
            </Route>
            <Route path='/dialogs' element={<DialogsContainer />} />
            <Route path='/todolist' element={<Todolist/>} />
            <Route path='/news' element={<News/>} />
            <Route path='/users' element={ <UsersPage pageTitle={"Clients social network"}/> } />
            <Route path='/login' element={ <Login/> } />
            <Route path='/sectionbook' element={ <BookSection/> } >
              <Route path=':id' element={<BookSection/>}/>
            </Route>
            <Route path='*' element={<div className='test1'>404 NOT FOUND</div>}/>
          </Routes>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Social Network ©2023 Created by Savodyarkin Nikita</Footer>
    </Layout>




    //<BrowserRouter>


      /*<div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Routes>
            <Route path='/' element={<Navigate to="/profile" />} />
            <Route path='/profile' element={<ProfileContainer/>}>
              <Route path=':userId' element={<ProfileContainer />} />
            </Route>
            <Route path='/dialogs' element={<DialogsContainer />} />
            <Route path='/news' element={<News/>} />
            <Route path='/users' element={ <UsersPage pageTitle={"Clients social network"}/> } />
            <Route path='/login' element={ <Login/> } />
            <Route path='/sectionbook' element={ <BookSection/> } >
              <Route path=':id' element={<BookSection/>}/>
            </Route>
            <Route path='*' element={<div>404 NOT FOUND</div>}/>
          </Routes>
        </div>
      </div>*/


    //</BrowserRouter>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})


export default  compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);
