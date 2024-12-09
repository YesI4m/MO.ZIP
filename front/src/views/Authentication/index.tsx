import React, { KeyboardEvent, useRef, useState } from 'react'
import './style.css'
import InputBox from 'components/InputBox';

//          component: Authentication          //
export default function Authentication() {
  
//          state: 화면 상태         //
const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');

//          component: signincard          //
const SignInCard = () => {
  
//          state: email 요소 참조 상태         //
  const emailRef = useRef<HTMLInputElement | null>(null);
//          state: password 요소 참조 상태         //
  const passwordRef = useRef<HTMLInputElement | null>(null);
  

//          state: email 상태         //
  const [email, setEmail] = useState<string>('');
//          state: password 상태         //
  const [password, setPassword] = useState<string>('');
//          state: password type 상태         //
  const [passwordType, setPasswordType] = useState<'text'|'password'>('password');
//          state: password button icon 상태         //
  const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon' >('eye-light-off-icon');
//          state: error 상태         //
  const [error, setError] = useState<boolean>(false);


//          event handler: login button click         //
  const onSignInButtonClickHandler = () => {

  }

//          event handler: 회원가입 링크 click         //
  const onSignUpLinkClickHandler = () => {
    setView('sign-up')
  }

//          event handler: password button click         //
const onPasswordButtonClickHandler = () => {
  if (passwordType === 'text'){
    setPasswordType('password');
    setPasswordButtonIcon('eye-light-off-icon');
  } else {
    setPasswordType('text');
    setPasswordButtonIcon('eye-light-on-icon');
  }
}

//          event handler: email 인풋 키 다운         //
  const onEmailKeyDownHandler = (event : KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    if (!passwordRef.current) return;
    passwordRef.current.focus();
  }

//          event handler: password 인풋 키 다운         //
  const onPasswordKeyDownHandler = (event : KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
  onSignInButtonClickHandler();
  }

//          render: signincard            //
    return(
      <div className='auth-card'>
        <div className='auth-card-box'>
          <div className='auth-card-top'>
            <div className='auth-card-title-box'>
              <div className='auth-card-title'>{'로그인'}</div>
            </div>
            <InputBox ref={emailRef} lable='이메일 주소' type='text' placeholder='이메일 주소를 입력해 주세요.' error={error}value={email} setValue={setEmail} onKeyDown={onEmailKeyDownHandler} />
            <InputBox ref={passwordRef} lable='패스워드' type={passwordType} placeholder='비밀번호를 입력해 주세요.' error={error}  value={password} setValue={setPassword} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler} />
            
          </div>
          <div className='auth-card-bottom'>
            {error &&
            <div className='auth-sign-in-error-box'>
              <div className='auth-sign-in-error-message'>
                {'이메일 주소 또는 비밀번호를 잘못입력했습니다. \n입력하신 내용을 다시 확인해주세요.'}
                </div>
            </div>
            }
            <div className='black-large-full-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
            <div className='auth-description'>{'신규 사용자이신가요? '}<span className='auth-description-link' onClick={onSignUpLinkClickHandler}>{'회원가입'}</span></div>
          </div>
        </div>
      </div>
    )
  }


//          component: signupcard          //
  const SignUpCard = () => {

//          render: signupcard            //
    return(
      <div className='auth-card'></div>
    )
  }
    
//          render: Authentication            //
  return (
    <div id='auth-wrapper'>
      <div className='auth-container'>
        <div className='auth-jumbotron-box'>
          <div className='auth-jumbotron-contents'>
            <div className='auth-logo-icon'></div>
            <div className='auth-jumbotron-text-box'>
              <div className='auth-jumbotron-text'>{'환영합니다'}</div>
              <div className='auth-jumbotron-text'>{'이름이뭐가될까요?'}</div>
            </div>
          </div>
        </div>
        {view === 'sign-in' && <SignInCard/>}
        {view === 'sign-up' && <SignUpCard/>}
      </div>
    </div>
  )
}
