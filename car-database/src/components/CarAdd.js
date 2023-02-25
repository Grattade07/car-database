import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDatabaseCount } from "../store/carDatabase";

/* creates a new car in the database using the values from the inputs */
function AddCar () {
    const [carModel, handleCarModel] = useState("")
    const [carMake, handleCarMake] = useState("")
    const [carOwner, handleCarOwner] = useState("")
    const [carRegistration, handleCarRegistration] = useState("")

    const dispatch = useDispatch()

    /* function to send the post request to the express server */
    function postCar(url = "", data = {}) {
        return fetch(url, {
            method:"POST",
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
        handleCarModel("")
        handleCarMake("")
        handleCarOwner("")
        handleCarRegistration("")
    }
    
    return (
        <div id="addCar">
            <h3>Add Car</h3>
            <div>
                <form className="inputForm">
                    <label>
                        Car Model:
                            <input 
                                type="text"
                                name="carModel"
                                onChange={(e) => {handleCarModel(e.target.value)}}
                                value={carModel}
                            />
                    </label>

                    <br/>

                    <label>
                        Car Make:
                            <input 
                                type="text"
                                name="carMake"
                                onChange={(e) => {handleCarMake(e.target.value)}}
                                value={carMake}
                            />
                    </label>

                    <br />

                    <label>
                        Car Owner:
                            <input 
                                type="text"
                                name="carOwen"
                                onChange={(e) => {handleCarOwner(e.target.value)}}
                                value={carOwner}
                            />
                    </label>

                    <br/>

                    <label>
                        Car Registration:
                            <input 
                                type="text"
                                name="carRegistration"
                                onChange={(e) => {handleCarRegistration(e.target.value)}}
                                value={carRegistration}
                            />
                    </label>

                    <br />

                    <button className="submitNewCarButton" onClick={(e) => {
                        e.preventDefault()
                        /* send post request to database to create new car */
                        postCar("/addCar", {
                            model: `${carModel}`,
                            make: `${carMake}`,
                            owner: `${carOwner}`,
                            registration: `${carRegistration}`
                        })
                        resetInputs()
                        dispatch(updateDatabaseCount())
                    }}>Add New Car</button>
                </form>
            </div>
        </div>
    )
}

export default AddCar