import { useState } from "react";
import Navbar from "./Navbar";
import M from 'materialize-css';

function Signup() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const getUserData =(e) => {
        e.preventDefault();
        if(userName.length=== 0 || email.length=== 0 || password.length === 0){
            M.toast({ html: "All fields are mandatory !" , classes: "#f44336 red" });
            return false;
        }
        if(userName.length < 4 ){
            M.toast({ html: "username should contain more than 4 characters" , classes: "#f44336 red" });
            return false;
        }
        if(email.length < 10 ){
            M.toast({ html: "email should contain more than 10 characters" , classes: "#f44336 red" });
            return false;
        }
        if(password.length < 4){
            M.toast({ html: "password length should be more than 4 " , classes: "#f44336 red" });
            return false;
        }

         fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userName,
                email,
                password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error , classes: "#f44336 red" });
                    document.getElementById("signupForm").reset();
                }
                else {
                    M.toast({ html: data.message , classes: "#00e676 green accent-3" });
                    document.getElementById("signupForm").reset();
                    // navigate('/signin') 
                }
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="signup">
            <Navbar />
            <div className="container" style={{ marginTop: "60px", padding: "20px 0 20px 150px" }} >
                <div className="row">
                    <form className="col s12" id="signupForm">
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="first_name" type="text" onChange={(e) => setUserName(e.target.value)} className="validate" />
                                <label htmlFor="user_name">User Name</label>
                            </div>
                        </div>
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
                                onClick={getUserData} name="action">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;