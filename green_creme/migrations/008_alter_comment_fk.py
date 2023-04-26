steps = [
    [
        """
        ALTER TABLE comment
        DROP CONSTRAINT comment_blog_id_fkey,
        ADD constraint comment_blog_fk
        FOREIGN KEY (blog_id) REFERENCES blog (id)
        ON DELETE CASCADE;
        """,
        """
        ALTER TABLE comment
        DROP CONSTRAINT comment_accounts_id_fkey,
        ADD constraint comment_author_fk
        FOREIGN KEY (author_id) REFERENCES accounts (id)
        ON DELETE CASCADE;
        """,
    ]
]
