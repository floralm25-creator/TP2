create table personajes_creados (
  id          uuid primary key default gen_random_uuid(),
  autor_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  nombre      text not null check (char_length(nombre) between 2 and 50),
  especie     text not null check (char_length(especie) between 2 and 50),
  estado      text,
  genero      text,
  origen      text,
  imagen      text,
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

  -- Le da permiso de UPDATE solo a los dueños del personaje
CREATE POLICY "Permitir editar a los creadores"
ON personajes_creados
FOR UPDATE
USING (auth.uid() = autor_id);

CREATE POLICY "Permitir subir imagenes"
ON storage.objects 
FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'imagenes_personajes');

-- Activación obligatoria del "En vivo" (Opción A) para esta tabla
alter publication supabase_realtime add table personajes_creados;