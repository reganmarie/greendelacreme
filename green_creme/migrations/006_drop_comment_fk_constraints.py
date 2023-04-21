steps = [
    [
        """
        ALTER TABLE comment
        DROP CONSTRAINT comment_blog_fk;
        """,
        """
        ALTER TABLE comment
        DROP CONSTRAINT comment_author_fk;
        """,
    ]
]
