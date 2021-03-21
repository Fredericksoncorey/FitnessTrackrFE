import { fetchAllActivities } from "../../api"
import { useState, useEffect } from 'react'

const baseURL = "https://fitnesstrac-kr.herokuapp.com/api/activities";

export const fetchUserData = async () => {
  try {
    const response = await fetch(`${baseURL}users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserActivities = async (username) => {
  try {
    const response = await fetch(`${baseURL}users/${username}/activities`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createActivities = async () => {
   try {
        const response = await fetch(`${baseURL}/users/${user}/activities`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();

        return data

    } catch (error) {
        console.error(error);
    }     
};
const Activities = () => {
    const [grabbedActivities, setGrabbedActivites] = useState()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getAllActivities = async () => {
        try {
            const routines = await fetchAllActivities();

            setGrabbedActivities(Activities)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(getAllActivities, []);
    console.log(grabbedActivities)
    return (
        <div>
            <h1>Welcome to Activities</h1>
            {grabbedActivities?.map((acitivity, index) => {
                return (
                    <div key={index}>
                        <h2>Activity:{activity.id}:: Created by {activity.creatorName}</h2>
                        <p>Description:{activity.description}</p>

                        {activity.activities[0] ? activity.activities.map((activity, index) => {
                            return (
                                <div key={index}>
                                    <b>Activity: {activity.name}</b>
                                    <p>Description: {activity.description}</p>
                                    <p>Duration:{activity.duration}</p>
                                    <p>Count:{activity.count}</p>
                                </div>)
                        }) : <b>No activities have been added to this routine</b>}

                    </div>
                )




            })}
        </div>
    )
}

export default Activities