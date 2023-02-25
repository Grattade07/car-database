import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

/* functional component gets all cars that are older than 5 years old and displays them in a table */
function GetCarsOlderThan5 () {
    const [items, setItems] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)

    const updatedCount = useSelector((state) => state.carDatabase.databaseUpdatedCount)

    /* sends get request to the server */
    function componentDidMount() {
    fetch("/get5YearOldCars").then(res => res.json())
      .then(
        (result) => {
        setIsLoaded(true)
        setItems(result)
      },
      (error) => {
        setIsLoaded(true)
        setError(error)
      } ) 
  }

  /* runs the componentDidMount function when the state of the update count is incremented */
  useEffect(() => componentDidMount(), [updatedCount])

  if (error) {
    return <div>Error:{error}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
        <div>
            <h2>All cars older than 5 years old</h2>
            <table className="carDisplayTable">
                <thead>
                    <tr>
                        <th>Model</th>
                        <th>Make</th>
                        <th>Owner</th>
                        <th>Registration</th>
                    </tr>
                </thead>
                
                <tbody>
                {items.map( item => (
                    <tr key={item._id}>
                        <td>{item.model}</td>
                        <td>{item.make}</td>
                        <td>{item.owner}</td> 
                        <td>{item.registration}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
  }
}

export default GetCarsOlderThan5