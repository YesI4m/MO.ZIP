import React from 'react'
import './style.css';
import { BoardListItem } from 'types/interface';
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from '../../assets/image/default-profile-image.png'

interface Props{
    boardListItem: BoardListItem
}


//----------componet : BoardListItem----------//
export default function BoardItem({ boardListItem }: Props) {

//----------       properties       ----------//
const {boardNum, title, content, boardTitleImage,
    favoriteCount, viewCount, commentCount,
    writeDatetime, writerNickname, writerProfileImage} = boardListItem;

//---------- function  :  navigate  ----------//
// const navigator = useNavigate();

//----------event handler: 게시물 아이템 클릭----------//
const onClickhandler = () => {
    // navigator(boardNum);
}

//---------- render  : BoardListItem----------//
  return (
    <div className='board-list-item' onClick={onClickhandler}>
        <div className='board-list-item-main-box'>
            <div className='board-list-item-top'>
                <div className='board-list-item-profile-box'>
                    <div className='board-list-item-profile-image' style={{backgroundImage: `url(${writerProfileImage ? writerProfileImage : defaultProfileImage})`}}></div>
                </div>
                <div className='board-list-item-write-box'>
                    <div className='board-list-item-nickname'>{writerNickname}</div>
                    <div className='board-list-item-write-date'>{writeDatetime}</div>
                </div>
            </div>
            <div className='board-list-item-middle'>
                <div className='board-list-item-title'>{title}</div>
                <div className='board-list-item-content'>{content}</div>
            </div>
            <div className='board-list-item-bottom'>
                <div className='board-list-item-counts'>
                    {`댓글 ${commentCount} - 좋아요 ${favoriteCount} - 조회수 ${viewCount}`}
                </div>
            </div>
        </div>
        {boardTitleImage !== null && (
        <div className='board-list-item-image-box'>
            <div className='board-list-item-image' style={{ backgroundImage:`url(${boardTitleImage})`}}></div>
        </div>
        )}
    </div>
  )
}
