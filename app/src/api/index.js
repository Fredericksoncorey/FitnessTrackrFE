
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