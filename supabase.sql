create table personajes_creados (
  id          uuid primary key default gen_random_uuid(),
  autor_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  nombre      text not null check (char_length(nombre) between 2 and 50),
  especie     text not null check (char_length(especie) between 2 and 50),
  creado_en   timestamptz not null default now()
);

alter table personajes_creados enable row level security;

create policy "los personajes los ve cualquiera con cuenta"
  on personajes_creados for select to authenticated
  using (true);

create policy "cada uno crea los suyos"
  on personajes_creados for insert to authenticated
  with check ((select auth.uid()) = autor_id);

create policy "cada uno borra los suyos"
  on personajes_creados for delete to authenticated
  using ((select auth.uid()) = autor_id);

-- Activación obligatoria del "En vivo" (Opción A) para esta tabla
alter publication supabase_realtime add table personajes_creados;