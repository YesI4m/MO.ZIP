import React from 'react'
import './style.css'

//          component: Footer 레이아웃          //
export default function Footer() {

//          event handler: 인스타 아이콘 버튼 클릭          //
    const onInstaIconButtonClickHandler = () => {
        window.open('https://www.instagram.com')
    }

//          event handler: 네이버 블로그 아이콘 버튼 클릭          //
    const onNaverBlogIconButtonClickHandler = () => {
        window.open('https://blog.naver.com')
    }

//          render: Footer 레이아웃             //

    return (
    <div id='footer'>
        <div className='footer-container'>
            <div className='footer-top'>
                <div className='footer-logo-box'>
                    <div className='icon-box'>
                        <div className='icon logo-light-icon'></div>
                    </div>
                    <div className='footer-logo-text'>{'이름이뭐가될까요'}</div>
                </div>
                <div className='footer-link-box'>
                    <div className='footer-email-link'>{'itissuperepic@gmail.com'}</div>
                    <div className='icon-button'>
                        <div className='icon insta-icon' onClick={onInstaIconButtonClickHandler}></div>
                    </div>
                    <div className='icon-button'>
                        <div className='icon naver-blog-icon' onClick={onNaverBlogIconButtonClickHandler}></div>
                    </div>
                </div>
            </div>
            <div className='footer-bottom'>
                <div className='footer-copyright'>{'카피라이트 어쩌구 날짜어쩌구..이름 어쩌구..'}</div>
            </div>
        </div>
    </div>
  )
}
