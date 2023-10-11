import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import M from "materialize-css"
import Navbar from "./Navbar";

const Login = ()=>{
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


   function  makeLogin(e){
        e.preventDefault();
        if(email.length===0 || password.length===0){
           M.toast({html : "all fields are required !", classes: "#f44336 red" });
           return false;
        }

        fetch('/api/users/login',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.title === "unauthorized"){
              M.toast({html : data.message , classes: "#f44336 red" });
              document.getElementById("signInForm").reset();
              return false;
           }
           if(data.accessToken){
              localStorage.setItem("accessToken", data.accessToken);
              M.toast({html : "you have logged in successfully !" , classes: "#00e676 green accent-3" });
              navigate('/');
              document.getElementById("signInForm").reset();
              return false;
           }
        })
    };
    return (
        <div className="signIn">
        <Navbar />
        <div className="container" style={{ marginTop: "60px", padding: "20px 0 20px 150px" }} >
            <div className="row">
                <form className="col s12" id="signInForm">
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} className="validate" />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} className="validate" />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <button className="btn waves-effect waves-light left" type="submit" style={{ marginLeft: "10px" }}
                            onClick={makeLogin} name="action">
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Login;