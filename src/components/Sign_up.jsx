import React, { useState } from "react";
import "../asset/style/Log_in.css";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Sign_up() {
    const navigator = useNavigate()
    const data = useState({
        name: "",
        email: "",
        password: ""
    })

    const url = 'http://44.203.153.31/api/user/create'



    const { handleSubmit, register, formState: { errors } } = useForm();

    const onSubmit = values => {
        console.log(values);
        const data = values
        Swal.fire(
            'Bienvenido!',
            'Cuenta Creada con Exito',
            'success'
        )
        axios.post(url, {
            name: data.name,
            email: data.email,
            password: data.password
        })
            .then(res => {
                console.log(res.data)
            })
        navigator('/')

    }

    return (
        <section className="vh-100 bg-image">
            <div className="mask d-flex align-items-center bg-dark h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card">
                                <div class="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">CREATE AN ACCOUNT</h2>

                                    <form className="was-validated" noValidate onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" for="form3Example1cg">Write your name</label>
                                            <input type="text" id="form3Example1cg" className="form-control form-control-lg" placeholder="name" required {...register("name", {
                                                required: {
                                                    value: true,
                                                    message: "El campo requerido",
                                                }
                                            })}></input>
                                            {errors.name && <span className="text-danger">{errors.name.message}</span>}
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label">Write your email</label>
                                            <input type="text" id="form3Example3cg" className="form-control form-control-lg" placeholder="Email" required {...register("email", {
                                                required: {
                                                    value: true,
                                                    message: "El campo requerido",
                                                },
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalido email"
                                                }
                                            })}></input>
                                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label">Write your password</label>
                                            <input type="password" id="form3Example4cdg" className="form-control form-control-lg" placeholder="Password" required {...register("password", {
                                                required: {
                                                    value: true,
                                                    message: "El campo requerido",
                                                },
                                                minLength: {
                                                    value: 8,
                                                    message: "La contraseña debe tener minimo 8 caracteres"
                                                }
                                            })}></input>
                                            {errors.password && <span className="text-danger">{errors.password.message}</span>}
                                        </div>
                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-outline-dark btn-lg px-5">Register</button>
                                        </div>

                                        <div className="my-3">
                                            <span className="fw-bold">Do you have an account? <a className="text-dark-50 fw-bold" href="/">Login</a></span>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Sign_up;