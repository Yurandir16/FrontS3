import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../asset/style/Log_in.css";
import Swal from 'sweetalert2'
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {
    const navigator = useNavigate()
    const data = useState({
        email: '',
        password: '',
        validat: ''
    })

    const url = 'http://44.203.153.31/api/user/login'

    const { handleSubmit, register, formState: { errors } } = useForm();

    const onSubmit = values => {
        const data = values;

        console.log(data);
        axios.post(url, {
            email: data.email,
            password: data.password,
            validat: data.validat
        })
            .then(res => {
                if (res.request.status === 200) {
                    if (data.email === "yurandirIsabel2022@gmail.com") {
                        Swal.fire(
                            'Bienvenido administrador!',
                            '' + res.data.data.name + '',
                            'success'
                        )
                        navigator('/Shop')
                    }
                    else {
                        Swal.fire(
                            'Bienvenido!',
                            '' + res.data.data.name + '',
                            'success'
                        )
                        navigator('/Index')
                    }

                }
            })
            .catch(err => {
                Swal.fire(
                    'Error!',
                    '' + err.response.data.error + '',
                    'error'
                )
            })
    }
    return (
        <section class="vh-100 gradient-custom bg-success">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="col p-5 rounder-end">
                            <div className="card bg-dark text-white">
                                <div className="card-body p-5 text-center">
                                    <div className="mb-md-5 mt-md-4 pb-5">
                                        <h2 className="fw-bold mb-2 text-uppercase">WELCOME</h2>
                                        <p class="text-white-50 mb-5">Please enter your login and password!</p>
                                        <form className="was-validated" noValidate onSubmit={handleSubmit(onSubmit)}>
                                            <div className="mb-4">
                                                <label className="form-label" for="typeEmailX">Write your email</label>
                                                <input type="text" className="form-control form-control-lg" id="email" placeholder="Email" required {...register("email", {
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
                                            <div className="mb-4">
                                                <label className="form-label" for="typePasswordX">Write your password</label>
                                                <input type="password" className="form-control form-control-lg" placeholder="Password" required {...register("password", {
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
                                            <div className="my-3">
                                                <span><a className="text-white-50" href="/Recovery_password">Forgot password?</a></span>
                                            </div>
                                            <div className="d-grid">
                                                <button type="submit" className="btn btn-outline-light btn-lg px-5">Access</button>
                                            </div>

                                            <div className="my-3">
                                                <span className="mb-0">You do not have an account? <a className="text-white-50 fw-bold" href="/Sign_up">Create account</a></span>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;