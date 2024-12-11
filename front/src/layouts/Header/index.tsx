import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import './style.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useBoardStore, useLoginUserStore } from 'stores';
import { fileUploadRequest, postBoardRequest } from 'apis';
import { PostBoardRequestDto } from 'apis/request/board';
import { postBoardResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';

//           component: Header          //
export default function Header() {

//           state: 로그인 유저 상태         //
const { loginUser, setLoginUser, resetLoginUser } = useLoginUserStore();

//           state: path 상태          //
const { pathname } = useLocation();

//           state: 인증 페이지 상태          //
const [isAuthPage, setIsAuthPage] = useState<boolean>(false);
//           state: 메인 페이지 상태          //
const [isMainPage, setIsMainPage] = useState<boolean>(false);
//           state: 검색 페이지 상태          //
const [isSearchPage, setIsSearchPage] = useState<boolean>(false);
//           state: 게시물 상세 페이지 상태          //
const [isBoardDetailPage, setIsBoardDetailPage] = useState<boolean>(false);
//           state: 게시물 작성 페이지 상태          //
const [isBoardWritePage, setIsBoardWritePage] = useState<boolean>(false);
//           state: 게시물 수정 페이지 상태          //
const [isBoardUpdatePage, setIsBoardUpdatePage] = useState<boolean>(false);
//           state: 유저 페이지 상태          //
const [isUserPage, setIsUserPage] = useState<boolean>(false);


//           state: cookie 상태         //
const [cookies, setCookies] = useCookies();

//           state: 로그인 상태         //
const [isLogin, setLogin] = useState<boolean>(false);


//          function: navigate          //
const navigate = useNavigate();

//          event handler: 로고 클릭 이벤트 처리 함수          //
const onLogoClickHandler = () => {
  navigate(MAIN_PATH());
}

//          component: 검색 버튼          //
const SearchButton = () => {

//          state: 검색 버튼 요소 참조 상태         //
  const searchButtonRef = useRef<HTMLDivElement | null>(null);

//          state: 검색 버튼 상태         //
  const [status, setStatus] = useState<boolean>(false);

//          state: 검색어 상태         //
  const [word, setWord] = useState<string>('');

//          state: 검색어 path variable 상태        //
  const { searchWord } = useParams();

//          event handler: 검색어 변경           //
  const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setWord(value);
  }

//          event handler: 검색 키 다운 이벤트          //
  const onSearchWordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    if(!searchButtonRef.current) return;
    searchButtonRef.current.click();
  }

//          event handler: 검색 아이콘 클릭          //
  const onSearchButtonClickHandler = () => {
    if(!status){
      setStatus(!status);
      return;
    }
    navigate(SEARCH_PATH(word));
  }

//          effect: 검색어 path valrialve 변경시 실행         //
  useEffect(()=>{
    if(searchWord){
      setWord(searchWord);
      setStatus(true);
    }
  }, [searchWord]);

  if(!status)
//          render: 검색 버튼 (클릭 false)           //
    return(
      <div className='icon-button'>
        <div className='icon search-light-icon' onClick={onSearchButtonClickHandler}></div>
      </div>
    )
//          render: 검색 버튼 (클릭 true)           //
  return(
    <div className='header-search-input-box'>
      <input className='header-search-input' type='text' placeholder='검색어를 입력해주세요' value={word} onChange={onSearchWordChangeHandler} onKeyDown={onSearchWordKeyDownHandler}/>
      <div ref={searchButtonRef} className='icon-button' onClick={onSearchButtonClickHandler}>
        <div className='icon search-light-icon'></div>
      </div>
    </div>
  )
}

