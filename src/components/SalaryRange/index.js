import './index.css'

const SalaryRange = props => {
  const {minimumPackage, salaryRangesList, selectMinimumPackage} = props
  return (
    <div>
      <h1 className="salary-heading">Salary Range</h1>
      <ul>
        {salaryRangesList.map(salary => (
          <li key={salary.salaryRangeId} className="radio-container">
            <input
              type="radio"
              className="radio"
              name="salary"
              onChange={() => selectMinimumPackage(salary.salaryRangeId)}
              checked={minimumPackage === salary.salaryRangeId}
              id={salary.salaryRangeId}
            />
            <label className="salary-label" htmlFor={salary.salaryRangeId}>
              {salary.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SalaryRange
