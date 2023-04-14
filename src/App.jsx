import React from 'react';
import styles from './styles/Comment.module.scss';
import Comment from './components/Comment';
import Post from './components/Prompt';
import assets from './state/Assets';
import { currentUser, comments } from './state/Data';

import { createPortal } from 'react-dom';

function App() {
    const [id, setId] = React.useState(5);

    const handlePost = function (event) {
        event.preventDefault();
        const value = event.target.querySelector('input').value;
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

    const displayForm = function (event) {
        event.preventDefault();

        const box = event.target.closest(`.${styles.box}`);

        createPortal(<p>Hello</p>, box);
    };

    return (
        <main>
            {comments.map((comment, i) => {
                return (
                    <section className={styles.section} key={i}>
                        <Comment data={comment} onClick={displayForm} />

                        {/* prettier-ignore */}
                        <div className={comment.replies[0] ? styles.box_with_replies : ''}>
                            {comment.replies[0]
                                ? comment.replies.map((comment, i) => {
                                      return <Comment key={i} data={comment} onClick={displayForm} />
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
                onSubmit={handlePost}
            />
        </main>
    );
}

export default App;
