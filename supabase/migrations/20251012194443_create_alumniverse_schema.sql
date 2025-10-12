/*
  # AlumniVerse Database Schema
  
  ## Overview
  Complete database schema for the AlumniVerse platform - a university yearbook and alumni portal
  connecting students, alumni, and fostering community engagement.
  
  ## New Tables
  
  ### 1. profiles
  Extended user profiles for alumni and students
  - `id` (uuid, FK to auth.users)
  - `email` (text)
  - `full_name` (text)
  - `batch_year` (integer) - graduation year
  - `department` (text)
  - `current_company` (text)
  - `job_title` (text)
  - `location` (text)
  - `country` (text)
  - `bio` (text)
  - `profile_image_url` (text)
  - `linkedin_url` (text)
  - `is_mentor` (boolean)
  - `skills` (text array)
  - `user_type` (text) - 'alumni' or 'student'
  - `roll_number` (text) - for verification
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 2. memories
  Yearbook photos and nostalgia content
  - `id` (uuid, PK)
  - `title` (text)
  - `description` (text)
  - `image_url` (text)
  - `year` (integer)
  - `event_type` (text) - 'fest', 'graduation', 'sports', etc.
  - `uploaded_by` (uuid, FK to profiles)
  - `likes_count` (integer)
  - `created_at` (timestamptz)
  
  ### 3. events
  Alumni events and reunions
  - `id` (uuid, PK)
  - `title` (text)
  - `description` (text)
  - `event_date` (timestamptz)
  - `location` (text)
  - `event_type` (text) - 'reunion', 'networking', 'workshop'
  - `image_url` (text)
  - `max_attendees` (integer)
  - `rsvp_count` (integer)
  - `is_past` (boolean)
  - `created_by` (uuid, FK to profiles)
  - `created_at` (timestamptz)
  
  ### 4. event_rsvps
  Track event registrations
  - `id` (uuid, PK)
  - `event_id` (uuid, FK to events)
  - `user_id` (uuid, FK to profiles)
  - `status` (text) - 'attending', 'maybe', 'declined'
  - `created_at` (timestamptz)
  
  ### 5. jobs
  Job postings by alumni
  - `id` (uuid, PK)
  - `title` (text)
  - `company` (text)
  - `description` (text)
  - `location` (text)
  - `job_type` (text) - 'full-time', 'part-time', 'internship'
  - `domain` (text)
  - `skills_required` (text array)
  - `apply_url` (text)
  - `posted_by` (uuid, FK to profiles)
  - `is_featured` (boolean)
  - `created_at` (timestamptz)
  - `expires_at` (timestamptz)
  
  ### 6. stories
  Alumni success stories and blog posts
  - `id` (uuid, PK)
  - `title` (text)
  - `content` (text)
  - `excerpt` (text)
  - `cover_image_url` (text)
  - `author_id` (uuid, FK to profiles)
  - `tags` (text array)
  - `is_featured` (boolean)
  - `views_count` (integer)
  - `created_at` (timestamptz)
  - `published_at` (timestamptz)
  
  ### 7. mentorship_sessions
  Mentorship booking and tracking
  - `id` (uuid, PK)
  - `mentor_id` (uuid, FK to profiles)
  - `mentee_id` (uuid, FK to profiles)
  - `session_date` (timestamptz)
  - `duration_minutes` (integer)
  - `topic` (text)
  - `status` (text) - 'pending', 'confirmed', 'completed', 'cancelled'
  - `notes` (text)
  - `created_at` (timestamptz)
  
  ### 8. platform_stats
  Real-time statistics for homepage counter
  - `id` (uuid, PK)
  - `total_alumni` (integer)
  - `total_countries` (integer)
  - `total_events` (integer)
  - `total_jobs` (integer)
  - `updated_at` (timestamptz)
  
  ## Security
  
  All tables have Row Level Security (RLS) enabled with appropriate policies:
  - Public read access for most content (directory, events, jobs, stories)
  - Authenticated users can create content
  - Users can only update/delete their own content
  - Proper ownership checks on all operations
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  batch_year integer,
  department text,
  current_company text,
  job_title text,
  location text,
  country text DEFAULT 'India',
  bio text,
  profile_image_url text,
  linkedin_url text,
  is_mentor boolean DEFAULT false,
  skills text[] DEFAULT '{}',
  user_type text NOT NULL CHECK (user_type IN ('alumni', 'student')),
  roll_number text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create memories table
CREATE TABLE IF NOT EXISTS memories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  year integer NOT NULL,
  event_type text NOT NULL,
  uploaded_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  likes_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Memories are viewable by everyone"
  ON memories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create memories"
  ON memories FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Users can update own memories"
  ON memories FOR UPDATE
  TO authenticated
  USING (auth.uid() = uploaded_by)
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Users can delete own memories"
  ON memories FOR DELETE
  TO authenticated
  USING (auth.uid() = uploaded_by);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  event_date timestamptz NOT NULL,
  location text NOT NULL,
  event_type text NOT NULL,
  image_url text,
  max_attendees integer,
  rsvp_count integer DEFAULT 0,
  is_past boolean DEFAULT false,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Event creators can update their events"
  ON events FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Event creators can delete their events"
  ON events FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Create event_rsvps table
CREATE TABLE IF NOT EXISTS event_rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL CHECK (status IN ('attending', 'maybe', 'declined')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);

ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "RSVPs are viewable by everyone"
  ON event_rsvps FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create own RSVP"
  ON event_rsvps FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own RSVP"
  ON event_rsvps FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own RSVP"
  ON event_rsvps FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  job_type text NOT NULL CHECK (job_type IN ('full-time', 'part-time', 'internship', 'contract')),
  domain text NOT NULL,
  skills_required text[] DEFAULT '{}',
  apply_url text NOT NULL,
  posted_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Jobs are viewable by everyone"
  ON jobs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create jobs"
  ON jobs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = posted_by);

CREATE POLICY "Job posters can update their jobs"
  ON jobs FOR UPDATE
  TO authenticated
  USING (auth.uid() = posted_by)
  WITH CHECK (auth.uid() = posted_by);

CREATE POLICY "Job posters can delete their jobs"
  ON jobs FOR DELETE
  TO authenticated
  USING (auth.uid() = posted_by);

-- Create stories table
CREATE TABLE IF NOT EXISTS stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text NOT NULL,
  cover_image_url text,
  author_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  tags text[] DEFAULT '{}',
  is_featured boolean DEFAULT false,
  views_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  published_at timestamptz DEFAULT now()
);

ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Stories are viewable by everyone"
  ON stories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create stories"
  ON stories FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Story authors can update their stories"
  ON stories FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Story authors can delete their stories"
  ON stories FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Create mentorship_sessions table
CREATE TABLE IF NOT EXISTS mentorship_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  mentee_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  session_date timestamptz NOT NULL,
  duration_minutes integer DEFAULT 60,
  topic text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mentorship_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own sessions"
  ON mentorship_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = mentor_id OR auth.uid() = mentee_id);

CREATE POLICY "Users can create session requests"
  ON mentorship_sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = mentee_id);

CREATE POLICY "Mentors and mentees can update sessions"
  ON mentorship_sessions FOR UPDATE
  TO authenticated
  USING (auth.uid() = mentor_id OR auth.uid() = mentee_id)
  WITH CHECK (auth.uid() = mentor_id OR auth.uid() = mentee_id);

-- Create platform_stats table
CREATE TABLE IF NOT EXISTS platform_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  total_alumni integer DEFAULT 0,
  total_countries integer DEFAULT 0,
  total_events integer DEFAULT 0,
  total_jobs integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE platform_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Stats are viewable by everyone"
  ON platform_stats FOR SELECT
  TO authenticated
  USING (true);

-- Insert initial stats record
INSERT INTO platform_stats (total_alumni, total_countries, total_events, total_jobs)
VALUES (0, 0, 0, 0)
ON CONFLICT DO NOTHING;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_batch_year ON profiles(batch_year);
CREATE INDEX IF NOT EXISTS idx_profiles_department ON profiles(department);
CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON profiles(user_type);
CREATE INDEX IF NOT EXISTS idx_profiles_is_mentor ON profiles(is_mentor);
CREATE INDEX IF NOT EXISTS idx_memories_year ON memories(year);
CREATE INDEX IF NOT EXISTS idx_events_event_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_is_past ON events(is_past);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_is_featured ON jobs(is_featured);
CREATE INDEX IF NOT EXISTS idx_stories_published_at ON stories(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_stories_is_featured ON stories(is_featured);