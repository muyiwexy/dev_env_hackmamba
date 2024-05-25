CREATE TABLE user_details (
    member_number VARCHAR(10) PRIMARY KEY,
    created_at VARCHAR,
    name VARCHAR(100),
    email VARCHAR(255),
    phone_number VARCHAR(15),
    gender VARCHAR(10),
    zone VARCHAR(50),
    service_unit VARCHAR(100),
    conference_shirt VARCHAR(5),
    fee_payment VARCHAR(20),
    paid BOOLEAN
);