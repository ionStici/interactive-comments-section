import React from 'react';
import styles from './../styles/Comment.module.scss';
import assets from './../state/Assets';
import Prompt from './Prompt';
import { currentUser } from '../state/Data';

const Comment = function (props) {
    const [prompt, setPromp] = React.useState('');
    const comment = props.data;

    const displayPromp = () => {
        setPromp(
            <Prompt
                type="reply"
                png={currentUser.image.png}
                webp={currentUser.image.webp}
            />
        );
    };

    return (
        <div className={styles.box}>
            <article className={styles.comment_wrapper}>
                {/*  */}
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
                {/*  */}
                <p className={styles.content}>{comment.content}</p>
                {/*  */}
                <div className={styles.rating}>
                    <button className={styles.rating_btn}>
                        <svg
                            width="11"
                            height="11"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {assets.icon_plus}
                        </svg>
                    </button>
                    <p className={styles.rating_score}>{comment.score}</p>
                    <button className={styles.rating_btn}>
                        <svg
                            width="11"
                            height="3"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {assets.icon_minus}
                        </svg>
                    </button>
                </div>
                {/*  */}
                <div className={styles.btnsWrapper}>
                    <button className={styles.delete}>
                        <svg
                            width="14"
                            height="14"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {assets.icon_edit}
                        </svg>
                        <span>Delete</span>
                    </button>

                    <button className={styles.reply} onClick={displayPromp}>
                        <svg
                            width="14"
                            height="13"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {assets.icon_reply}
                        </svg>
                        <span>Reply</span>
                    </button>
                </div>
                {/*  */}
            </article>
            {prompt}
        </div>
    );
};

export default Comment;
