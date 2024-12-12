import CommentItem from 'components/CommentItem'
import FavoriteItem from 'components/FavoriteItem'
import Pagination from 'components/Pagination/assets'
import { commentListMock, favoriteListMock } from 'mocks'
import React, { useEffect, useState } from 'react'
import { CommentListItem, FavoriteListItem } from 'types/interface'
import './style.css'
import defaultProfileImage from 'assets/image/default-profile-image.png'

//          component: 게시물 Detail          //
export default function BoardDetail() {


  //          component: 게시물 Detail 상단 컴포넌트          //
  const BoardDetailTop=() => {

  //          state: morebutton 상태          //
  const[showmore, setShowmore] =useState<boolean>(false);

  //          event handler: morebutton 클릭         //
  const onMoreButtonClickHandler = () => {
    setShowmore(!showmore);
  }
  
  //          render: 게시물 상세 화면 상단 렌더링         //
    return(
    <div id='board-detail-top'>
      <div className='board-detail-top-header'>
        <div className='board-detail-title'>{'제목이들어가요'}</div>
        <div className='board-detail-top-sub-box'>
          <div className='board-detail-write-info-box'>
            <div className='board-detail-writer-profile-image' style={{backgroundImage:`url(${defaultProfileImage})`}}></div>
            <div className='board-detail-writer-nickname'>{'닉넴이들어가요'}</div>
            <div className='board-detail-info-divider'>{'|'}</div>
            <div className='board-detail-write-date'>{'2024. 12. 13'}</div>
          </div>
          <div className='icon-button' onClick={onMoreButtonClickHandler}>
            <div className='icon more-icon'></div>
          </div>
          { showmore &&
          <div className='board-detail-more-box'>
            <div className='board-detail-update-button'>{'수정'}</div>
            <div className='divider'></div>
            <div className='board-detail-delete-button'>{'삭제'}</div>
          </div>
          }
        </div>
      </div>
      <div className='divider'></div>
      <div className='board-detail-top-main'>
        <div className='board-detail-main-text'>{'내용이들어가요내용이들어가요내용이들어가요내용이들어가요'}</div>
        <img className='board-detail-main-image' src='https://blog.kakaocdn.net/dn/RKYy0/btsC4DUvZny/joKa5WmJZdf4NhErcZvBIk/img.jpg'/>
      </div>
    </div>
    )
  }


  //          component: 게시물 Detail 하단 컴포넌트         //
  const BoardDetailBottom = () => {

  const [favoirteList, setFavoiriteList] = useState<FavoriteListItem[]>([]);
  const [commentList, setCommentList] = useState<CommentListItem[]>([]);

    useEffect(()=> {
      setFavoiriteList(favoriteListMock);
      setCommentList(commentListMock);
    },[]);

  //          render: 게시물 상세 화면 하단 렌더링         //
  return(
    <div id='board-detail-bottom'>
      <div className='board-detail-bottom-box'>
        <div className='board-detail-bottom-button-group'>
          <div className='icon-button'>
            <div className='icon heart-fill-icon'></div>
          </div>
          <div className='board-detail-bottom-button-text'>{`관심있어요 ${12}`}</div>
          <div className='icon-button'>
            <div className='icon expand-up-light-icon'></div>
          </div>
        </div>
        <div className='board-detail-bottom-button-group'>
          <div className='icon-button'>
            <div className='icon comment-icon'></div>
          </div>
          <div className='board-detail-bottom-button-text'>{`댓글 ${12}`}</div>
          <div className='icon-button'>
            <div className='icon expand-up-light-icon'></div>
          </div>
        </div>
      </div>
      <div className='board-detail-bottom-heart-box'>
        <div className='board-detail-bottom-heart-container'>
          <div className='board-detail-bottom-heart-title'>{'관심있어요 '}<span className='emphasis'>{12}</span></div>
          <div className='board-detail-bottom-heart-contents'>
            {favoirteList.map(item => <FavoriteItem favoriteListItem={item}/>)}
          </div>
        </div>
      </div>
      <div className='board-detail-bottom-comment-box'>
        <div className='board-detail-bottom-comment-container'>
          <div className='board-detail-bottom-comment-title'>{'댓글 '}<span className='emphasis'>{12}</span></div>
          <div className='board-detail-bottom-comment-list-container'>
            {commentList.map(item => <CommentItem commentListItem={item}/>)}
          </div>
        </div>
        <div className='divider'></div>
        <div className='board-detail-bottom-comment-pagination-box'>
          <Pagination />
        </div>
        <div className='board-detail-bottom-comment-input-box'>
          <div className='board-detail-bottom-comment-input-container'>
            <textarea className='board-detail-bottom-comment-textarea' placeholder='댓글을 작성해주세요.' />
            <div className='board-detail-bottom-comment-button-box'>
              <div className='disable-button'>{'댓글달기'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  }

//          render: 게시물 Detail            //
  return (
    <div id ='board-detail-wrapper'>
      <div className='board-detail-container'>
        <BoardDetailTop/>
        <BoardDetailBottom/>
      </div>
    </div>
  )
}
