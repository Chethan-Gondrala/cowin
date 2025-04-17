import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAgeCom from '../VaccinationByAge'
import VBG from '../VaccinationByGender'
import './index.css'

function failureView() {
  return (
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )
}

function loadingView() {
  return (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )
}

function renderPycharts(fetchedData) {
  const {
    last7DaysVaccination,
    vaccinationByGender,
    vaccinationByAge,
  } = fetchedData
  return (
    <>
      <VaccinationCoverage data={last7DaysVaccination} />
      <div className="sub-can">
        <h1 className="vac-cov-head">Vaccination by gender</h1>
        <VBG data={vaccinationByGender} />
      </div>
      <div className="sub-can">
        <h1 className="vac-cov-head">Vaccination by Age</h1>
        <VaccinationByAgeCom data={vaccinationByAge} />
      </div>
    </>
  )
}

const camponentsValues = {
  pending: 'PENDING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initaly: 'INITALY',
}

const CowinDashboard = () => {
  const [urlData, setFetchData] = useState([])
  const [displayStatus, setDS] = useState(camponentsValues.initaly)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDS(camponentsValues.pending)
        const url = 'https://apis.ccbp.in/covid-vaccination-data'
        const response = await fetch(url)

        if (response.ok) {
          const jsdata = await response.json()
          const convertData = {
            last7DaysVaccination: jsdata.last_7_days_vaccination,
            vaccinationByAge: jsdata.vaccination_by_age,
            vaccinationByGender: jsdata.vaccination_by_gender,
          }
          setFetchData(convertData)
          setDS(camponentsValues.success)
        } else {
          setDS(camponentsValues.failure)
        }
      } catch (err) {
        setDS(camponentsValues.failure)
        console.log(`fetching error => ${err}`)
      }
    }

    fetchData()
  }, [])

  const switchcaseCheck = () => {
    switch (displayStatus) {
      case camponentsValues.success:
        return renderPycharts(urlData)
      case camponentsValues.pending:
        return loadingView()
      case camponentsValues.failure:
        return failureView()
      default:
        return null
    }
  }

  return (
    <div className="cdb-con">
      <div className="logo-head-con">
        <div className="logo">
          <img
            className="logo-img"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1 className="co-win-text">Co-WIN</h1>
        </div>
        <h1 className="cowin-head">CoWIN Vaccination In India</h1>
      </div>
      {switchcaseCheck()}
    </div>
  )
}

export default CowinDashboard
