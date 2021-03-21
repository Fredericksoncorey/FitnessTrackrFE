const Activities = () => {
  const [grabbedActivities, setGrabbedActivites] = useState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAllActivities = async () => {
    try {
      const routines = await fetchAllActivities();

      setGrabbedActivities(Activities);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(getAllActivities, []);
  console.log(grabbedActivities);
  return (
    <div>
      <h1>Welcome to Activities</h1>
      {grabbedActivities?.map((acitivity, index) => {
        return (
          <div key={index}>
            <h2>
              Activity:{activity.id}:: Created by {activity.creatorName}
            </h2>
            <p>Description:{activity.description}</p>

            {activity.activities[0] ? (
              activity.activities.map((activity, index) => {
                return (
                  <div key={index}>
                    <b>Activity: {activity.name}</b>
                    <p>Description: {activity.description}</p>
                    <p>Duration:{activity.duration}</p>
                    <p>Count:{activity.count}</p>
                  </div>
                );
              })
            ) : (
              <b>No activities have been added to this routine</b>
            )}
          </div>
        );
      })}
    </div>
  );
};
