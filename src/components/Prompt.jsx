import styles from './../styles/Prompt.module.scss';
import { currentUser } from '../state/Data';

const Prompt = function (props) {
    const type = props.type;

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

    return (
        <form className={`${styles.form} ${styles.scale}`} onSubmit={event}>
            <img
                className={styles.img}
                src={currentUser.image.png}
                width="32"
                height="32"
                alt="User Photo"
            />

            <textarea
                className={styles.input}
                type="text"
                placeholder={placeholderText}
                defaultValue={content}
                // onKeyDown={handleKeyDown}
            />

            <button className={styles.btn}>{buttonText}</button>
        </form>
    );
};

export default Prompt;
