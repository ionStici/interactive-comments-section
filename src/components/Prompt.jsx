import React from 'react';
import styles from './../styles/Prompt.module.scss';
import { currentUser } from '../state/Data';

const Prompt = function (props) {
    const type = props.type;
    const form = React.useRef(null);
    const img = React.useRef(null);
    const input = React.useRef(null);
    const btn = React.useRef(null);
    const els = [img, input, btn];

    let buttonText = '';
    let placeholderText = '';
    let content;
    let event;

    if (type === 'main') {
        buttonText = 'Send';
        placeholderText = 'Add a comment…';
        event = props.onSubmit;
    }

    if (type === 'reply') {
        buttonText = 'Reply';
        placeholderText = 'Reply...';
        event = props.onSubmit;
    }

    if (type === 'edit') {
        buttonText = 'Update';
        content = props.content;
        event = props.onSubmit;
    }

    // const handleKeyDown = event => {
    //     if (event.key === 'Enter') {
    //         event.preventDefault();
    //     }
    // };

    React.useEffect(() => {
        setTimeout(() => form.current.classList.add(styles.scale), 1);
        setTimeout(() => {
            els.forEach(el => el.current.classList.add(styles.show));
        }, 1);
    }, []);

    return (
        <form className={`${styles.form} ${''}`} onSubmit={event} ref={form}>
            <img
                className={styles.img}
                src={currentUser.image.png}
                ref={img}
                width="32"
                height="32"
                alt="User Photo"
            />

            <textarea
                className={styles.input}
                ref={input}
                type="text"
                placeholder={placeholderText}
                defaultValue={content}
                // onKeyDown={handleKeyDown}
            />

            <button className={styles.btn} ref={btn}>
                {buttonText}
            </button>
        </form>
    );
};

export default Prompt;
