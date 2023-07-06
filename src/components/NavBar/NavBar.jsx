import React, { useEffect } from "react";
import style from "./NavBar.module.css";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import joystick from "../NavBar/joystick.jpg";
<<<<<<< HEAD
import { useSelector } from "react-redux";

export default function NavBar({ size }) {
  const DataUser = useSelector((state) => state.dataUser);

  // console.log(DataUser.nombre.charAt(0).toUpperCase());
=======
import Favorites from "../Favorites/Favorites";
import { useDispatch, useSelector } from "react-redux";
import { getCartUser } from "../../actions";
import { useLocation } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { setCurrentPage, getVideogames, setOrigin } from "../../actions";

export default function NavBar() {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cartUser)
  const user = useSelector(state => state.dataUser.cartID)
  const userLog = useSelector(state => state.dataUser)
  const location = useLocation();

  // console.log(userLog)
  // console.log(cart)

  const btnClick = () => {
    window.location.reload()
  }

  useEffect(() => {
    dispatch(getCartUser(user))
  }, [])

>>>>>>> 8be15ba2127475f3d682a1fec5c514e84fa2aef1
  return (
    <nav className={style.nav}>
      <img className={style.userImg} src={joystick} alt="Imagen de perfil" />
      <h3 className={style.name}>HOLA {userLog?.nombre?.toUpperCase()}</h3>
      <div className={style.navLinks}>
      <div className={style.a}>
<<<<<<< HEAD
        <a href="/home">HOME</a>
        <a href="/favorites">FAVORITES</a>
        <a href="/videogame">VENDER</a>
        <a href="/about">ABOUT</a>
        <a href="/login">LOGIN</a>
        <a href="/register">REGISTER</a>
=======
        <Link to="/home">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Favorites />
        {/* <Link to="/videogame">SELL</Link> */}
        {/* <Link to="/login">LOGIN</Link>
        <Link to="/register">REGISTER</Link> */}
        </div>
>>>>>>> 8be15ba2127475f3d682a1fec5c514e84fa2aef1
      </div>
      <SearchBar />

      <div>
        <IconButton aria-label="mostrar items" color="inherit">
          <Badge badgeContent={cart?.length} color="secondary">
            <Link to="/cart">
              <ShoppingCartIcon fontSize="large" color="inherit" />
            </Link>
          </Badge>
        </IconButton>
      </div>
      <div>
<<<<<<< HEAD
        <Link to="/user">
          <img
            className={style.userImg}
            src={
              DataUser && DataUser.nombre && DataUser.nombre.length > 0
                ? DataUser.nombre.charAt(0).toUpperCase()
                : joystick
            }
            alt="Imagen de perfil"
          />
        </Link>
=======
        <div className={style.navButtons}>
          {
            !userLog.userID &&
            <Link to="/login">
              <button className={style.navButton}>Login</button>
            </Link>
          }
          {
            !userLog.userID &&
            <Link to="/register">
              <button className={style.navButton}>Register</button>
            </Link>
          }
          {
            userLog.userID &&
            <button onClick={btnClick} className={style.navButton}>Logout</button>
          }
        </div>
>>>>>>> 8be15ba2127475f3d682a1fec5c514e84fa2aef1
      </div>
    </nav>
  );
}
