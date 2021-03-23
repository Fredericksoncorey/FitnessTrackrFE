import { useEffect, useState} from 'react'
import {createActivity, fetchAllActivites, /* fetchRoutinesByActivity */} from '../api'

const Activities = ({activities, loggedIn, setActivities}) =>{
    const[newActivity, setNewActivity, ] = useState()
    const [activityData, setActivityData] = useState()
    /* const[activityRoutines, setActivityRoutines] = useState(false);
    const[activityId, setActivityId]= useState() */
    const handleSubmit = async (event) =>{
        try{
            event.preventDefault()
            const response = await createActivity(newActivity) 
            console.log(response)
            if(response.id){
            alert("success creating activity")
                setActivities(await fetchAllActivites())
            }else{
                return alert(response.message)
            }
            }catch(error){
                console.error(error)
            }
            
        

    }

    const fetchActivities = async () => {
        if(!loggedIn){
            try{
                const grabbedActivities = await fetchAllActivites();
                setActivities(grabbedActivities);        
            }catch(error){
                console.error(error)
            }
        }
    }

    useEffect(fetchActivities, [])
    /* const activityHandle = async (event) => {
        event.preventDefault()
        console.log(event.target.id)
        setActivityId(event.target.id)
        setActivityRoutines(await fetchRoutinesByActivity(activityId))
    } */
    //useEffect( , [activityRoutines])
    return ( <div>
        {loggedIn ? 
    <form onSubmit={handleSubmit}>
    <h2> Create An Activity</h2>
    <label>Activity Name:</label>
    <input
      name="Name"
      required
      onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
    />
    <label>Description:</label>
    <input
      type="Description"
      required
      onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
    />
    <button type="submit">submit</button>
  </form> : null }
    
       
            <h1>Activities</h1>
        {activities?.map((activity, index) => {
       return (
       <div key={index}>
        {/* <b>Click Activity name to view affiliated routines</b> */}
        <h2 /* id ={activity.id} onClick={activityHandle}  */>Activity :: {activity.name}</h2>
        <h3>Description ::</h3> <p>{activity.description}</p>
        {/* {activity.id && activityId ? 
        <ul>
            {activityRoutines?.map((routine, index) => {
                return(
                    <li index={index}>
                        Routine: {routine.name}
                    </li>
                )})}
        </ul>   
        : null} */}
        
           
        
       </div>)
    })}
    </div>
    )
    
} 

export default Activities