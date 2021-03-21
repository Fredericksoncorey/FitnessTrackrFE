import {Redirect, Link} from "react-router-dom"
import {useEffect, useState} from "react"
import {fetchUserRoutines} from "../../api"

const MyRoutines = ({loggedIn, currentUser}) => {
    const [userRoutines, setUserRoutines] = useState()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getUserRoutines = async () => {
    
        if(!currentUser){
            return
        }
        try{
            const routines  = await fetchUserRoutines(currentUser); //<--change to currentUser
            console.log(routines)
            setUserRoutines(routines)
        }catch (error) {console.error(error)
        }
    }

    useEffect(getUserRoutines, [currentUser])
    

    if(!loggedIn){
        return <Redirect to = "/" />
    }else{ 
        return(
            
            <div>
                {console.log(currentUser)}
            <h1>Welcome {currentUser}</h1>
        
            <Link className="MakeRoutineLink" to= '/createRoutine'>Create a Routine</Link>
            {userRoutines ? userRoutines?.map((routine, index) => { // ADD ACTIVITIES
                return (
                   <div key={index}>
                        <h2>{routine.name}</h2>
                        <p>{routine.goal}</p>  
                   </div> 
                )
            
            
            
            
            }):<h2>Looks like you don't have any routines</h2>}
            </div>
        )
    }
}

export default MyRoutines