import React , {useState , useEffect, useContext} from 'react';
import {UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import './RenderUser.style.css'

export default function RenderUsers(){
    const {user} = useContext(UserContext);
    const [usersList ,setUsersList] = useState([]);
    const [error ,setError] = useState(null);
    useEffect(()=>{
    
      if(!user){
        return;
      }
      fetch(`https://api.github.com/search/users?q=${user}`)
      .then(res =>
        {if(!res.ok){
        return (setError(res.statusText))
        }else{
          setError(null);
          return res.json();
        }
          
        })
      .then(res =>setUsersList(res.items)) 
      .catch(error => console.log ('render error :', error))    
    },[user]);
    if (!user){
     return (
        <div className="users-names-block">
          <h4 className="no-users">'No users'</h4>
        </div>)
    }

    if (error){
    return (
      <div className="users-names-block">
        <p>{`Erorr  : ${error} `}</p>
      </div> 
    );
    }
    if(usersList && usersList.length === 0){
      return 'Loding...'
    }
    return(
        <div className="users-names-block">
            {usersList.map((userObj,key)=>{
                if( userObj.login.substring(0,user.length) === user ){
                    return (
                      <Link to = {`/users/${userObj.login}`}  key = {key}><p >{userObj.login}</p></Link> 
                    )
                }else{return false}
            } )}
        </div>
    )
}
