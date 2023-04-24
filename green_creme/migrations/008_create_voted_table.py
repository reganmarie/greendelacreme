steps = [
    [
        """
        CREATE table voted  (
            id serial primary key not null,
            ballot boolean not null default false,
            reply_id int not null references reply (id),
            author_id int not null references accounts (id),
            constraint voted_reply__fk
                foreign key (reply_id) references reply (id)
                on delete cascade,
            constraint voted_author_fk
                foreign key (author_id) references accounts (id)
                on delete cascade,
            constraint unique_vote
              unique (author_id, reply_id)
        );
        """,
        """
        DROP CONSTRAINT voted_reply_fk,
        DROP CONSTRAINT unique_vote
        DROP CONSTRAINT voted_author_fk,
        DROP table voted;
        """,
    ]
]
