import { useState } from "react"
import { useDispatch } from "react-redux";
import { updateDatabaseCount } from "../store/carDatabase";

/* function allows user to update the cars that one person owns to a specific make */
function CarUpdateAll() {
    const [carMake, handleCarMake] = useState("")
    const [carOwner, handleCarOwner] = useState("")

    const dispatch = useDispatch()

    /* sends put request to the server */
    function updateCars(url= "", data = {}) {
        return fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(res => res.text())
        .then((data) => {
            console.log("Success", data)
        })
    }

    /* reset input values */
    function resetInputs() {
        handleCarMake("")
        handleCarOwner("")
    }
    

    return (
        <div id="updateCars">
            <h3>Update all car makes of owner</h3>
            <form className="inputForm">
                
                <label>
                    Who is the owner of the cars?
                    <input 
                        type="text"
                        name="carOwner"
                        onChange={(e) => {handleCarOwner(e.target.value)}}
                        value={carOwner}
                    />
                </label>

                <br/>

                <label>
                    What is the new make of the cars?
                    <input 
                        type="text"
                        name="carMake"
                        onChange={(e) => {handleCarMake(e.target.value)}}
                        value={carMake}
                    />
                </label>

                <br/>

                <button onClick={(e) => {
                    e.preventDefault()
                    /* calls the controller to update all cars that match the owner */
                    updateCars("/updateCars", {
                        owner: `${carOwner}`,
                        make: `${carMake}`,
                    })
                    dispatch(updateDatabaseCount())
                    resetInputs()
                }}>Update Cars</button>
            </form>
        </div>
    )
}

export default CarUpdateAll
