import { useState } from "react";
import styles from "./ModalAdd.module.scss";

function ModalAdd(props) {
    const [open, toggleOpen] = useState(false);

    function addHandler(item) {
        props.add(item);
    }

    return (
        <div>
            {open ? (
                <div className={styles.modal}>
                    <button
                        onClick={() => toggleOpen(false)}
                        className={styles.closeModal}
                    >
                        X
                    </button>
                    <ul>
                        {props.data &&
                            props.data.length > 0 &&
                            props.data.map((item) => (
                                <li key={item.id}>
                                    <button onClick={() => addHandler(item)}>
                                        {item.name}
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>
            ) : (
                <button onClick={() => toggleOpen(true)}>add drill</button>
            )}
        </div>
    );
}

export default ModalAdd;
