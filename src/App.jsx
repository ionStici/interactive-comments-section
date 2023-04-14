import React from 'react';
import styles from './styles/Comment.module.scss';
import Comment from './components/Comment';
import Post from './components/Prompt';
import { currentUser, comments } from './state/Data';

function App() {
    const [id, setId] = React.useState(5);

    const handleSubmit = function (event) {
        event.preventDefault();
        const value = event.target.querySelector('textarea').value;
        setId(prev => prev + 1);

        comments.push({
            id: id,
            content: value,
            createdAt: 'now',
            score: 0,
            user: {
                image: {
                    png: currentUser.image.png,
                    webp: currentUser.image.webp,
                },
                username: currentUser.username,
            },
            replies: [],
        });
    };

    return (
        <main>
            {comments.map((comment, i) => {
                return (
                    <section className={styles.section} key={i}>
                        <Comment data={comment} />

                        {/* prettier-ignore */}
                        <div className={comment.replies[0] ? styles.box_with_replies : ''}>
                            {comment.replies[0]
                                ? comment.replies.map((comment, i) => {
                                      return <Comment key={i} data={comment}  />
                                  })
                                : undefined}
                        </div>
                    </section>
                );
            })}

            <Post
                type="main"
                png={currentUser.image.png}
                webp={currentUser.image.webp}
                onSubmit={handleSubmit}
            />
        </main>
    );
}

export default App;
