import './App.css';
import Axios from "axios"
import { useState, useEffect } from "react"

function App() {

  const [users, setUsers] = useState([])

  const [text,setText] = useState('');

  //Api data götürürük (randomuser-100)
  useEffect(() => {
    Axios.get("https://randomuser.me/api/?results=100")
      .then(resp => setUsers(resp.data.results))
      .catch(err => console.log(err))
  },[])

  // inputda yazdığımız dəyəri götürürük.
  const  HandlerChange = (e) => {
    setText(e.target.value)
  }

 
  //Api götürdüyümüz dataları filterləyirik əgər inputa yazdığımız dəyər randomusere beraberdirsə onu bizə göstərəcək, əgər boşdursa bütün datanı gətirəcək.
  const filteredUsers =users.filter(user => user.name.first.toLowerCase().includes(text.toLowerCase())  || user.name.last.toLowerCase().includes(text.toLowerCase()))

  return (
    <div  className='input flex-column'>
      <input type="text" placeholder='Search' onChange={HandlerChange} />
      <div className='d-flex flex-column'>
        {
          filteredUsers.map((e) => {
            return (
              <div  key ={e.login.uuid} className='d-flex border-bottom border-danger align-items-center my-2  justfy-content-center '>
                <ul>
                  <li>{e.name.first} {e.name.last}</li>
                </ul>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
export default App;