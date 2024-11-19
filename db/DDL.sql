-- Active: 1731089536790@@127.0.0.1@3306@board

CREATE TABLE board
(
  board_num     INT         NOT NULL AUTO_INCREMENT COMMENT '게시물 번호',
  title         TEXT        NOT NULL COMMENT '제목',
  content       TEXT        NOT NULL COMMENT '내용',
  datetime      DATETIME    NOT NULL COMMENT '작성날짜',
  like_count    INT         NOT NULL DEFAULT 0 COMMENT '좋아요수',
  comment_count INT         NOT NULL DEFAULT 0 COMMENT '댓글수',
  view_count    INT         NOT NULL DEFAULT 0 COMMENT '조회수', 
  writer_email  VARCHAR(30) NOT NULL COMMENT '이메일(작성자)',
  PRIMARY KEY (board_num)
) COMMENT 'board';

CREATE TABLE comment
(
  comment_num  INT         NOT NULL COMMENT '댓글 번호',
  content      TEXT        NOT NULL COMMENT '댓글 내용',
  board_num    INT         NOT NULL COMMENT '게시물 번호',
  user_email   VARCHAR(30) NOT NULL COMMENT '이메일',
  datetime     DATETIME    NOT NULL COMMENT '댓글작성날짜',
  PRIMARY KEY (comment_num)
) COMMENT 'comment';

CREATE TABLE image
(
  board_num INT  NOT NULL COMMENT '게시물 번호',
  image     TEXT NOT NULL COMMENT '이미지URL'
) COMMENT 'board - image';

CREATE TABLE heart
(
  user_email   VARCHAR(30) NOT NULL COMMENT '사용자이메일',
  board_num    INT         NOT NULL COMMENT '게시물 번호',
  PRIMARY KEY (user_email, board_num)
) COMMENT 'like';

CREATE TABLE search_log
(
  seq           INT     NOT NULL AUTO_INCREMENT COMMENT '번호',
  search_word   TEXT    NOT NULL COMMENT '검색어',
  relation_word TEXT    NULL     COMMENT '관련 검색어',
  relation      BOOLEAN NOT NULL COMMENT '관련검색어ox',
  PRIMARY KEY (seq)
) COMMENT 'search_log';

CREATE TABLE user
(
  email          VARCHAR(30)  NOT NULL COMMENT '이메일',
  password       VARCHAR(100) NOT NULL COMMENT '비밀번호',
  nickname       VARCHAR(20)  NOT NULL UNIQUE COMMENT '닉네임',
  phone_num      VARCHAR(15)  NOT NULL UNIQUE COMMENT '폰번호',
  address        TEXT         NOT NULL COMMENT '주소',
  address_detail TEXT         NULL     COMMENT '상세주소',
  profile_image  TEXT         NULL     COMMENT '프사',
  PRIMARY KEY (email)
) COMMENT 'user';

ALTER TABLE image
  ADD CONSTRAINT FK_board_TO_image
    FOREIGN KEY (board_num)
    REFERENCES board (board_num);

ALTER TABLE board
  ADD CONSTRAINT FK_user_TO_board
    FOREIGN KEY (writer_email)
    REFERENCES user (email);

ALTER TABLE heart
  ADD CONSTRAINT FK_user_TO_heart
    FOREIGN KEY (user_email)
    REFERENCES user (email);

ALTER TABLE heart
  ADD CONSTRAINT FK_board_TO_heart
    FOREIGN KEY (board_num)
    REFERENCES board (board_num);

ALTER TABLE comment
  ADD CONSTRAINT FK_board_TO_comment
    FOREIGN KEY (board_num)
    REFERENCES board (board_num);

ALTER TABLE comment
  ADD CONSTRAINT FK_user_TO_comment
    FOREIGN KEY (user_email)
    REFERENCES user (email);

CREATE View board_list_view AS
SELECT 
    B.board_num AS board_num,
    B.title AS title,
    B.content AS content,
    B.datetime AS datetime,
    I.image AS title_image,
    B.like_count AS like_count,
    B.comment_count AS comment_count,
    B.view_count AS view_count,
    B.writer_email AS email,
    U.nickname AS nickname,
    U.profile_image AS profile_image
FROM board AS B
INNER JOIN user AS U
ON B.writer_email = U.email
LEFT JOIN (SELECT board_num, ANY_VALUE(image) AS image FROM image GROUP BY board_num) AS I
ON B.board_num = I.board_num