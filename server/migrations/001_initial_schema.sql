-- Migration: 001_initial_schema.sql
-- Description: Initial database schema with bank_user and tokens tables
-- Date: 2024-01-31

-- Create bank_user table for storing user account information
CREATE TABLE IF NOT EXISTS bank_user(
  userid BIGSERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(32) NOT NULL,
  last_name VARCHAR(32) NOT NULL,
  email VARCHAR(32) NOT NULL,
  password VARCHAR(255) NOT NULL,
  unique(email)
);

-- Create tokens table for storing authentication tokens
CREATE TABLE IF NOT EXISTS TOKENS(
  id BIGSERIAL PRIMARY KEY NOT NULL,
  access_token VARCHAR(500) NOT NULL,
  userid BIGSERIAL NOT NULL,
  FOREIGN KEY(userid) REFERENCES bank_user(userid) ON DELETE CASCADE
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_bank_user_email ON bank_user(email);

-- Create index on userid in tokens table for faster token lookups
CREATE INDEX IF NOT EXISTS idx_tokens_userid ON TOKENS(userid);

-- Create index on access_token for faster authentication
CREATE INDEX IF NOT EXISTS idx_tokens_access_token ON TOKENS(access_token);
