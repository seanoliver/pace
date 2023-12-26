-- Create custom types
CREATE TYPE status AS ENUM ('todo', 'doing', 'done');

-- Profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users,
  username text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc' :: text, now()),
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc' :: text, now())
);

-- Tasks table
CREATE TABLE tasks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  notes text,
  duration integer CHECK (duration > 0),
  completed_at timestamp with time zone,
  status status NOT NULL DEFAULT 'todo',
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc' :: text, now()),
  updated_at timestamp with time zone
);

CREATE INDEX ON tasks(user_id);

-- Headings table
CREATE TABLE headings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc' :: text, now()),
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc' :: text, now())
);

CREATE INDEX ON headings(user_id);

-- Areas table
CREATE TABLE areas (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc' :: text, now()),
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc' :: text, now())
);

CREATE INDEX ON areas(user_id);

-- Tasks and Headings association table
CREATE TABLE tasks_headings (
  task_id uuid NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  heading_id uuid NOT NULL REFERENCES headings(id) ON DELETE CASCADE,
  PRIMARY KEY (task_id, heading_id)
);

-- Tasks and Areas association table
CREATE TABLE tasks_areas (
  task_id uuid NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  area_id uuid NOT NULL REFERENCES areas(id) ON DELETE CASCADE,
  PRIMARY KEY (task_id, area_id)
);

-- Areas and Headings association table
CREATE TABLE areas_headings (
  area_id uuid NOT NULL REFERENCES areas(id) ON DELETE CASCADE,
  heading_id uuid NOT NULL REFERENCES headings(id) ON DELETE CASCADE,
  PRIMARY KEY (area_id, heading_id)
);

-- Enable Row Level Security
ALTER TABLE
  profiles ENABLE ROW LEVEL SECURITY;

ALTER TABLE
  tasks ENABLE ROW LEVEL SECURITY;

ALTER TABLE
  headings ENABLE ROW LEVEL SECURITY;

ALTER TABLE
  areas ENABLE ROW LEVEL SECURITY;

ALTER TABLE
  tasks_headings ENABLE ROW LEVEL SECURITY;

ALTER TABLE
  tasks_areas ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can only access their own profiles" ON profiles FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can only access their own tasks" ON tasks FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own headings" ON headings FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own areas" ON areas FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own tasks_headings" ON tasks_headings FOR ALL USING (
  auth.uid() = (
    SELECT
      user_id
    FROM
      tasks
    WHERE
      id = task_id
  )
);

CREATE POLICY "Users can only access their own tasks_areas" ON tasks_areas FOR ALL USING (
  auth.uid() = (
    SELECT
      user_id
    FROM
      tasks
    WHERE
      id = task_id
  )
);

CREATE POLICY "Users can only access their own areas_headings" ON areas_headings FOR ALL USING (
  auth.uid() = (
    SELECT
      user_id
    FROM
      areas
    WHERE
      id = area_id
  )
);

-- Timestamp update triggers
CREATE
OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER AS $ $ BEGIN NEW.updated_at = NOW();

RETURN NEW;

END;

$ $ LANGUAGE plpgsql;

CREATE TRIGGER update_profile_timestamp BEFORE
UPDATE
  ON profiles FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_task_timestamp BEFORE
UPDATE
  ON tasks FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_heading_timestamp BEFORE
UPDATE
  ON headings FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_area_timestamp BEFORE
UPDATE
  ON areas FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Create a function that will be triggered upon user creation
CREATE
OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
SET
  search_path = public AS $ $ BEGIN -- Insert a new profile with the username set to the email alias
INSERT INTO
  public.profiles (id, username, created_at, updated_at)
VALUES
  (
    NEW.id,
    split_part(NEW.email, '@', 1),
    NOW(),
    NOW()
  );

RETURN NEW;

END;

$ $;

-- Create a trigger on the auth.users table
CREATE TRIGGER on_auth_user_created
AFTER
INSERT
  ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();