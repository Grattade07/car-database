import { useState } from "react"
import { useDispatch } from "react-redux";
import { updateDatabaseCount } from "../store/carDatabase";

/* function component allows user to delete the car of the given registration */
function CarDelete() {
    const [carRegistration, handleCarRegistration] = useState("")

    const dispatch = useDispatch()

    /* sends remove request to the server */
    function deleteCar(url= "", data = {}) {
        return fetch(url, {
            method: "DELETE",
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

    /* resets input value */
    function resetInput() {
        handleCarRegistration("")
    }

    return (
        <div id="deleteCar">
            <h3>Delete car by registration</h3>
            
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

                <br/>

                <button onClick={(e) => {
                    e.preventDefault()
                    /* calls the controller to update one car */
                    deleteCar("/removeCar", {
                        registration: `${carRegistration}`,
                    })
                    dispatch(updateDatabaseCount())
                    resetInput()
                }}>Delete Car</button>
            </form>
        </div>
    )
}

export default CarDelete