steps = [
    [
        """
        ALTER TABLE accounts
        ADD COLUMN role VARCHAR(100) NOT NULL DEFAULT 'member',
        ADD COLUMN city VARCHAR(150),
        ADD COLUMN state VARCHAR(150),
        ADD COLUMN profile_bg VARCHAR(400) DEFAULT '#83B582';
        """,
        """
        DROP table accounts;
        """,
    ],
    [
        """
        CREATE table friends (
            id SERIAL PRIMARY KEY NOT NULL,
            account_id INT NOT NULL REFERENCES accounts (id) ON DELETE CASCADE,
            friend_id INT NOT NULL REFERENCES accounts (id) ON DELETE CASCADE,
            status VARCHAR(100) NOT NULL DEFAULT 'pending',
            UNIQUE (account_id, friend_id)
        );
        """,
        """
        DROP table friends;
        """,
    ],
    [
        """
        CREATE table plants (
            id SERIAL PRIMARY KEY NOT NULL,
            account_id INT NOT NULL REFERENCES accounts (id) ON DELETE CASCADE,
            name VARCHAR(150) NOT NULL,
            nickname VARCHAR(150),
            last_watered TIMESTAMPTZ,
            image VARCHAR(400),
            alive BOOLEAN
        );
        """,
        """
        DROP table plants;
        """,
    ],
    [
        """
        CREATE table puns (
            id SERIAL PRIMARY KEY NOT NULL,
            pun TEXT NOT NULL UNIQUE
        );
        """,
        """
        DROP table puns;
        """,
    ],
]
