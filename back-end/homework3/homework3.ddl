CREATE TABLE hw3_contents (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    content TEXT,
    author VARCHAR(20) NOT NULL,
    password VARCHAR(4),
    view_cnt BIGINT DEFAULT 0,
    UNIQUE KEY(id)
);
