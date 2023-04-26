steps = [
    [
        """
        CREATE table likes (
            id SERIAL PRIMARY KEY NOT NULL,
            account_id INT NOT NULL REFERENCES accounts (id),
            blog_id INT NOT NULL REFERENCES blog (id) ON DELETE CASCADE,
            UNIQUE (account_id, blog_id)
        );
        """,
        """
        DROP table likes;
        """,
    ]
]
