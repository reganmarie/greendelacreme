steps = [
    [
        """
        CREATE table accounts (
            id serial primary key not null,
            username varchar(20) not null,
            email varchar(100) not null,
            password varchar(100) not null,
            first varchar(100) not null,
            last varchar(100) not null,
            avatar varchar(400) not null default 'https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17'
        );
        """,
        """
        DROP table accounts;
        """,
    ]
]