//          component: login mypage logout 버튼          //
  const LoginMyPageButton = () => {

//          state: userEmail path variable 상태          //
  const { userEmail } = useParams();

  //          event handler: 마이페이지 버튼 클릭          //
  const onMyPageButtonClickHandler = () => {
    if(!loginUser) return;
    const{ email } = loginUser
    navigate(USER_PATH(email));
  }

  //          event handler: 로그아웃 버튼 클릭          //
  const onSignOutButtonClickHandler = () => {
    resetLoginUser();
    setCookies('accessToken', '', { path: MAIN_PATH(),expires: new Date() })
    navigate(MAIN_PATH());
  }

//          event handler: 로그인 버튼 클릭          //
  const onSignInButtonClickHandler = () => {
    navigate(AUTH_PATH());
  }

//           render: logout          //
  if(isLogin && userEmail === loginUser?.email)
    return(
      <div className='white-button' onClick={onSignOutButtonClickHandler}>{'로그아웃'}</div>
    )

//           render: mypage          //
  if(isLogin)
     return(
      <div className='white-button' onClick={onMyPageButtonClickHandler}>{'마이페이지'}</div>
     )

//           render: login          //
     return(
      <div className='black-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
     )
  }


//          component: upload 버튼           //
  const UploadButton = () => {

//          state: 게시물 상태           //
    const { title, content, boardImageFileList, resetBoard } = useBoardStore();

//          function: post board response 처리          //
    const postBoardResponse = (responseBody: postBoardResponseDto | ResponseDto | null) => {
      if(!responseBody) return;
      const { code } = responseBody;
      if (code ==='AF' || code === 'NU') navigate(AUTH_PATH());
      if (code ==='VF') alert('제목과 내용은 필수 항목입니다.');
      if (code ==='DBE') alert('데이터베이스 오류입니다.')
      if (code !=='SU') return;

      resetBoard();
      if(!loginUser) return;
      const { email } = loginUser;
      navigate(USER_PATH(email));
    }


//           event handler: 업로드 버튼 클릭 이벤트          //
    const onUploadButtonClickHandler = async() => {
      const accessToken = cookies.accessToken;
      if(!accessToken) return;

      const boardImageList: string[] = [];

      for (const file of boardImageFileList){
        const data = new FormData();
        data.append('file',file);

        const url = await fileUploadRequest(data);
        if(url) boardImageList.push(url);
      }

      const requestBody: PostBoardRequestDto = {
        title, content, boardImageList
      }
      postBoardRequest(requestBody,accessToken).then(postBoardResponse);
    }

//          render: 업로드 버튼              //
    if (title && content)
      return(
        <div className='black-button' onClick={onUploadButtonClickHandler}>{'업로드'}</div>
      )

//          render: 업로드 불가  버튼          //
    return(
      <div className='disable-button'>{'업로드 불가'}</div>
    )
  }


//          effect: path가 변경될 때 실행          //
  useEffect(() => {
    const isAuthPage = pathname.startsWith(AUTH_PATH());
    setIsAuthPage(isAuthPage);
    const isMainPage = pathname === MAIN_PATH();
    setIsMainPage(isMainPage);
    const isSearchPage = pathname.startsWith(SEARCH_PATH(''));
    setIsSearchPage(isSearchPage);
    const isBoardDetailPage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(''));
    setIsBoardDetailPage(isBoardDetailPage);
    const isBoardWritePage = pathname.startsWith(BOARD_PATH() + '/' +BOARD_WRITE_PATH());
    setIsBoardWritePage(isBoardWritePage);
    const isBoardUpdatePage = pathname.startsWith(BOARD_PATH() + '/' +BOARD_UPDATE_PATH(''));
    setIsBoardUpdatePage(isBoardUpdatePage);
    const isUserPage = pathname.startsWith(USER_PATH(''));
    setIsUserPage(isUserPage);
  }, [pathname])

//          effect: login user가 변경될 때 실행          //
useEffect(()=> {
  setLogin(loginUser !== null);
}, [loginUser]);


//           render: Header          //
  return (
    <div id='header'>
      <div className='header-container'>
        <div className='header-left-box' onClick={onLogoClickHandler}>
          <div className='icon-box'>
            <div className='icon logo-dark-icon'></div>
          </div>
          <div className='header-logo'>{'여기는 뭐가들어갈까요'}</div>
        </div>
        <div className='header-right-box'>
          {(isAuthPage || isMainPage || isSearchPage || isBoardDetailPage) && <SearchButton/>}
          {(isMainPage || isSearchPage || isBoardDetailPage || isUserPage) && <LoginMyPageButton/>}
          {(isBoardWritePage|| isBoardUpdatePage) && <UploadButton/>}
        </div>
      </div>
    </div>
  )
}
