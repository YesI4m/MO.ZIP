export default interface Board{

    boardNum : number;
    title : string;
    content : string;
    boardImageList : string[];
    writeDatetime : string;
    writerEmail : string;
    writerNickname : string;
    writerProfileImage : string | null;

}
