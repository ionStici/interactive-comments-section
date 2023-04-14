import React from 'react';
import styles from './styles/Comment.module.scss';
import Comment from './components/Comment';
import assets from './state/Assets';
import { currentUser, comments } from './state/Data';

function App() {
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
                                      return <Comment key={i} data={comment} />;
                                  })
                                : undefined}
                        </div>
                    </section>
                );
            })}
        </main>
    );
}

export default App;
