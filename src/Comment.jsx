import React from 'react';
import styles from './styles/Comment.module.scss';
import assets from './state/Assets';

// prettier-ignore
const icon_plus = (
    <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
        <path 
            d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
            fill="#C5C6EF"
        />
    </svg>
);

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
                {icon_plus}
                <p>{comment.score}</p>
                <img src={assets.minus} alt="Vote Down" />
            </div>

            <button className={styles.replay}>
                <img src={assets.reply} alt="Reply" />
                <span>Reply</span>
            </button>
        </section>
    );
};

export default Comment;
