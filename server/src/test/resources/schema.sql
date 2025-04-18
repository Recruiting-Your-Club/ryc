DROP TABLE IF EXISTS club_tags;
DROP TABLE IF EXISTS clubs;

CREATE TABLE clubs
(
    id            VARCHAR(36) PRIMARY KEY,
    name          VARCHAR(255) UNIQUE NOT NULL,
    description   TEXT,
    image_url     VARCHAR(500),
    thumbnail_url VARCHAR(500),
    category      VARCHAR(50),
    deleted       BOOLEAN,
    created_at    DATETIME,
    updated_at    DATETIME
);

CREATE TABLE club_tags
(
    id      VARCHAR(36) PRIMARY KEY,
    name    VARCHAR(255),
    club_id VARCHAR(36),
    FOREIGN KEY (club_id) REFERENCES clubs (id)
);