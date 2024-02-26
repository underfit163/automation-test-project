insert into public.operations (operation_type, first_num_system, first_num, second_num_system, second_num, result)
values
    ('add', 'DEC', '123', 'DEC', '5', '128'),
    ('sub', 'HEX', 'DDC', 'HEX', '5', 'DD7'),
    ('mul', 'OCT', '14', 'HEX', '6', '110'),
    ('div', 'BIN', '11101', 'BIN', '11', '1001');