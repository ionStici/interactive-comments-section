import styles from './../styles/Prompt.module.scss';
import { comments } from '../state/Data';

const Prompt = function (props) {
    const type = props.type;

    let buttonText = '';
    let placeholderText = '';
    let event;

    if (type === 'main') {
        buttonText = 'Send';
        placeholderText = 'Add a comment…';
        event = props.onSubmit;
    }

    if (type === 'reply') {
        buttonText = 'Reply';
    }

    let id;
    let value;
    if (type === 'edit') {
        buttonText = 'Update';
        placeholderText = '';
        id = props.target.dataset.id;
        value = props.content;
        event;
    }

    return (
        <form className={styles.form} onSubmit={event}>
            <img
                className={styles.img}
                src={props.png}
                width="32"
                height="32"
                alt="User Photo"
            />

            <textarea
                className={styles.input}
                type="text"
                placeholder={placeholderText}
                defaultValue={value}
            />

            <button className={styles.btn}>{buttonText}</button>
        </form>
    );
};

export default Prompt;
