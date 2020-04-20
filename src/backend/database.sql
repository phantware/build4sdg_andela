drop table logss;
create table logs
(
    id serial primary key,
    method text not null,
    url varchar(50) not null,
    status int not null,
    log_time int not null,
    created_at timestamp default now()
);

\dt+ logs;
table logs;