create table if not exists site_settings (
  key text primary key,
  value text not null
);

create table if not exists categories (
  id serial primary key,
  name text not null,
  slug text not null unique,
  description text not null default '',
  image_url text not null default '',
  visible boolean not null default true,
  sort_order integer not null default 0
);

create table if not exists products (
  id serial primary key,
  name text not null,
  description text not null default '',
  price integer not null,
  special_price integer,
  image_url text not null default '',
  extra_images text not null default '[]',
  category_id integer references categories(id) on delete set null,
  available boolean not null default true,
  featured boolean not null default false,
  visible boolean not null default true,
  tags text not null default '',
  ordering_notes text not null default '',
  sort_order integer not null default 0
);

create table if not exists homepage_sections (
  id serial primary key,
  key text not null unique,
  enabled boolean not null default true,
  title text not null default '',
  description text not null default '',
  image_url text not null default '',
  button_text text not null default '',
  button_link text not null default '',
  extra text not null default '{}',
  sort_order integer not null default 0
);

create index if not exists products_category_id_idx on products (category_id);
create index if not exists products_sort_idx on products (sort_order, id);
create index if not exists categories_sort_idx on categories (sort_order, id);
create index if not exists homepage_sections_sort_idx on homepage_sections (sort_order, id);
