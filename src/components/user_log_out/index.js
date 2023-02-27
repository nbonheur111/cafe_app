import React, { useContext } from 'react'
import { AppContext } from '../../contexts/app_context'
import './index.css'


const UserLogOut = () => {

    const { user } = useContext(AppContext);
    const handleLogout = () => {


    }
  return (
    <div className='user-logout'>
        <div>
            {user.name || "Guest"}
        </div>
        <div className='email'>
            {user.email || "guest@sei.com"}

        </div>
        <button className='btn-sm' onClick={handleLogout}>
            LOG the  F OUT
        </button>
        

    </div>
  )
}

export default UserLogOut