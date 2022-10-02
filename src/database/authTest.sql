--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--
--CREATE DATABASE users_test;
--CREATE DATABASE users;

CREATE TABLE users_test(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR ( 50 ) NOT NULL,
    user_email VARCHAR ( 255 ) UNIQUE NOT NULL,
    user_password VARCHAR NOT NULL,
--    is_active BOOLEAN NOT NULL,
--    created_on TIMESTAMP NOT NULL,
--    last_login TIMESTAMP
)

SELECT * FROM users_test;

INSERT INTO users_test(user_name, user_email, user_password) VALUES ("Bob", "bob@mail.com", "bob");

--psql -U postgres   (Run postgres)
--\c users_test       (Connect with DATABASE)
--\dt                (Show row in DATABASE)
--heroku pg:psql     (?)