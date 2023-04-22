steps = [
    [
        """
        CREATE table reply (
            id serial primary key not null,
            author_id int not null references accounts (id),
            forum_id int not null references forum (id),
            answer text not null,
            image varchar(400),
            rating smallint not null default 0,
            created_on timestamp not null default current_timestamp,
            constraint reply_author_fk
                foreign key (author_id) references accounts (id)
                on delete cascade,
            constraint reply_forum_fk
                foreign key (forum_id) references forum (id)
                on delete cascade
        );
        """,
        """
        DROP CONSTRAINT forum_author_fk,
        DROP CONSTRAINT reply_forum_fk,
        DROP table reply;
        """,
    ]
]
