CREATE TABLE IF NOT EXISTS public."operations"
(
    id bigserial primary key,
    operation_type character varying not null,
    first_num_system character varying not null,
    first_num character varying not null,
    second_num_system character varying not null,
    second_num character varying not null,
    result character varying not null,
    operations_date_time timestamp with time zone not null default now()
);