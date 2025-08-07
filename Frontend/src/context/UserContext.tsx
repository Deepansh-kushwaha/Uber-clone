import { useState } from "react";
import { UserDataContext } from "./UserDataContext";

function UserContext({children}:{children:React.ReactNode}) {
    const [user, setUser] = useState({
        email: '',
        fullname: {
            firstname: '',
            lastname: '',
        },
    })
  return (
    <div>
   <UserDataContext.Provider value={{user, setUser}}>
    {children}
   </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
