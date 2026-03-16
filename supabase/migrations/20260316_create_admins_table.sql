-- SQL Migration: Multi-User Admin Support
-- Run this in the Supabase SQL Editor

-- Create the admins table
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Create policy to allow the service role (administrative access) to manage all rows
-- No public access is allowed to this table
CREATE POLICY "Service Role Full Access" ON public.admins
    USING (auth.jwt() ->> 'role' = 'service_role')
    WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

-- Note: Password hashing should be done application-side before storage.
