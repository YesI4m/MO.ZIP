import React from 'react'
import './style.css'
import defaultProfileImage from 'assets/image/default-profile-image.png'
import { BoardListItem } from 'types/interface'
import { useNavigate } from 'react-router-dom'

interface Props{
    top3ListItem: BoardListItem
}

//----------componet : BoardListItem----------//
export default function Top3Item({ top3ListItem }: Props) {
//----------       properties       ----------//
  const { boardNum, title, content, boardTitleImage,
    favoriteCount, viewCount, commentCount,
    writeDatetime, writerNickname, writerProfileImage } = top3ListItem;

//---------- function  :  navigate  ----------//
// const navigator = useNavigate();

//----------event handler: 게시물 아이템 클릭----------//
const onClickhandler = () => {
  // navigator(boardNum);
}

//---------- render  : BoardListItem----------//  
  return (
    <div className='top3-list-item' style={{ backgroundImage: `url(${boardTitleImage})` }} onClick={onClickhandler}>
      <div className='top3-list-item-main-box'>
        <div className='top3-list-item-top'>
          <div className='top3-list-item-profile-box'>
            <div className='top3-list-item-profile-image' style={{ backgroundImage: `url(${writerProfileImage ? writerProfileImage : defaultProfileImage})`}}></div>
          </div>
          <div className='top3-list-item-write-box'>
            <div className='top3-list-item-nickname'>{writerNickname}</div>
            <div className='top3-list-item-write-date'>{writeDatetime}</div>
          </div>
        </div>
        <div className='top3-list-item-middle'>
          <div className='top3-list-item-title'>{title}</div>
          <div className='top3-list-item-content'>{content}</div>
        </div>
        <div className='top3-list-item-bottom'>
          <div className='top3-list-item-counts'>{`댓글 ${favoriteCount} · 좋아요 ${commentCount} · 조회수 ${viewCount},`}</div>
        </div>
      </div>
    </div>
  )
}
