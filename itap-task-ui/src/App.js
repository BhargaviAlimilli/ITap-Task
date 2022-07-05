import './App.css';
import { OutlinedInput } from '@mui/material';
import axios from "axios"
import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"

function App() {
  const [data,setData]= useState([])
  const [open, setOpen]= useState(false)
  const [searchTerm, setSearchTerm]= useState("")
 
  
  const userData= async()=>{
    var res= await axios.get("https://jsonplaceholder.typicode.com/users")
    // console.log(res.data)
    setData(res.data)
  }
  const filteredArray= data.filter((ele)=>{
    if(searchTerm==="" || searchTerm==null){
      return ele
    }else if(ele.username.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())){
      return ele
    }
  })


  useEffect(()=>{
    userData()
  },[data])


  return (
    <div className="App">
      <h1>Users List</h1>
      <OutlinedInput placeholder="Search Username or Email" value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} />
      {data!=null && filteredArray.map((user, index) => (
        <>
        <div className='userInfo' >
          <h4 >{user.name}</h4>
          <p className='username-wrap' onClick={e=>setOpen(!open)}>@{user.username}</p>
        </div>
        {open && (
          <div className='user-modal'>
            <div className='email-sec'> 
            <p style={{color:"blue"}}>Email:</p>
            <p style={{textDecoration:"underline", color:"purple" }}>{user.email}</p>
            </div>
            <div className='email-sec'> 
            <p style={{color:"blue"}}>Phone:</p>
            <p style={{textDecoration:"underline", color:"purple" }} > {user.phone}</p>
            </div>
            <div className='email-sec'> 
            <p style={{color:"blue"}}>Website:</p>
            <a href={`https://www.${user.website}` } >{user.website}</a>
            </div>
          </div>
        )
        }
        </>
      ))
      }
      
    </div>
  )
}

export default App;
