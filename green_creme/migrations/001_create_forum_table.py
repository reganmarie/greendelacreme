steps = [
    [
        """
        Create table forum (
            id serial primary key not null,
            title varchar(150) not null,
            body text not null,
            image varchar(400),
            created_on timestamp not null default current_timestamp
        );
        """,
        """
        DROP table forum;
        """,
    ]
]
