-- Active: 1731089536790@@127.0.0.1@3306@board

-- table 확인용
select * FROM board;
select * FROM comment;
select * FROM heart;
select * FROM image;
select * FROM search_log;
select * FROM `user`;
-- auto_increment 초기화용
ALTER Table board AUTO_INCREMENT = 0;

-- 회원가입
INSERT INTO user VALUES ('email1@email.com','password','nickname','01012341234','서울특별시 서대문구','서대문도서관',NULL);

-- 로그인
SELECT * FROM user WHERE email = 'email1@email.com';

-- 글 작성
INSERT INTO board (title, content, datetime, like_count, comment_count, view_count, writer_email) VALUES ('제목','내용','2024-11-09 02:24',0 ,0 ,0, 'email1@email.com');
-- 이미지 추가
INSERT INTO image VALUES (,'url');


-- 댓글 작성
INSERT INTO comment (content, board_num, user_email, datetime) VALUES ('댓글 1', 1, 'email1@email.com', '2024-11-09 03:35');
UPDATE board SET comment_count = comment_count + 1 WHERE board_num = 1;

-- 좋아요
INSERT INTO heart VALUES ('email1@email.com', 1);
UPDATE board SET like_count = like_count + 1 WHERE board_num = 1;
-- 좋아요 취소
DELETE FROM heart WHERE user_email = 'email1@email.com' AND board_num = 1;
UPDATE board SET like_count = like_count - 1 WHERE board_num = 1;

-- 게시물 수정
UPDATE board SET title = '수정 제목1', content = '수정 내용1' WHERE board_num = 1;
DELETE FROM image FROM board_num = 1;
INSERT INTO image VALUES (1, 'url');

-- 게시물 삭제
DELETE FROM comment WHERE board_num = 1;
DELETE FROM heart WHERE board_number = 1;
DELETE FROM board WHERE board_num = 1;

-- 게시물 보기(클릭시)
SELECT 
    B.board_num AS boardNum,
    B.title AS title,
    B.content AS content,
    B.datetime AS writeDatetime,
    B.like_count AS likeCount,
    B.comment_count AS commentCount,
    B.view_count AS viewCount,
    B.writer_email AS writerEmail,
    U.nickname AS writerNickname,
    U.profile_image AS writerProfileImage
FROM board AS B
INNER JOIN user AS U
ON B.writer_email = U.email WHERE board_num = 1;
SELECT image FROM image WHERE board_num = 1;

-- 게시물 댓글, 좋아요
SELECT
    U.email AS email,
    U.nickname AS nickname,
    U.profile_image
FROM heart AS H
INNER JOIN user AS U
ON H.user_email = U.email
WHERE H.board_num = 1;

SELECT 
    U.nickname AS nickname,
    U.profile_image AS profile_image,
    C.datetime AS datetime,
    C.content AS content
FROM comment AS C
INNER JOIN user AS U
ON C.user_email = U.email
WHERE C.board_num = 1
ORDER BY datetime DESC;

-- 신규 게시물 불러오기 (무한스크롤 추가해야함 어케하는진 모름)
-- 중복되는 부분이 많아서 테이블을 만들어버림

-- SELECT 
--     B.board_num AS board_num,
--     B.title AS title,
--     B.content AS content,
--     B.datetime AS datetime,
--     I.image AS title_image,
--     B.like_count AS like_count,
--     B.comment_count AS comment_count,
--     B.view_count AS view_count,
--     U.nickname AS nickname,
--     U.profile_image AS profile_image
-- FROM board AS B
-- INNER JOIN user AS U
-- ON B.writer_email = U.email
-- LEFT JOIN (SELECT board_num, ANY_VALUE(image) AS image FROM image GROUP BY board_num) AS I
-- ON B.board_num = I.board_num

SELECT * FROM board_list_view
ORDER BY datetime
LIMIT 0, 5;

-- 검색어리스트
SELECT * FROM board_list_view
WHERE title LIKE '%제목%' OR content LIKE '%제목%'
ORDER BY datetime;

-- hot게시물
SELECT * FROM board_list_view
WHERE datetime BETWEEN '2023-11-09 04:24' AND '2024-11-09 04:24'
ORDER BY like_count DESC, comment_count DESC, view_count DESC, datetime DESC
LIMIT 5;

-- 유저게시물 가져오기
SELECT * FROM board_list_view
WHERE email = 'email1@email.com'
ORDER BY datetime DESC;

-- 인기검색어
SELECT search_word, count(search_word) AS count
FROM search_log
WHERE relation IS FALSE
GROUP BY search_word
ORDER BY COUNT DESC
LIMIT 15;

-- 관련검색어
SELECT relation_word, count(relation_word) AS count
FROM search_log
WHERE search_word ='검색어'
GROUP BY relation_word 
ORDER BY COUNT DESC
LIMIT 15;

-- 유저정보가져오기
SELECT *
FROM user
WHERE email = 'email1@email.com';

-- 닉네임 수정
UPDATE user SET nickname = '수정 닉네임' WHERE email = 'email1@email.com';

-- 프사 수정
UPDATE user SET profile_image = '수정 이미지' WHERE email = 'email1@email.com';