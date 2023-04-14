import React from 'react';
import styles from './../styles/Comment.module.scss';
import assets from './../state/Assets';
import Prompt from './Prompt';
import { currentUser, comments } from '../state/Data';

const Comment = function (props) {
    const [prompt, setPromp] = React.useState('');

    const comment = props.data;

    const owner = comment.user.username === currentUser.username;

    const displayPromp = ({ target }) => {
        const type = target.closest('button').dataset.action_type;
        const box = target.closest(`.${styles.box}`);

        setPromp(
            <Prompt
                type={type}
                target={box}
                content={comment.content}
                png={currentUser.image.png}
                webp={currentUser.image.webp}
            />
        );
    };

    const updatePost = event => {
        event.preventDefault();
    };

    const deletePost = event => {
        console.log('delete');
    };

    return (
        <div className={styles.box} data-id={comment.id}>
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
                    <p className={styles.name}>
                        <span>{comment.user.username}</span>
                        {owner ? <span className={styles.you}>You</span> : ''}
                    </p>
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
                    {owner ? (
                        <button
                            className={styles.delete}
                            onClick={deletePost}
                            data-action_type="delete"
                        >
                            <svg
                                width="12"
                                height="14"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {assets.icon_del}
                            </svg>
                            <span>Delete</span>
                        </button>
                    ) : (
                        ''
                    )}

                    {owner ? (
                        <button
                            className={styles.reply_edit}
                            onClick={displayPromp}
                            data-action_type="edit"
                        >
                            <svg
                                width="14"
                                height="14"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {assets.icon_edit}
                            </svg>
                            <span>Edit</span>
                        </button>
                    ) : (
                        <button
                            className={styles.reply_edit}
                            onClick={displayPromp}
                            data-action_type="reply"
                        >
                            <svg
                                width="14"
                                height="13"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {assets.icon_reply}
                            </svg>
                            <span>Reply</span>
                        </button>
                    )}
                </div>
                {/*  */}
            </article>
            {prompt}
        </div>
    );
};

export default Comment;
