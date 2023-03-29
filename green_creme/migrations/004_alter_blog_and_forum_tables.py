steps = [
    [
        """
        ALTER TABLE forum
        ADD COLUMN author_id INT NOT NULL REFERENCES accounts (id),
        ADD CONSTRAINT forum_author_fk
        FOREIGN KEY (author_id) REFERENCES accounts (id)
        ON DELETE CASCADE;
        """,
        """
        DROP CONSTRAINT forum_author_fk
        DROP table forum;
        """,
    ],
    [
        """
        ALTER TABLE blog
        ADD COLUMN author_id INT NOT NULL REFERENCES accounts (id),
        ADD CONSTRAINT blog_author_fk
        FOREIGN KEY (author_id) REFERENCES accounts (id)
        ON DELETE CASCADE;
        """,
        """
        DROP CONSTRAINT blog_author_fk
        DROP table blog;
        """,
    ],
]
