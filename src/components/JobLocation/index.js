const JobLocation = props => {
  const {jobLocation, jobLocationsList, selectJobLocation} = props
  return (
    <div>
      <h1 className="employ-heading">Choose Locations</h1>
      <ul>
        {jobLocationsList.map(location => (
          <li key={location.locationId} className="checkbox-container">
            <input
              className="checkbox"
              type="checkbox"
              id={location.locationId}
              onChange={() => selectJobLocation(location.locationId)}
              checked={jobLocation.includes(location.locationId)}
            />
            <label className="employ-label" htmlFor={location.locationId}>
              {location.location}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default JobLocation
