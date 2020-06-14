const db = {
    users: [
        {
            userId: 'dh23ggj5h32g543j5gf43',
            email: 'user@email.com',
            handle: 'user',
            createdAt: '2019-03-15T10:59:52.798Z',
            imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
            bio: 'Hello, my name is user, nice to meet you',
            website: 'https://user.com',
            location: 'London, UK'
        }
    ],
    screams: [
        {
            userHandle: 'user',
            body: 'This is a sample scream',
            createdAt: '2019-03-15T10:59:52.798Z',
            likeCount: 5,
            commentCount: 3
        }
    ],
    comments: [
        {
            userHandle: 'user',
            screamId: 'jfgjlkdfjglkldkfjglkjdfg',
            body: 'Good job!',
            createdAt: '2020-03-15T10:59:52.798Z'
        }
    ],
    notifications: [
        {
            userHandle: 'user',
            screamId: 'jfgjlkdfjglkldkfjglkjdfg',
            body: 'Good job!',
            createdAt: '2020-03-15T10:59:52.798Z',
            sender: 'sdfsdf',
            recipient: 'sdfds'
        }
    ]
};

const userDetails = {
    //Redux data
    credentials: {
        createdAt: "2020-06-12T01:46:10.899Z",
        email: "a@b.com",
        handle: "artemtkachuk",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/08.jpg?alt=media",
        userId: "DUZrde1NpcZQPB1rtZOehyjChrB2",
        website: "https://uttpic.com",
        bio: "Hello, I am the first user!",
        location: "San Francisco, CA"
    },
    likes: [
        {
            userHandle: 'user',
            screamId: '9ZWIjyAnEgTuy6AIW04R'
        },
        {
            userHandle: 'user',
            screamId: 'UR61YnNK7KzAxQiXMv9J'
        }
    ]
};