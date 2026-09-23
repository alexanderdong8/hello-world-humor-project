-- Run once in the Supabase SQL Editor to create and seed the table.

create table if not exists public.jokes (
  id bigint generated always as identity primary key,
  setup text not null,
  punchline text not null,
  category text,
  created_at timestamptz not null default now()
);

-- The app reads with the anon key, so allow public read-only access.
alter table public.jokes enable row level security;

drop policy if exists "Jokes are readable by everyone" on public.jokes;
create policy "Jokes are readable by everyone"
  on public.jokes for select
  to anon, authenticated
  using (true);

insert into public.jokes (setup, punchline, category) values
  ('Why don''t scientists trust atoms?', 'Because they make up everything.', 'Science'),
  ('Why did the scarecrow win an award?', 'He was outstanding in his field.', 'Puns'),
  ('What do you call a fake noodle?', 'An impasta.', 'Food'),
  ('Why do programmers prefer dark mode?', 'Because light attracts bugs.', 'Tech'),
  ('How does the moon cut his hair?', 'Eclipse it.', 'Space'),
  ('Why did the math book look so sad?', 'It had too many problems.', 'School'),
  ('What do you call a bear with no teeth?', 'A gummy bear.', 'Animals'),
  ('Why can''t you trust stairs?', 'They''re always up to something.', 'Puns');
