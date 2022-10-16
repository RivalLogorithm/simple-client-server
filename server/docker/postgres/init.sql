CREATE DATABASE server_data;
CREATE USER student WITH encrypted password 'qwerty';
GRANT ALL PRIVILEGES ON SCHEMA public TO student;