import React, { useState } from 'react'
import styles from '../styles/Main.module.css'
import { Link } from 'react-router-dom'

const FIELDS = {
USERNAME: "username",
ROOM: "room",

}
const Main = () => {
const {USERNAME, ROOM} = FIELDS;


const [values, setValues] = useState({[USERNAME]:"",[ROOM]: ""});

const handleChange = ( {target:{value, name}}) => {
  setValues({...values, [name]: value});
}

const handleClick = (e) => {
  const isDisaabled = Object.values(values).some(value => !value);

if(isDisaabled) e.preventDefault();
  console.log(isDisaabled);
}
  return (<div className={styles.wrap}>
    <div className={styles.container}></div>
    <p className={styles.heading}>Добро пожаловать!</p>
      



      <form className={styles.form}>
      <span>Введите необходимые данные:</span>
      <div className={styles.group}>
        <input 
        type="text" 
        name='username' 
        value={values[USERNAME]} 
        placeholder='Username'
        className={styles.input} 
        onChange={handleChange} 
        autoComplete='off'
        required
        />
      </div>
      <div className={styles.group}>
        <input 
        type="text" 
        name='room' 
        placeholder='Name room'
        value={values[ROOM]}
        className={styles.input} 
        onChange={handleChange} 
        autoComplete='off'
        required
        />
      </div>
      <div className={styles.group}>
        
        
        {/* Время работы */}
        {/* <input 
        type="text" 
        name='timework' 
        placeholder='TimeWork'
        value=''
        className={styles.input} 
        autoComplete='off'
        /> */}
      </div>


      <Link 
      className={styles.group}
      onClick={handleClick}
        to={`/chat?name=${values[USERNAME]}&room=${values[ROOM]}`}>
      <button type='submit'className={styles.button}>
      Login
      </button>
      </Link>

      </form>
    </div>)
    
}

export default Main
