import React from 'react';
import './App.css';
import BoardItem from 'components/BoardItem';
import { commentListMock, favoriteListMock, latestBoardListMock, top3BoardListMock } from 'mocks';
import Top3Item from 'components/Top3Item';
import CommentItem from 'components/CommentItem';
import FavoriteItem from 'components/FavoriteItem';
import InputBox from 'components/InputBox';

function App() {
  return (
    <>
    {/* 보드리스트테스트 */}
      {/* {latestBoardListMock.map(BoardListItem => <BoardItem boardListItem={BoardListItem} />)} */}


    {/* 탑3테스트 */}
      {/* <div style={{ display: 'flex' , justifyContent: 'center', gap: '25px'}}>
        {top3BoardListMock.map(top3ListItem => <Top3Item top3ListItem={top3ListItem}/>)}
      </div> */}

      {/* 코멘트아이템테스트 */}
      {/* <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px'}}>
        {commentListMock.map(commentListItem => <CommentItem commentListItem={commentListItem}/>)}
      </div> */}

      {/* favoriteListItem테스트 */}
      {/* <div style={{ display: 'flex',columnGap:'30px', gap: '20px'}}>
        {favoriteListMock.map(favoriteListItem => <FavoriteItem favoriteListItem={favoriteListItem}/>)}
      </div> */}

      {/* 인풋박스테스트 */}
      <InputBox />
    </>
  );
}

export default App;
