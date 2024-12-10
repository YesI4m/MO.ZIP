import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from 'views/Main';
import Authentication from 'views/Authentication';
import Search from 'views/Search';
import UserP from 'views/User';
import BoardWrite from 'views/Board/Write';
import BoardUpdate from 'views/Board/Update';
import BoardDetail from 'views/Board/Detail';
import Container from 'layouts/Container';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useLoginUserStore } from 'stores';
import { getSignInUserRequest } from 'apis';
import { GetSignInUserResponseDto } from 'apis/response/user';
import { ResponseDto } from 'apis/response';
import { User } from 'types/interface';


//          component: App          //
function App() {

//          state: login user 전역 상태        //
  const{ setLoginUser, resetLoginUser } = useLoginUserStore();

//          state: cookie 상태        //
  const [cookies, setCookie] = useCookies();

//          function: get sign in user response 처리        //
  const getSignInUserResponse = (responseBody: GetSignInUserResponseDto | ResponseDto | null) => {
    if(!responseBody) return;
    const { code } = responseBody;
    if(code === 'AF' || code === 'NU' || code === 'DBE'){
      resetLoginUser();
      return;
    }
    const loginUser: User = { ...responseBody as GetSignInUserResponseDto };
    setLoginUser(loginUser);
  }

//          effect: accessToken cookie 값이 변경될 때마다 실행할 함수          //
  useEffect(() => {
    if (!cookies.accessToken) {
      resetLoginUser();
      return;
    }
    getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
  },[cookies.accessToken]);

//          render: App             //

  return (
    <Routes>
      <Route element={<Container/>}>
        <Route path={MAIN_PATH()} element={<Main />}/>
        <Route path={AUTH_PATH()} element={<Authentication />}/>
        <Route path={SEARCH_PATH(':searchWord')} element={<Search />}/>
        <Route path={USER_PATH(':userEmail')} element={<UserP />}/>
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
