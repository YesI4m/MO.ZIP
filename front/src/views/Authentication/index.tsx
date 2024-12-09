import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import './style.css'
import InputBox from 'components/InputBox';
import { signInRequest } from 'apis';
import { SignInRequestDto } from 'apis/request/auth';
import { SignInResponseDto } from 'apis/response/auth';
import { ResponseDto } from 'apis/response';
import { useCookies } from 'react-cookie';
import { MAIN_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';

//          component: Authentication          //
export default function Authentication() {
  
//          state: 화면 상태         //
const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');

//          function: navigate          //
const navigator = useNavigate();

//          state: cookie 상태         //
const [cookies, setCookie] = useCookies();

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

//          function: sign in response 처리 함수          //
  const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null) => {
    if(!responseBody){
      alert('네트워크 이상입니다.');
      return;
    }
    const { code } = responseBody;
    if (code === 'DBE') alert('데이터베이스 오류입니다');
    if (code === 'VF' || code === 'SF') setError(true);
    if (code !== 'SU') return;
    const { token, expirationTime } = responseBody as SignInResponseDto;
    const now = new Date().getTime();
    const expires = new Date(now + expirationTime * 1000);

    setCookie('accessToken', token, { expires, path: MAIN_PATH() });
    navigator(MAIN_PATH());
    
  }

//          event handler: email 변경 change         //
  const onEmailChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
    setError(false);
    const { value } = event.target;
    setEmail(value);
  }

//          event handler: password 변경 change         //
const onPasswordChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
  setError(false);
  const { value } = event.target;
  setPassword(value);
}

//          event handler: login button click         //
  const onSignInButtonClickHandler = () => {
    const requestBody: SignInRequestDto = { email,password };
    signInRequest(requestBody).then(signInResponse);
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
            <InputBox ref={emailRef} lable='이메일 주소' type='text' placeholder='이메일 주소를 입력해 주세요.' error={error}value={email} onChange={onEmailChangeHandler} onKeyDown={onEmailKeyDownHandler} />
            <InputBox ref={passwordRef} lable='패스워드' type={passwordType} placeholder='비밀번호를 입력해 주세요.' error={error}  value={password} onChange={onPasswordChangeHandler} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler} />
            
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

//          state: email 요소 참조 상태          //
  const emailRef = useRef<HTMLInputElement | null>(null);
//          state: password 요소 참조 상태          //
  const passwordRef = useRef<HTMLInputElement | null>(null);
//          state: passwordCheck 요소 참조 상태          //
  const passwordCheckRef = useRef<HTMLInputElement | null>(null);
//          state: nickname 요소 참조 상태          //
  const nicknameRef = useRef<HTMLInputElement | null>(null);
//          state: telnum 요소 참조 상태          //
  const telNumRef = useRef<HTMLInputElement | null>(null);
//          state: address 요소 참조 상태          //
  const addressRef = useRef<HTMLInputElement | null>(null);
//          state: addressDetail 요소 참조 상태          //
  const addressDetailRef = useRef<HTMLInputElement | null>(null);

//          state: password 타입 상태          //
  const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
//          state: passwordCheck 타입 상태          //
  const [passwordCheckType, setPasswordCheckType] = useState<'text' | 'password'>('password');

//          state: 페이지 번호 상태          //
  const [page,setPage] = useState<1|2>(2);
//          state: 이메일 상태          //
  const [email, setEmail] = useState<string>('');
//          state: password 상태          //
  const [password, setPassword] = useState<string>('');
//          state: password 상태          //
  const [passwordCheck, setPasswordCheck] = useState<string>('');
//          state: nickname 상태          //
const [nickname, setNickname] = useState<string>('');
//          state: telNum 상태          //
const [telNum, setTelNum] = useState<string>('');
//          state: address 상태          //
const [address, setAddress] = useState<string>('');
//          state: addressDetail 상태          //
const [addressDetail, setAddressDetail] = useState<string>('');

//          state: email 에러 상태          //
  const [isEmailError, setEmailError] = useState<boolean>(false);
//          state: password 에러 상태          //
  const [isPasswordError, setPasswordError] = useState<boolean>(false);
//          state: passwordCheck 에러 상태          //
  const [isPasswordCheckError, setPasswordCheckError] = useState<boolean>(false);
