
import {getToken} from '../auth'
const token = getToken()

const baseURL ='https://fitnesstrac-kr.herokuapp.com/api/'

export const fetchUserData = async () => {
    try {
        const response = await fetch(`${baseURL}users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();

        return data

    } catch (error) {
        console.error(error);
    }
}

export const fetchUserRoutines = async (username) => {
    try {
        const response = await fetch(`${baseURL}users/${username}/routines`, {
            headers: {
                'Content-Type': 'application/json',
                
            }
        });
        const data = await response.json();

        return data

    } catch (error) {
        console.error(error);
    }    


}

export const createRoutines = async (routine) => {
    try {
        const response = await fetch(`${baseURL}routines`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(routine) 
            
        });
        const data = await response.json();

        return data

    } catch (error) {
        console.error(error);
    }    
}

export const fetchAllRoutines = async () => {
    try {
        const response = await fetch(`${baseURL}routines`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();

        return data

    } catch (error) {
        console.error(error);
    }    
}

export const fetchAllActivites = async () => {

    try {
        const response = await fetch(`${baseURL}activities`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        return data

    } catch (error) {
        console.error(error);
    }    

}

export const applyActivityToRoutine = async (routineId, activityIdV, countV, durationV) => {
console.log(activityIdV, countV, durationV)
    try {
        const response = await fetch(`${baseURL}routines/${routineId}/activities`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                activityId: activityIdV, 
                count: countV,
                duration: durationV})
        });
        const data = await response.json();
        return data

    } catch (error) {
        console.error(error);
    }    

}

export const updateRoutine = async (routineId, obj) =>{
    try {
        const response = await fetch(`${baseURL}routines/${routineId}/activities`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({obj})
        });
        const data = await response.json();
        return data

    } catch (error) {
        console.error(error);
    }    


}

export const createActivity = async (activity) => {
    try {
        const response = await fetch(`${baseURL}activities`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(activity) 
            
        });
        const data = await response.json();

        return data

    } catch (error) {
        console.error(error);
    }     
}