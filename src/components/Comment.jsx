import React from 'react';
import styles from './../styles/Comment.module.scss';
import popupStyles from './../styles/Popup.module.scss';
import assets from './../state/Assets';
import Prompt from './Prompt';
import Popup from './Popup';
import { currentUser, comments } from './../state/Data';

const Comment = function (props) {
    const [prompt, setPromp] = React.useState('');
    const [popup, setPopup] = React.useState('');

    const comment = props.data;
    const owner = comment.user.username === currentUser.username;

    // // // // // // // // // // // // // // // // // // // //

    const replyPost = event => {
        if (prompt !== '') {
            setPromp('');
            return;
        }

        const handleReply = event => {
            event.preventDefault();
            props.handleReply(event);
            setPromp('');
        };

        setPromp(<Prompt type="reply" onSubmit={handleReply} />);
    };

    // // // // // // // // // // // // // // // // // // // //

    const editPost = event => {
        if (prompt !== '') {
            setPromp('');
            return;
        }

        const handleEdit = event => {
            event.preventDefault();
            const newContent = event.target.querySelector('textarea').value;
            comment.content = newContent;
            setPromp('');
        };

        setPromp(
            <Prompt
                type="edit"
                content={comment.content}
                onSubmit={handleEdit}
            />
        );
    };

    // // // // // // // // // // // // // // // // // // // //

    const deletePost = event => {
        const body = document.body;
        body.classList.add(styles.overflow_hidden);

        const box = event.target.closest(`.${styles.box}`);
        const id = box.dataset.id;

        const closePopup = event => {
            const layout = document.querySelector(`.${popupStyles.layout}`);
            const wrapper = document.querySelector(`.${popupStyles.wrapper}`);
            const btn = document.querySelector(`.${popupStyles.no_btn}`);
            const target = event.target;

            if (target === layout || target === wrapper || target === btn) {
                body.classList.remove(styles.overflow_hidden);
                setPopup('');
            }
        };

        const deleteComment = () => {
            body.classList.remove(styles.overflow_hidden);
            setPopup('');

            // // // // // // // // // // // // // // // // // // // //

            const comment = comments.find(comment => comment.id === +id);
            if (comment) comments.splice(comments.indexOf(comment), 1);

            // // // // // // // // // // // // // // // // // // // //

            const replies = comments.filter(comment => {
                return comment.replies.find(comment => comment.id === +id);
            })[0]?.replies;

            const commentRep = replies?.find(c => c.id === +id);
            if (commentRep) replies.splice(replies.indexOf(commentRep), 1);

            // // // // // // // // // // // // // // // // // // // //

            props.rerender();
        };

        setPopup(
            <Popup
                event={event}
                closePopup={closePopup}
                deleteComment={deleteComment}
            />
        );
    };

    // // // // // // // // // // // // // // // // // // // //

    const vote = event => {
        const btn = event.target;

        const sign = btn.dataset.vote;

        const section = btn.closest(`.${styles.section}`);
        const sectionId = +section.firstElementChild.dataset.id;

        const box = btn.closest(`.${styles.box}`);
        const btns = [...box.querySelectorAll(`.${styles.rating_btn}`)];

        const commentId = +btn.closest(`.${styles.box}`).dataset.id;
        const comment = comments.find(c => c.id === sectionId);
        const reply = comment?.replies.find(c => c.id === commentId);

        if (event.type === 'mouseover') {
            if (sectionId === commentId && comment?.voted === true) return;
            if (reply?.voted === true) return;

            const box = event.target.closest(`.${styles.rating}`);
            const scoreEl = box.querySelector(`.${styles.rating_score}`);
            const btns = [...box.querySelectorAll(`.${styles.rating_btn}`)];
            btns.forEach(btn => btn.classList.add(styles.rating_btn_active));

            if (+scoreEl.textContent === 0) {
                btns[1].classList.remove(styles.rating_btn_active);
            }

            return;
        }

        if (sectionId === commentId) {
            if (comment.voted === true) return;

            if (sign === '+') comment.score++;
            if (comment.score < 1) return;
            if (sign === '-') comment.score--;

            comment.voted = true;
            btns.forEach(btn => btn.classList.remove(styles.rating_btn_active));
        } else {
            if (reply.voted === true) return;

            if (sign === '+') reply.score++;
            if (reply.score < 1) return;
            if (sign === '-') reply.score--;

            reply.voted = true;
            btns.forEach(btn => btn.classList.remove(styles.rating_btn_active));
        }

        props.rerender();
    };

    // // // // // // // // // // // // // // // // // // // //

    const check = event => vote(event);

    // // // // // // // // // // // // // // // // // // // //

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
                <p className={styles.content}>
                    {comment.replyingTo ? (
                        <span className={styles.replyTo}>
                            @{comment.replyingTo}
                        </span>
                    ) : (
                        ''
                    )}
                    {comment.content}
                </p>
                {/*  */}
                <div className={styles.rating}>
                    <button
                        className={`${styles.rating_btn}`}
                        onClick={vote}
                        onMouseOver={check}
                        data-vote="+"
                    >
                        <svg
                            width="11"
                            height="11"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {assets.icon_plus}
                        </svg>
                    </button>
                    <p className={styles.rating_score}>{comment.score}</p>
                    <button
                        className={`${styles.rating_btn}`}
                        onClick={vote}
                        onMouseOver={check}
                        data-vote="-"
                    >
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
                        <button className={styles.delete} onClick={deletePost}>
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
                            onClick={editPost}
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
                            onClick={replyPost}
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
            {popup}
            {prompt}
        </div>
    );
};

export default Comment;
