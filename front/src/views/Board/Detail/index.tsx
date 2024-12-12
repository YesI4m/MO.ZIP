import CommentItem from 'components/CommentItem'
import FavoriteItem from 'components/FavoriteItem'
import Pagination from 'components/Pagination/assets'
import { boardMock, commentListMock, favoriteListMock } from 'mocks'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Board, CommentListItem, FavoriteListItem } from 'types/interface'
import './style.css'
import defaultProfileImage from 'assets/image/default-profile-image.png'
import { useLoginUserStore } from 'stores'
import { useNavigate, useParams } from 'react-router-dom'
import { BOARD_PATH, BOARD_UPDATE_PATH, MAIN_PATH, USER_PATH } from 'constant'
import { getBoardRequest, increaseViewCountRequest } from 'apis'
import { ResponseDto } from 'apis/response'
import { GetBoardResponseDto, IncreaseViewCountResponseDto } from 'apis/response/board'

//          component: 게시물 Detail          //
export default function BoardDetail() {

  //          state: 게시물 번호 path variable 상태          //
  const {boardNum} = useParams();

  //          state: 로그인 유저 상태          //
  const {loginUser} = useLoginUserStore();



  //          function: navigetor           //
  const navigator = useNavigate();

  //          function: increaseViewCountResponse            //
  const increaseViewCountResponse = (responseBody: IncreaseViewCountResponseDto | ResponseDto |null) =>{
    if(!responseBody) return;
    const {code } = responseBody;
    if(code === 'NB') alert('존재하지 않는 게시물입니다.');
    if(code === 'DBE') alert('데이터베이스 오류입니다.');
  }

  //          component: 게시물 Detail 상단 컴포넌트          //
  const BoardDetailTop = () => {

  //          state: board 상태       //
  const [board, setBoard] = useState< Board | null >(null);

  //          state: morebutton 상태          //
  const[showmore, setShowmore] =useState<boolean>(false);

  //          state: 작성자 여부 상태          //
  const[isWriter, setWriter] =useState<boolean>(false);

  //          function: getBoardResponse 처리           //
  const getBoardResponse = (responseBody: GetBoardResponseDto | ResponseDto |null) => {
    if(!responseBody) return;
    const { code } = responseBody;
    if(code ==='NB') alert('존재하지 않는 게시물입니다.')
    if(code === 'DBE') alert('데이터베이스 오류입니다.'); 
    if(code !== 'SU'){
      navigator(MAIN_PATH());
      return;
    }
    const board: Board = { ...responseBody as GetBoardResponseDto }
    setBoard(board);

    if(!loginUser){
      setWriter(false);
      return;
    }
    const isWriter = loginUser.email ===board.writerEmail;
    setWriter(isWriter);
  }

  //          event handler: morebutton 클릭         //
  const onMoreButtonClickHandler = () => {
    setShowmore(!showmore);
  }

  //          event handler: 닉네임 클릭         //
  const onNicknameClickHandler = () => {
    if(!board) return;
    navigator(USER_PATH(board.writerEmail));
  }

  //          event handler: 수정 클릭         //
  const onUpdateButtonClickHandler = () => {
    if(!board || !loginUser) return;
    if(loginUser.email !== board.writerEmail) return;
    navigator(BOARD_PATH() + '/' + BOARD_UPDATE_PATH(board.boardNum));
  }

  //          event handler: 수정 클릭         //
  const onDeleteButtonClickHandler = () => {
    if(!board || !loginUser) return;
    if(loginUser.email !== board.writerEmail) return;
    // TODO: DELETE REQUSET
    navigator(BOARD_PATH());
  }

  //          effect: 게시물 번호 변경시 게시물 불러옴        //
  useEffect(()=> {
    if(!boardNum) {
      navigator(MAIN_PATH());
      return;
    }
    getBoardRequest(boardNum).then(getBoardResponse);
  }, [boardNum]);

  //          render: 게시물 상세 화면 상단 렌더링         //
    //if(!board) return <></>
    return(
    <div id='board-detail-top'>
      <div className='board-detail-top-header'>
        <div className='board-detail-title'>{board?.title}</div>
        <div className='board-detail-top-sub-box'>
          <div className='board-detail-write-info-box'>
            <div className='board-detail-writer-profile-image' style={{backgroundImage:`url(${board?.writerProfileImage ? board.writerProfileImage : defaultProfileImage})`}}></div>
            <div className='board-detail-writer-nickname' onClick={onNicknameClickHandler}>{board?.writerNickname}</div>
            <div className='board-detail-info-divider'>{'|'}</div>
            <div className='board-detail-write-date'>{board?.writeDatetime}</div>
          </div>
          { isWriter &&
          <div className='icon-button' onClick={onMoreButtonClickHandler}>
            <div className='icon more-icon'></div>
          </div>
          }
          { showmore &&
          <div className='board-detail-more-box'>
            <div className='board-detail-update-button' onClick={onUpdateButtonClickHandler}>{'수정'}</div>
            <div className='divider'></div>
            <div className='board-detail-delete-button' onClick={onDeleteButtonClickHandler}>{'삭제'}</div>
          </div>
          }
        </div>
      </div>
      <div className='divider'></div>
      <div className='board-detail-top-main'>
        <div className='board-detail-main-text'>{board?.content}</div>
        { board?.boardImageList.map((image , index) => 
        <img key={index} className='board-detail-main-image' src={image}/> )}
      </div>
    </div>
    )
  }


  //          component: 게시물 Detail 하단 컴포넌트         //
  const BoardDetailBottom = () => {

  //          state: 댓글 textarea 참조 상태       //
  const commentRef = useRef<HTMLTextAreaElement | null>(null);


  //          state: 좋아요 리스트 상태          //
  const [favoirteList, setFavoiriteList] = useState<FavoriteListItem[]>([]);
  //          state: 댓글 리스트 상태          //
  const [commentList, setCommentList] = useState<CommentListItem[]>([]);
  //          state: 좋아요 상태          //
  const [isFavoirte, setFavoirite] = useState<boolean>(false);
  //          state: 댓글 상태          //
  const [comment, setComment] = useState<string>("");
  //          state: 좋아요 리스트 보기 상태          //
  const [showFavoirte, setShowFavoirite] = useState<boolean>(false);
  //          state: 댓글 리스트 보기 상태          //
  const [showComment, setShowComment] = useState<boolean>(false);

  //          event handler:좋아요 클릭       //
  const onFavoriteClickHandler = () =>{
    setFavoirite(!isFavoirte)
  }

  //          event handler:좋아요 클릭       //
  const onShowFavoriteClickHandler = () =>{
    setShowFavoirite(!showFavoirte)
  }

  //          event handler:좋아요 클릭       //
  const onShowCommentClickHandler = () =>{
    setShowComment(!showComment)
  }

  //          event handler:댓글 작성 클릭       //
  const onCommentSubmitClickHandler = () =>{
    if(!comment) return;
  }

  //          event handler:댓글 변경       //
  const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) =>{
    const{ value } = event.target;
    setComment(value);
    if(!commentRef.current) return;
    commentRef.current.style.height = 'auto';
    commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;

  }

  //          effect: 게시물 번호 변경시 댓글 좋아요 불러옴        //
    useEffect(()=> {
      setFavoiriteList(favoriteListMock);
      setCommentList(commentListMock);
    },[boardNum]);

  //          render: 게시물 상세 화면 하단 렌더링         //
  return(
    <div id='board-detail-bottom'>
      <div className='board-detail-bottom-box'>
        <div className='board-detail-bottom-button-group'>
          <div className='icon-button' onClick={onFavoriteClickHandler}>
            { isFavoirte ? 
            <div className='icon heart-fill-icon'></div> :
            <div className='icon heart-light-icon'></div>
            }
          </div>
          <div className='board-detail-bottom-button-text'>{`관심있어요 ${favoirteList.length}`}</div>
          <div className='icon-button' onClick={onShowFavoriteClickHandler}>
          { showFavoirte ?
            <div className='icon expand-up-light-icon'></div> :
            <div className='icon expand-down-light-icon'></div>
          }
          </div>
        </div>
        <div className='board-detail-bottom-button-group'>
          <div className='icon-button'>
            <div className='icon comment-icon'></div>
          </div>
          <div className='board-detail-bottom-button-text'>{`댓글 ${commentList.length}`}</div>
          <div className='icon-button' onClick={onShowCommentClickHandler}>
          { showComment ?
            <div className='icon expand-up-light-icon'></div>:
            <div className='icon expand-down-light-icon'></div>
          }
          </div>
        </div>
      </div>
      { showFavoirte &&
      <div className='board-detail-bottom-heart-box'>
        <div className='board-detail-bottom-heart-container'>
          <div className='board-detail-bottom-heart-title'>{'관심있어요 '}<span className='emphasis'>{commentList.length}</span></div>
          <div className='board-detail-bottom-heart-contents'>
            {favoirteList.map(item => <FavoriteItem key={item.email} favoriteListItem={item} />)}
          </div>
        </div>
      </div>
      }
      { showComment &&
      <div className='board-detail-bottom-comment-box'>
        <div className='board-detail-bottom-comment-container'>
          <div className='board-detail-bottom-comment-title'>{'댓글 '}<span className='emphasis'>{12}</span></div>
          <div className='board-detail-bottom-comment-list-container'>
            {commentList.map(item => <CommentItem key={item.nickname} commentListItem={item} />)}
          </div>
        </div>
        <div className='divider'></div>
        <div className='board-detail-bottom-comment-pagination-box'>
          <Pagination />
        </div>
        <div className='board-detail-bottom-comment-input-box'>
          <div className='board-detail-bottom-comment-input-container'>
            <textarea ref={commentRef} className='board-detail-bottom-comment-textarea' placeholder='댓글을 작성해주세요.' value={comment} onChange={onCommentChangeHandler} />
            <div className='board-detail-bottom-comment-button-box'>
              <div className={ comment === '' ? 'disable-button' : 'black-button'} onClick={onCommentSubmitClickHandler}>{'댓글달기'}</div>
            </div>
          </div>
        </div>
      </div>
  }
    </div>
  )
  }


//          effect: 게시물 번호 path variable 변경시 게시물 조회수 증가          //
let effectFlag = true;

useEffect(()=>{
  if(!boardNum) return;
  if(effectFlag){
    effectFlag = false;
    return;
  }

  increaseViewCountRequest(boardNum).then(increaseViewCountResponse)

}, [boardNum])

//          render: 게시물 Detail            //
  return (
    <div id ='board-detail-wrapper'>
      <div className='board-detail-container'>
        <BoardDetailTop />
        <BoardDetailBottom />
      </div>
    </div>
  )
}
