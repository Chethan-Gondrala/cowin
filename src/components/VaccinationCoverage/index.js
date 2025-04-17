import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {data} = props

  const formatDate = dateString => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString('default', {month: 'short'})
    const ordinal = n => {
      const s = ['th', 'st', 'nd', 'rd']
      const v = n % 100
      return s[(v - 20) % 10] || s[v] || s[0]
    }
    return `${day}${ordinal(day)} ${month}`
  }

  const ccList = data.map(each => ({
    dose1: each.dose_1,
    dose2: each.dose_2,
    vaccineDate: formatDate(each.vaccine_date),
  }))

  const DataFormatter = number => `${(number / 1000).toFixed(0)}k`

  return (
    <div className="sub-can">
      <h1 className="vac-cov-head">Vaccination Coverage</h1>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          width={1000}
          height={300}
          data={ccList}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />

          <Bar dataKey="dose1" name="Dose 1" barSize="15%" fill="#5a8dee" />
          <Bar dataKey="dose2" name="Dose 2" barSize="15%" fill="#f54394" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
