steps = [
    [
        """
        CREATE table comment (
            id serial primary key not null,
            author_id int not null references accounts (id),
            blog_id int not null references blog (id),
            response text not null,
            image varchar(400),
            created_on timestamp not null default current_timestamp,
            constraint comment_author_fk
                foreign key (author_id) references accounts (id)
                on delete cascade,
            constraint comment_blog_fk
                foreign key (blog_id) references blog (id)
                on delete cascade
        );
        """,
        """
        DROP table comment;
        """,
    ]
]
