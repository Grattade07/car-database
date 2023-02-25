import './App.css';
import { useEffect, useState } from 'react';
import AddCar from './components/CarAdd';
import CarUpdate from './components/CarUpdate';
import CarUpdateAll from './components/CarUpdateAll';
import CarDelete from './components/CarDelete';
import { useSelector } from 'react-redux';
import GetCarsOlderThan5 from './components/CarOlderThan5';

/* component displays all cars in the database and holds all other components */
function App() {
  const [items, setItems] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  
  const updatedCount = useSelector((state) => state.carDatabase.databaseUpdatedCount)

  /* sends get request to the server */
  function componentDidMount() {
    fetch("/api").then(res => res.json())
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
    <div className="App">
      <h1 id="title">Interactions with Custom Car Database</h1>
      <h2 id='inputWarning'>(All inputs are spacing and case-senstive)</h2>
      <AddCar />
      <CarUpdate />
      <CarUpdateAll />
      <CarDelete />
      <section id='tableDisplays'>
        <div>
          <h2>All cars in the database</h2>

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

      <GetCarsOlderThan5 />
      
      </section>
    </div>
  );
  }
}

export default App;
