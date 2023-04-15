import React from 'react';
import styles from './styles/Comment.module.scss';
import Comment from './components/Comment';
import Post from './components/Prompt';
import { currentUser, comments } from './state/Data';

function App() {
    const [id, setId] = React.useState(5);
    const [update, setUpdate] = React.useState(1);
    const rerender = () => setUpdate(prev => prev + 1);

    // // // // // // // // // // // // // // // // // // // //

    const handleSubmit = event => {
        event.preventDefault();
        const textarea = event.target.querySelector('textarea');
        let content = textarea.value;
        setId(prev => prev + 1);

        comments.push({
            id: id,
            content: content,
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

        textarea.value = '';
    };

    // // // // // // // // // // // // // // // // // // // //

    const handleReply = event => {
        event.preventDefault();
        const textarea = event.target.querySelector('textarea');
        let content = textarea.value;
        setId(prev => prev + 1);

        const section = event.target.closest(`.${styles.section}`);
        const box = section.firstElementChild;
        const boxId = box.dataset.id;
        const comment = comments.find(comment => comment.id === +boxId);

        const replyId = event.target.closest(`.${styles.box}`).dataset.id;
        const replyToUser = comment.replies.find(c => c.id === +replyId);

        let replyTo;
        if (replyToUser) replyTo = replyToUser;
        if (!replyToUser) replyTo = comment;

        comment.replies.push({
            id: id,
            content: content,
            createdAt: 'now',
            score: 0,
            replyingTo: replyTo.user.username,
            user: {
                image: {
                    png: currentUser.image.png,
                    webp: currentUser.image.webp,
                },
                username: currentUser.username,
            },
        });

        textarea.value = '';
    };

    // // // // // // // // // // // // // // // // // // // //

    return (
        <main>
            {comments.map((comment, i) => {
                return (
                    <section className={styles.section} key={i}>
                        <Comment
                            data={comment}
                            handleReply={handleReply}
                            rerender={rerender}
                        />

                        {/* prettier-ignore */}
                        <div className={comment.replies[0] ? styles.box_with_replies : ''}>
                            {comment.replies[0]
                                ? comment.replies.map((comment, i) => {
                                      return <Comment key={i} data={comment} handleReply={handleReply} rerender={rerender}  />
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
