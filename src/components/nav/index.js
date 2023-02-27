import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import CategoryList from '../category_list';
import axios from 'axios'
import Logo from '../logo';
import UserLogOut from '../user_log_out';
import './index.css'


const Nav = () => {
  let [categories, setCategoires] = useState([]);

  let [isAdmin, setIsAdmin] = useState(null)

  const location = useLocation().pathname;
  console.log(location)

  
   //grab our cateories
   useEffect(() => {

    const getCategories = async () => {
      let res = await axios(`/get_categories`)
      console.log(res.data);

      let catsFromMongo = [...res.data];
      catsFromMongo.sort((a,b) => a.sortOrder - b.sortOrder)
      console.log(catsFromMongo)
      setCategoires(catsFromMongo)

    }
    getCategories()

  }, []);


  return (
    <nav className='nav'>
      <Logo />
      {location == '/orders/new'?
      <>
      <CategoryList categories={categories} thing2="hello" />
      <Link to="/orders" className="button btn-sm"> Previous Orders</Link>
      </>
      :
      <Link to="/orders/new" className='button btn-sm' >New Order</Link>
     
      }
       <UserLogOut />
    </nav>
  )
}

export default Nav