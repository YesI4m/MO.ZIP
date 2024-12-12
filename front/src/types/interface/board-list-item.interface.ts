export default interface BoardListItem {
    boardNum : number;
    title : string;
    content : string;
    boardTitleImage : string | null;
    heartCount : number;
    commentCount : number;
    viewCount : number;
    writeDatetime : string;
    writerNickname : string;
    writerProfileImage : string | null;
}