import { useState } from "react"
import { useDispatch } from "react-redux";
import { updateDatabaseCount } from "../store/carDatabase";

/* function component allows user to update the owner of the given car registration */
function CarUpdate() {
    const [carRegistration, handleCarRegistration] = useState("")
    const [carOwner, handleCarOwner] = useState("")

    const dispatch = useDispatch()

    /* sends put request to the server */
    function updateCar(url= "", data = {}) {
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

    /* resets input values */
    function resetInputs () {
        handleCarOwner("")
        handleCarRegistration("")
    }

    return (
        <div id="updateCar">
            <h3>Update Car By Registration</h3>
            <form className="inputForm">
                <label>
                    What is the car's registration?
                    <input 
                        type="text"
                        name="carRegistration"
                        onChange={(e) => {handleCarRegistration(e.target.value)}}
                        value={carRegistration}
                    />
                </label>

                <br />

                <label>
                    Who is the car's new owner?
                    <input 
                        type="text"
                        name="carOwner"
                        onChange={(e) => {handleCarOwner(e.target.value)}}
                        value={carOwner}
                    />
                </label>

                <br/>

                <button onClick={(e) => {
                    e.preventDefault()
                    /* calls the controller to update one car */
                    updateCar("/updateCar", {
                        registration: `${carRegistration}`,
                        owner: `${carOwner}`
                    })
                    dispatch(updateDatabaseCount())
                    resetInputs()
                }}>Update Car</button>
            </form>
        </div>
    )
}

export default CarUpdate