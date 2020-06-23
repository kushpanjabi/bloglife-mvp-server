-- CREATE DATABASE blogstack;

-- \c blogstack

CREATE TABLE blog(
    blog_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);