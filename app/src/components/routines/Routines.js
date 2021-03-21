


import {fetchAllRoutines} from "../../api"
import {useState, useEffect} from 'react'
const Routines = () =>{
    const [grabbedRoutines, setGrabbedRoutines] = useState()
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
                    
                    {routine.activities[0] ?
                        routine.activities.map((activity1, index) => {
                            return(
                                <ul key={index}>
                                    <li>Activity: {activity1.name}</li>
                                    <li>Description: {activity1.description}</li>
                                    <li>Duration:{activity1.duration}</li>
                                    <li>Count:{activity1.count}</li>
                                </ul>) 
                        
                        }) 
                        :<b>No activities have been added to this routine</b>}
                    
               </div> 
            ) 
        
        
        
        
        })}
        </div>
   )
}   

export default Routines