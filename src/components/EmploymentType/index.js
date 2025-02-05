import './index.css'

const EmploymentType = props => {
  const {employmentType, employmentTypesList, selectEmploymentType} = props
  return (
    <div>
      <h1 className="employ-heading">Type of Employment</h1>
      <ul>
        {employmentTypesList.map(employType => (
          <li key={employType.employmentTypeId} className="checkbox-container">
            <input
              className="checkbox"
              type="checkbox"
              id={employType.employmentTypeId}
              onChange={() => selectEmploymentType(employType.employmentTypeId)}
              checked={employmentType.includes(employType.employmentTypeId)}
            />
            <label
              className="employ-label"
              htmlFor={employType.employmentTypeId}
            >
              {employType.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EmploymentType
