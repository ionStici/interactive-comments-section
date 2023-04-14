import styles from './../styles/Prompt.module.scss';

const Prompt = function (props) {
    const type = props.type; // main reply edit

    let buttonText = '';
    if (props.type === 'main') buttonText = 'Send';
    if (props.type === 'reply') buttonText = 'Reply';
    if (props.type === 'update') buttonText = 'Update';

    return (
        <form onSubmit={props.onSubmit}>
            <picture>
                <source srcSet={props.webp} type="webp" />
                <img
                    className={styles.img}
                    src={props.png}
                    width="32"
                    height="32"
                    alt="User Photo"
                />
            </picture>

            <input type="text" />

            <button>{buttonText}</button>
        </form>
    );
};

export default Prompt;
