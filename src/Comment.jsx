import React from 'react';
import styles from './styles/Comment.module.scss';
import assets from './state/Assets';

const Comment = function (props) {
    const comment = props.data;

    console.log(comment);

    return (
        <section className={styles.section}>
            <div className={styles.profile}>
                <picture>
                    <source srcSet={comment.user.image.webp} type="webp" />
                    <img
                        className={styles.picture}
                        src={comment.user.image.png}
                        width="32"
                        height="32"
                        alt="User Photo"
                    />
                </picture>
                <p className={styles.name}>{comment.user.username}</p>
                <p className={styles.date}>{comment.createdAt}</p>
            </div>

            <p className={styles.content}>{comment.content}</p>

            <div className={styles.rating}>
                <button>
                    <svg
                        className={styles.plus}
                        width="11"
                        height="11"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {assets.icon_plus}
                    </svg>
                </button>

                <p className={styles.score}>{comment.score}</p>

                <button>
                    <svg
                        className={styles.minus}
                        width="11"
                        height="3"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {assets.icon_minus}
                    </svg>
                </button>
            </div>

            <button className={styles.replay}>
                <img src={assets.reply} alt="Reply" />
                <span>Reply</span>
            </button>
        </section>
    );
};

export default Comment;
