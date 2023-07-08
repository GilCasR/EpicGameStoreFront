import "./Modal.css";
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import styles from './Login.module.css';
import ButtonGoogleRegister from "./googleSingin/ButtonGoogleRegister"

function RegisterLogin() {

    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
  
    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newUserPost = {
            userName: name,
            userPassword: password,
            userEmail: email,
        };
        try {
            const response = await axios.post('http://localhost:3001/users/', newUserPost);
            const { newCart, newUser } = response.data
            handleCloseModal()
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div>
                <button onClick={handleOpenModal} className={styles.navButton}>Registrar</button>
                {isOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            {/* //////////////// */}
                            <button onClick={handleCloseModal} className={styles.navButton}>Cerrar</button>
                            <div className={styles.RegistrationForm}>
                                <h2 className={styles.loginFormH2}>Registro</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className={styles.formGroup}>
                                        <div>
                                            <label htmlFor="name">Nombre:</label>
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                id="name"
                                                value={name}
                                                onChange={(event) => setName(event.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <div>
                                            <label htmlFor="email">Email:</label>
                                        </div>
                                        <div>
                                            <input
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={(event) => setEmail(event.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <div>
                                            <label htmlFor="password">Contraseña:</label>
                                        </div>
                                        <div>
                                            <input
                                                type="password"
                                                id="password"
                                                value={password}
                                                onChange={(event) => setPassword(event.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button className={styles.buttonRegister}>Registrarse</button>
                                </form>
                                <ButtonGoogleRegister className={styles.buttonGoogle}
                                ></ButtonGoogleRegister>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RegisterLogin
