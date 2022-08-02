import '../asset/style/Confirmation_Acount.css'
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from "axios";

function Confirmation() {
    const navigator = useNavigate()
    const [data, setData] = useState({
        valor: 'false'
    })


    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    const querystring = window.location.search
    const params = new URLSearchParams(querystring)



    const validate = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": params.get('email'),
        });

        const url = 'http://44.203.153.31/api/user/config?'

        if (data.valor === 'true') {
            console.log('Validation Success: ' + data.valor);



            console.log(raw);
            axios.post(url, {
                valor: data.valor,
                email: params.get('email'),


            })
                .then(res => {
                    console.log(res.data)
                })
            Swal.fire(
                'Very good!',
                'Thanks for confirming',
                'success'
            )
            navigator('/')

        }
        if (data.valor === 'false') {
            console.log('Validation error: ' + data.valor);

            axios.post(url, {
                valor: data.valor,
                email: params.get('email'),
            })
                .then(res => {
                    console.log(res.data)

                })

            Swal.fire(
                'time out!',
                'Your time is up to set up your account',
                'error'
            )
            navigator('/')
        }
    }

    return (
        <div className="container py-5 h-100 ">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-dark text-white">
                        <div class="card-body p-5 text-center">
                            <div class="mb-md-5 mt-md-4 pb-5">
                                <h2 className="fw-bold text-center py-5">Welcome</h2>
                                <h4 className="fw-bold text-center">Click in the button!</h4><br />

                                <form className="was-validated" onSubmit={validate}>
                                    <div class="form-check">
                                        <input class="form-check-input" onChange={(e) => handle(e)} value={true} type="radio" name="flexRadioDefault" id="valor" />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                        Activate and accept the terms.
                                        </label>
                                    </div><br />
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-outline-light btn-lg px-5">Confirm</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;