//          state: nickname 에러 상태          //
const [isNicknameError, setNicknameError] = useState<boolean>(false);
//          state: telNum 에러 상태          //
const [isTelNumError, setTelNumError] = useState<boolean>(false);
//          state: address 에러 상태          //
const [isAddressError, setAddressError] = useState<boolean>(false);

//          state: email 에러 메세지 상태          //
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
//          state: password 에러 메세지 상태          //
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
//          state: passwordCheck 에러 메세지 상태          //
  const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState<string>('');
//          state: nickname 에러 메세지 상태          //
const [nicknameErrorMessage, setNicknameErrorMessage] = useState<string>('');
//          state: telNum 에러 메세지 상태          //
const [telNumErrorMessage, setTelNumErrorMessage] = useState<string>('');
//          state: address 에러 메세지 상태          //
const [addressErrorMessage, setAddressErrorMessage] = useState<string>('');

 //          state: 패스워드 버튼 아이콘 상태          //
  const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon' >('eye-light-off-icon');

 //          state: 패스워드 체크 버튼 아이콘 상태          //
  const [passwordCheckButtonIcon, setPasswordCheckButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon' >('eye-light-off-icon');

//          event handler: 이메일 변경 이벤트           //
  const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
    const {value} = event.target;
    setEmail(value);
  }

//          event handler: 패스워드 변경 이벤트           //
  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
    const {value} = event.target;
    setPassword(value);
  }

//          event handler: 패스워드 변경 이벤트           //
  const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
  const {value} = event.target;
  setPasswordCheck(value);
}

//          event handler: nickname 변경 이벤트           //
const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
  const {value} = event.target;
  setPassword(value);
}
//          event handler: telNum 변경 이벤트           //
const onTelNumChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
  const {value} = event.target;
  setTelNum(value);
}
//          event handler: address 변경 이벤트           //
const onAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
  const {value} = event.target;
  setAddress(value);
}
//          event handler: addressDetail 변경 이벤트           //
const onAddressDetailChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
  const {value} = event.target;
  setAddressDetail(value);
}

//          event handler: 패스워드 버튼 클릭              //
  const onPasswordButtonClickHandler = () => {
    if(passwordButtonIcon==='eye-light-off-icon'){
      setPasswordButtonIcon('eye-light-on-icon');
      setPasswordType('text');
    } else {
      setPasswordButtonIcon('eye-light-off-icon');
      setPasswordType('password');
    }
  }

//          event handler: 패스워드 버튼 클릭              //
const onPasswordCheckButtonClickHandler = () => {
  if(passwordCheckButtonIcon==='eye-light-off-icon'){
    setPasswordCheckButtonIcon('eye-light-on-icon');
    setPasswordCheckType('text');
  } else {
    setPasswordCheckButtonIcon('eye-light-off-icon');
    setPasswordCheckType('password');
  }
}

//          event handler: 주소 버튼 클릭              //
  const onAddressButtonClickHandler = () => {

  }

//          event handler: 다음단계 버튼 클릭            //
  const onNextButtonClickHandler = () => {
    const emailPattern = /^$[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
    const isEmaiilPattern = emailPattern.test(email);
    if(!isEmaiilPattern){
      setEmailError(true);
      setEmailErrorMessage('이메일 주소 포멧이 맞지 않습니다.')
    }
    const isCheckedPassword = password.trim().length >= 8
    if(!isCheckedPassword){
      setPasswordError(true);
      setPasswordErrorMessage('비밀번호를 8자 이상 입력해주세요.')
    }
    const isEqualPassword = password === passwordCheck;
    if(!isEqualPassword){
      setPasswordCheckError(true);
      setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다.')
    }
    if(!isEmaiilPattern || !isCheckedPassword || !isEqualPassword) return;
    setPage(2);
  }

//          event handler: 회원가입 버튼 클릭 이벤트            //
const onSignUpButtonClickHandler = () => {

}

//          event handler: 로그인 링크 클릭 이벤트            //
  const onSignInLinkClickHandler = () =>{
    setView('sign-in')
  }


//          event handler: email 키 다운 이벤트            //
  const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    if(!passwordRef.current) return;
    passwordRef.current.focus();
  }
