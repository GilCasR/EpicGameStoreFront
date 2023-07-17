import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Admin.module.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import NavBar from "../../NavBar/NavBar";
import ListUsers from "./ListUsers/ListUsers";
import ListVideogames from "./ListVideogames/ListVideogames";
import { getVideogames, getUsersAct } from "../../../actions";
import ModalForm from "./modalForm/modalForm";

function Admin() {
    const dispatch = useDispatch();
    const token = JSON.parse(localStorage.getItem("Token"));
    const [edit, setEdit] = useState(false);
    const [acti, setActivos] = useState(null);
    const [user, setUser] = useState({});
    const [roleUser, setRoleUser] = useState("clientes");
    const [listUsersAct, setListUsers] = useState([]);
    const listaUserFil = useSelector((state) => state.usersFiltra);
    const listaVideogames = useSelector((state) => state.videogames);
    const history = useHistory();
    const videogamesActivos = "Videogames Activos";
    const [selectedRole, setSelectedRole] = useState("");

    const handleModalForm = async () => {
        setEdit(true);
    };

    useEffect(() => {
        if (acti === null) {
            return;
        }

        if (acti === "All") {
            console.log("todos los usuarios");
            getDataUsers();
        } else {
            dispatch(getUsersAct(acti));
            setListUsers(listaUserFil);
        }
    }, [acti]);

    const handleBam = async (id, isActive) => {
        const update = {
            active: !isActive,
        };
        try {
            axios
                .patch(`http://localhost:3001/users/${id}`, update, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    console.log(response);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditRole = async (e, id) => {
        const update = {
            role: e.target.value,
        };
        try {
            axios
                .patch(`http://localhost:3001/users/${id}`, update, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    console.log(response);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const handleActivVideogame = async (id) => {
        alert("Videogame Activado");
    };

    const getDataUsers = async () => {
        axios
            .get("http://localhost:3001/admin/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setListUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getUsersAct(true));
            await getDataUsers();
            if (listaVideogames.length === 0) {
                dispatch(getVideogames());
            }
        };

        fetchData();
    }, []);

    const btnClick = () => {
        localStorage.setItem("userData", JSON.stringify({}));
        history.push("/home");
    };

    const handleUsuariosAct = () => {
        setActivos(true);
        setListUsers(listaUserFil);
    };

    const handleUsuariosDes = () => {
        setActivos(false);
        setListUsers(listaUserFil);
    };

    const handleRoleChange = async (e) => {
        axios
            .get(`http://localhost:3001/admin/users?role=${e.target.value}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setListUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setSelectedRole(e.target.value);
    };

    console.log(selectedRole);
    return (
        <div>
            <NavBar />
            {
                <div>
                    <div className={style.container}>
                        <div className={style.filtreusers}>
                            <button className={style.button} onClick={handleUsuariosAct}>
                                usuariosAct
                            </button>
                            <button className={style.button} onClick={handleUsuariosDes}>
                                usuariosDes
                            </button>
                            <button
                                className={style.button}
                                onClick={() => setActivos("All")}
                            >
                                todos
                            </button>
                            <select
                                className={style.select}
                                onChange={handleRoleChange}
                                value={selectedRole}
                            >
                                <option value="">ALL</option>
                                <option value="vendedor">Vendedor</option>
                                <option value="cliente">Cliente</option>
                            </select>
                        </div>
                        <div className={style.user}>
                            <h1 className={style.title}>{user.nombre}</h1>
                            <div className={style.listContainer}>
                                <ListUsers
                                    lista={listUsersAct}
                                    boton={handleBam}
                                    handleEditRole={handleEditRole}
                                />
                            </div>
                        </div>
                        <div className={style.videogamesContainer}>
                        <button className={style.button}>
                                usuariosAct
                            </button>
                            <button className={style.button}>
                                usuariosDes
                            </button>
                            <button
                                className={style.button}
                                onClick={() => {
                                    return
                                }}
                            > </button>
                            <ListVideogames
                                lista={listaVideogames}
                                videogames={videogamesActivos}
                                boton={handleActivVideogame}
                                boton2={handleModalForm}
                            />
                            {edit ? <ModalForm /> : null}
                        </div>
                        <div className={style.buttonContainer}>
                            <button className={style.button} onClick={btnClick}>
                                Cerrar sesión
                            </button>
                            <br />
                            <Link to="/home" className={style.link}>
                                HOME
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </div >
    );
}

export default Admin;
