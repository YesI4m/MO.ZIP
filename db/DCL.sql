-- Active: 1731089536790@@127.0.0.1@3306@board
CREATE USER 'developer'@'%' IDENTIFIED BY 'P@ssw0rd';
GRANT SELECT, UPDATE, DELETE, INSERT
ON board.*
TO 'developer'@'%'
