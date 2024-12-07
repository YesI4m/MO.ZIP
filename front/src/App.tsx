import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from 'views/Main';
import Authentication from 'views/Authentication';
import Search from 'views/Search';
import User from 'views/User';
import BoardWrite from 'views/Board/Write';
import BoardUpdate from 'views/Board/Update';
import BoardDetail from 'views/Board/Detail';
import Container from 'layouts/Container';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';


//          component: App          //
function App() {

//          render: App             //

  return (
    <Routes>
      <Route element={<Container/>}>
        <Route path={MAIN_PATH()} element={<Main />}/>
        <Route path={AUTH_PATH()} element={<Authentication />}/>
        <Route path={SEARCH_PATH(':searchWord')} element={<Search />}/>
        <Route path={USER_PATH(':userEmail')} element={<User />}/>
        <Route path={BOARD_PATH()}>
          <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />}/>
          <Route path={BOARD_DETAIL_PATH(':boardNum')} element={<BoardDetail />}/>
          <Route path={BOARD_UPDATE_PATH(':boardNum')} element={<BoardUpdate />}/>
        </Route>

        <Route path='*' element={<h1>404 Not Found</h1>}/>
      </Route>
    </Routes>
  );
}

export default App;
