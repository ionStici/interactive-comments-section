import styles from './../styles/Prompt.module.scss';

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

    if (type === 'edit') {
        buttonText = 'Update';
    }

    if (type === 'delete') {
        buttonText = 'Delete';
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
            />

            <button className={styles.btn}>{buttonText}</button>
        </form>
    );
};

export default Prompt;
