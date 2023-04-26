steps = [
    [
        """
        CREATE table reply (
            id serial primary key not null,
            author_id int not null references accounts (id) on delete cascade,
            forum_id int not null references forum (id) on delete cascade,
            answer text not null,
            image varchar(400),
            rating int not null default 0,
            created_on timestamp not null default current_timestamp
        );
        """,
        """
        DROP table reply;
        """,
    ]
]