//          event handler: password 키 다운 이벤트            //
  const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    if(!passwordCheckRef.current) return;
    passwordCheckRef.current.focus();
  }
//          event handler: passwordcheck 체크 키 다운 이벤트            //
  const onPasswordCheckKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    if(!passwordRef.current) return;
    onNextButtonClickHandler();
  }
//          event handler: nickname 키 다운 이벤트            //
const onNicknameKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
  if(event.key !== 'Enter') return;

}
//          event handler: telNum 키 다운 이벤트            //
const onTelNumKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
  if(event.key !== 'Enter') return;

}
//          event handler: address 키 다운 이벤트            //
const onAddressKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
  if(event.key !== 'Enter') return;

}
//          event handler: addressDetail 키 다운 이벤트            //
const onAddressDetailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
  if(event.key !== 'Enter') return;

}

//          render: signupcard            //
    return(
      <div className='auth-card'>
        <div className='auth-card-box'>
          <div className='auth-card-top'>
            <div className='auth-card-title-box'>
              <div className='auth-card-title'>{'회원가입'}</div>
              <div className='auth-card-page'>{`${page}/2`}</div>
            </div>
            {page === 1 && (
              <>
              <InputBox ref={emailRef} 
              type='text' placeholder='이메일 주소를 입력해 주세요.' value={email} onChange={onEmailChangeHandler} error={isEmailError} message={emailErrorMessage} lable='이메일 주소*' onKeyDown={onEmailKeyDownHandler} />
              <InputBox ref={passwordRef} type={passwordType} placeholder='비밀번호를 입력해 주세요' value={password} onChange={onPasswordChangeHandler} error={isPasswordError} message={passwordErrorMessage} lable='비밀번호*' icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler}/>
              <InputBox ref={passwordCheckRef} type={passwordCheckType} placeholder='비밀번호를 다시 입력해 주세요' value={passwordCheck} onChange={onPasswordCheckChangeHandler} error={isPasswordCheckError} message={passwordCheckErrorMessage} lable='비밀번호 확인*' icon={passwordCheckButtonIcon} onButtonClick={onPasswordCheckButtonClickHandler} onKeyDown={onPasswordCheckKeyDownHandler}/>
             </>
            )}
            {page === 2 && (
              <>
              <InputBox ref={nicknameRef} lable='닉네임*' type='text' placeholder='닉네임을 입력해주세요.' value={nickname} onChange={onNicknameChangeHandler} error={isNicknameError} message={nicknameErrorMessage} onKeyDown={onNicknameKeyDownHandler}/>
              <InputBox ref={telNumRef} lable='핸드폰 번호*' type='text'
              placeholder='핸드폰 번호를 입력해 주세요.' value={telNum} onChange={onTelNumChangeHandler} error={isTelNumError} message={telNumErrorMessage} onKeyDown={onTelNumKeyDownHandler}/>
              <InputBox ref={addressRef} lable='주소' type='text' placeholder='우편번호 찾기' value={address} onChange={onAddressChangeHandler} error={isAddressError} message={addressErrorMessage} onButtonClick={onAddressButtonClickHandler} onKeyDown={onAddressKeyDownHandler}/>
              <InputBox ref={addressDetailRef} lable='상세주소' type='text' placeholder='상세주소를 입력해주세요.' value={addressDetail} onChange={onAddressDetailChangeHandler} error={false} onKeyDown={onAddressDetailKeyDownHandler}/>
              </>
            )}
          </div>
          <div className='auth-card-bottom'>
            {page === 1 && (
              <div className='black-large-full-button'onClick={onNextButtonClickHandler}>{'다음단계'}</div>
          )}
            {page === 2 && (
              <>
                <div className='auth-consent-box'>
                  <div className='auth-check-box'>
                    <div className='check-ring-light-icon'></div>
                  </div>
                  <div className='auth-consect-title'>{'개인정보동의'}</div>
                  <div className='auth-consent-link'>{'더보기 >'}</div>
                </div>
                <div className='black-large-full-button'onClick={onSignUpButtonClickHandler}>{'회원가입'}</div>
              </>
            )}
          <div className='auth-description'>{'이미 계정이 있으신가요?'}<span className='auth-description-link' onClick={onSignInLinkClickHandler}>{'로그인'}</span></div>
          </div>
        </div>
      </div>
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
