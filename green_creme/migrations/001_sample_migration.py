steps = [
    [
        #"Up" SQL statement
        """
        CREATE TABLE forum (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(200) NOT NULL,
            body TEXT NOT NULL,
            image VARCHAR(250),
            tag VARCHAR(250),
            created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            author_id INTEGER
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE forum;
        """
    ],
]
