CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes int DEFAULT 0
);

insert into blogs (author, url, title)
values ('author1', 'www.sqlblog.com', 'SQL blog');

insert into blogs (author, url, title)
values ('author2', 'www.mongoblog.com', 'The MONGODB blog');