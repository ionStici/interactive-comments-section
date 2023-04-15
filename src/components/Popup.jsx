import styles from './../styles/Popup.module.scss';

const Popup = props => {
    return (
        <>
            <div className={styles.layout} onClick={props.closePopup}></div>

            <div className={styles.wrapper} onClick={props.closePopup}>
                <section className={styles.popup}>
                    <h2 className={styles.title}>Delete comment</h2>

                    <p className={styles.text}>
                        Are you sure you want to delete this comment? This will
                        remove the comment and can’t be undone.
                    </p>

                    <div className={styles.btnsWrapper}>
                        {/* prettier-ignore */}
                        <button className={`${styles.no_btn} ${styles.btn}`} onClick={props.closePopup}>No, cancel</button>
                        {/* prettier-ignore */}
                        <button className={`${styles.yes_btn}  ${styles.btn}`} onClick={props.deleteComment}>Yes, delete</button>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Popup;
