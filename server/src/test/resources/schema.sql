CREATE TABLE admins
(
    id varchar(255) NOT NULL,
    name varchar(255),
    password varchar(255),
    email varchar(255) UNIQUE,
    admin_default_role varchar(50),
    image_url varchar(255),
    thumbnail_url varchar(255),
    created_at datetime(6),
    updated_at datetime(6),
    deleted BOOLEAN,
    PRIMARY KEY (id)
);

CREATE TABLE clubs
(
    id varchar(255) NOT NULL,
    name varchar(255) UNIQUE,
    short_description varchar(255),
    detail_description TEXT,
    image_url varchar(255),
    thumbnail_url varchar(255),
    category enum('ACADEMIC','CULTURE','PERFORMANCE_ARTS','RELIGION','SPORTS','VOLUNTEER'),
    created_at datetime(6),
    updated_at datetime(6),
    deleted BOOLEAN,
    PRIMARY KEY (id)
);

CREATE TABLE club_tags
(
    name varchar(255) NOT NULL,
    club_id varchar(255) NOT NULL,
    PRIMARY KEY (club_id, name),
    CONSTRAINT fk_club FOREIGN KEY (club_id)
        REFERENCES clubs (id)
        ON DELETE CASCADE
);