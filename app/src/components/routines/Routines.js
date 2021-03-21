


import {fetchAllRoutines} from "../../api"
import {useState, useEffect} from 'react'
const Routines = () =>{
    const [grabbedRoutines, setGrabbedRoutines] = useState()
    const [activity, setActivity] = useState("Activity") //change to id
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getAllRoutines = async () => {
        try{
            const routines = await fetchAllRoutines(); 
            setGrabbedRoutines(routines)
        }catch (error) {console.error(error)
        }
    }

    useEffect( getAllRoutines, []);
    console.log(grabbedRoutines)
    return(
        <div>
        <h1>Welcome to Routines</h1>
         {grabbedRoutines?.map((routine, index) => { 
            return (
               <div key={index}>
                    <h2>Routine:{routine.name}:: Created by {routine.creatorName}</h2>
                    <p>Goal:{routine.goal}</p>
                    
                    {routine.activities[0] ? <select  // do this for myRoutines. select an option that adds that activity from all activities and submit.
                        name="Activities"
                        id="select-activity"
                        value={activity} //set to id 
                        onChange={(event) => {

                            return setActivity(event.target.value)

                            } 
                        }>
                     {routine.activities.map((activity1, index) => {
                        return(<>
                        <option key = {index} value = {activity1.name} >{activity1.name}</option>
                        <ul>
                            <li>Activity: {activity1.name}</li>
                            <li>Description: {activity1.description}</li>
                            <li>Duration:{activity1.duration}</li>
                            <li>Count:{activity1.count}</li>
                        </ul>) </>
                        
                    )})}</select> :<b>No activities have been added to this routine</b>}
                    
               </div> 
            ) 
        
        
        
        
        })} 
        </div>
    )
    }

export default Routines