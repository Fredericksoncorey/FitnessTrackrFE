import { Redirect, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchUserRoutines,
  applyActivityToRoutine,
  updateRoutineApi,
  deleteActivityApi,
  updateActivitiesApi,
  deleteRoutineApi,
  fetchAllActivites
} from "../../api";

const MyRoutines = ({ loggedIn, currentUser, activities, setActivities }) => {
  const [userRoutines, setUserRoutines] = useState();
  const [activityId, setActivityId] = useState();
  const [durationCount, setDurationCount] = useState();
  const [routineId, setRoutineId] = useState();



  /* const[showUpdate, setShowUpdate] =  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { duration, count } = durationCount;

    try {
      const response = await applyActivityToRoutine(
        routineId,
        activityId,
        count,
        duration
      );
      console.log(response);
      if (!response.id) {
        return alert("Something went wrong");
      }
      setRoutineId(null);
      setDurationCount(null);
      setActivityId(null);
      setActivities(await fetchAllActivites())
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitUpdateRoutine = async (name, goal, id) => {
    

    try {
      await updateRoutineApi(name, goal, id); //<--change to currentUser
      setActivities(await fetchAllActivites())
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitDeleteRoutine= async (id) => {
    try {
        await deleteRoutineApi(id); //<--change to currentUser
        setActivities(await fetchAllActivites())
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitDeleteActivity = async (id) => {
      console.log (id)
      
    try {
      await deleteActivityApi(id); //<--change to currentUser
      setActivities(await fetchAllActivites())
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitUpdateActivities = async (routineId, count, duration) => {
    try {
      await updateActivitiesApi(routineId, count, duration); //<--change to currentUser
      setActivities(await fetchAllActivites())
    } catch (error) {
      console.error(error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUserRoutines = async () => {
    if (!currentUser || !activities) {
      return;
    }
    try {
      const routines = await fetchUserRoutines(currentUser); //<--change to currentUser
      setUserRoutines(routines);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(getUserRoutines, [currentUser, activities]);

  if (!loggedIn) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <h1>Welcome {currentUser}</h1>

        <Link className="MakeRoutineLink" to="/createRoutine">
          Create a Routine
        </Link>
        {userRoutines ? (
          userRoutines?.map((routine, index) => {
            // ADD ACTIVITIES
            return (
              <div key={index}>
                
                  <h2>{routine.name}
                  </h2>
                  <h3>{routine.goal}</h3>
                    
                 

                  <button
                          type="button"
                          onClick={() =>
                            handleSubmitUpdateRoutine(routine.name, routine.goal, routine.id)
                          }
                        >
                          Update Routine Name or Goal
                        </button>
                  <button
                          type="button"
                          onClick={() =>
                            handleSubmitDeleteRoutine(routine.id)
                          }
                        >
                          Delete
                        </button>
                  
                

                {routine.activities[0] ? (
                  routine.activities.map((activity, index) => {
                    return (
                      <ul key={index}>
                        <li>Activity: {activity.name}</li>
                        <li>ID: {activity.routineActivityId }</li>
                        <li>Description: {activity.description}</li>
                        <li>Duration:{activity.duration}</li>
                        <li>Count:{activity.count} </li>
                        <button
                          type="button"
                          onClick={() =>
                            handleSubmitUpdateActivities(
                              activity.routineActivityId,
                              activity.duration,
                              activity.count
                            )
                          }
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleSubmitDeleteActivity(activity.routineActivityId)
                          }
                        >
                          Delete
                        </button>
                      </ul>
                    );
                  })
                ) : (
                  <b>No activities have been added to this routine</b>
                )}

                <form onSubmit={handleSubmit}>
                  <label>Add Activity to this Routine</label>
                  <select // do this for myRoutines. select an option that adds that activity from all activities and submit.
                    name="Activities"
                    id="select-activity"
                    value={activityId} //set to id
                    onChange={(event) => {
                      setRoutineId(routine.id);
                      setActivityId(event.target.value);
                      return;
                    }}
                  >
                    <option value="null">Select an activity to add</option>
                    {activities.map((activity, index) => {
                      return (
                        <option key={index} value={activity.id}>
                          {activity.name}
                        </option>
                      );
                    })}
                  </select>
                  <div>
                    <label>Count</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Count"
                      onChange={(e) =>
                        setDurationCount({
                          ...durationCount,
                          count: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label>Duration</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Duration"
                      onChange={(e) =>
                        setDurationCount({
                          ...durationCount,
                          duration: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button className="submitButton" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            );
          })
        ) : (
          <h2>Looks like you don't have any routines</h2>
        )}
      </div>
    );
  }
};

export default MyRoutines;
