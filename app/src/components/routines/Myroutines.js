import {Redirect, Link} from "react-router-dom"
import {useEffect, useState} from "react"
import {fetchUserRoutines, fetchAllActivites} from "../../api"

const MyRoutines = ({loggedIn, currentUser, activities}) => {
    const [userRoutines, setUserRoutines] = useState()
    const [activityId, setActivityId] = useState()
    
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(activityId)


    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getUserRoutines = async () => {
    
        if(!currentUser || !activities){
            return
        }
        try{
            const routines  = await fetchUserRoutines(currentUser); //<--change to currentUser
            setUserRoutines(routines)
            console.log(activities)
            
        }catch (error) {console.error(error)
        }
    }

    useEffect(getUserRoutines, [currentUser, activities])
    

    if(!loggedIn){
        return <Redirect to = "/" />
    }else{ 
        return(
            
            <div>
            <h1>Welcome {currentUser}</h1>
        
            <Link className="MakeRoutineLink" to= '/createRoutine'>Create a Routine</Link>
            {userRoutines ? userRoutines?.map((routine, index) => { // ADD ACTIVITIES
                return (
                   <div key={index}>
                        <h2>{routine.name}</h2>
                        <p>{routine.goal}</p>  
                   
                   {routine.activities[0] ?
                    routine.activities.map((activity, index) => {
                        return(
                        <ul key = {index}>
                            <li>Activity: {activity.name}</li>
                            <li>Description: {activity.description}</li>
                            <li>Duration:{activity.duration}</li>
                            <li>Count:{activity.count}</li>
                        </ul>) 
                    
                }) :<b>No activities have been added to this routine</b>}
                  <form onSubmit={handleSubmit}>
                      <label>Add Activity to this Routine</label>
                    <select  // do this for myRoutines. select an option that adds that activity from all activities and submit.
                            name="Activities"
                            id="select-activity"
                            value={activityId} //set to id 
                            onChange={(event) => {

                                return setActivityId(event.target.value)
                                
                                } 
                            }>
                            <option value = "null" >Select an activity to add</option>   
                            {activities.map((activity, index) => {
                                return (<option key = {index} value = {activity.id} >{activity.name}</option>
                                )}
                                )
                            }    
                            

                            </select>
                            <div>
                                <label>Duration</label>
                                <input type='text' placeholder='Duration' />
                            </div>
                            <button className = "submitButton" type='submit'>Submit</button>
                    </form>
                            
                  </div>                       
                
                )
            
            
            
            
            }):<h2>Looks like you don't have any routines</h2>}
            </div>
        )
    }
}

export default MyRoutines