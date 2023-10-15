import React, { useEffect, useState, useRef } from "react";
import M from 'materialize-css';
import Navbar from "./Navbar";

const Home = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [contacts, setContacts] = useState([]);
    const [conId, setConId] = useState(null);

    const nameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const phoneInputRef = useRef(null);

    function correctInfo(name, email, phone) {
        if (!name || !email || !phone) {
            M.toast({ html: "all fields are required !", classes: "#f44336 red" });
            return false;
        }
        if (name.length < 3) {
            M.toast({ html: "username should be greater than 3 characters !", classes: "#f44336 red" });
            return false;
        }
        if (email.length < 10) {
            M.toast({ html: "email should be greater than 10 characters !", classes: "#f44336 red" });
            return false;
        }
        if (phone.length < 10 || phone.length > 10) {
            M.toast({ html: "phone should have 10 numbers !", classes: "#f44336 red" });
            return false;
        }
        return true;
    }

    async function addContact(e) {
        e.preventDefault();
        if (correctInfo(userName, email, phone) === false) {
            return;
        }
        else {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await fetch('/api/contacts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: userName,
                        email,
                        phone,
                    }),
                });

                if (!response.ok) {
                    M.toast({ html: "contact with this phone number is already exists", classes: "#f44336 red" });
                    throw new Error('Network response was not ok');
                } else {
                    const data = await response.json();
                    // console.log(data);
                    setContacts((prevContacts) => [...prevContacts, data]);
                    M.toast({ html: 'Contact added successfully', classes: "#00e676 green accent-3" });
                    document.getElementById('contactForm').reset();
                    setUserName("");
                    setEmail("");
                    setPhone("");
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const deleteContact = async (contactId) => {
        const token = localStorage.getItem('accessToken');
        try {
            if (!token) {
                console.error('Token not found. User may not be authenticated.');
                return;
            }
            const res = fetch("/api/contacts/" + contactId, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            const data = await res;
            if (data.status === 200) {
                M.toast({ html: "contact has been deleted successfully !", classes: "#00e676 green accent-3" });
                const newData = contacts.filter(item => {
                    return item._id !== contactId
                })
                setContacts(newData);
                return;
            } else if (data.status === 404) {
                M.toast({ html: "Contact not found", classes: "#f44336 red" });
                return false;
            } else if (data.status === 403) {
                console.log("Unauthorized User can't delete a contact");
            } else {
                console.log("An error occurred while deleting the contact");
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const modal = document.querySelector('.modal');
        M.Modal.init(modal);
    }, []);

    const setContact = (contact) => {
        nameInputRef.current.value = contact.name;
        emailInputRef.current.value = contact.email;
        phoneInputRef.current.value = contact.phone;

    }

    const updateContact = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');
        const updatedData = {
            name: nameInputRef.current.value,
            email: emailInputRef.current.value,
            phone: phoneInputRef.current.value
        };

        if (correctInfo(updatedData.name, updatedData.email, updatedData.phone) === false) {
            return;
        }
        else {
            try {
                const response = await fetch("/api/contacts/" + conId, {
                    method: 'PUt',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: updatedData.name,
                        email: updatedData.email,
                        phone: updatedData.phone
                    })
                });
                if (!response.ok) {
                    console.log("not ok");
                } else {
                    const updatedData = await response.json();
                    setContacts((prevContacts) => {
                        return prevContacts.map((c) =>
                            c._id === updatedData._id ? updatedData : c
                        );
                    });
                    console.log(updatedData);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const fetchData = async () => {
            try {
                if (!token) {
                    console.error('Token not found. User may not be authenticated.');
                    return;
                }

                const response = await fetch('/api/contacts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setContacts(data);
                console.log(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData(); // Call the function to fetch contacts when the component mounts
    }, []);



    return (
        <>
            <Navbar />
            {/* start :this section is for modal  */}
            <div id="modal1" className="modal">
                <div className="modal-content">
                    <h4>Update Contact</h4>
                    <div className="row">
                        <form className="col s12" onSubmit={updateContact}>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="name" type="text" ref={nameInputRef} className="validate" />
                                    <label htmlFor="first_name">Name</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="email" type="email" ref={emailInputRef} className="validate" />
                                    <label htmlFor="last_name">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="phone" type="text" ref={phoneInputRef} className="validate" />
                                    <label htmlFor="phone">Phone</label>
                                </div>
                            </div>
                            <button className="btn waves-effect waves-light modal-close"
                                type="submit" name="action">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
                <div className="modal-footer">
                    <button data-target="modal1" className="btn modal-close">close</button>
                </div>
            </div>
            {/* end */}

            <div className="row">
                <form className="col s12 m6" id="contactForm" style={{ margin: "45px 40px 30px 20px" }} >
                    <h2>Add Contact</h2>
                    <div className="row">
                        <div className="input-field col s12">
                            <label htmlFor="username">Username</label>
                            <input name="username" type="text" onChange={(e) => setUserName(e.target.value)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <label htmlFor="email">Email</label>
                            <input name="email" type="text" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <label htmlFor="phone">Phone</label>
                            <input name="phone" type="text" onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input type="submit" value="Add" className="btn waves-effect waves-light"
                                onClick={addContact} />
                        </div>
                    </div>
                </form>
                <div className="col s12 m5">
                    <h3>Contact List</h3>
                    <ul className="collection">
                        {contacts && contacts.map(contact => (
                            <li className="collection-item avatar" key={contact._id}>
                                <div className="row" style={{ margin: "0" }}>
                                    <div className=" col s3">
                                        <i className="material-icons circle center" style={{ top: "23px", left: " 30px" }}>contact_phone</i>
                                    </div>
                                    <div className="col s6">
                                        <span className="title">{contact.name}</span>
                                        <p>{contact.email}</p>
                                        <p>{contact.phone}</p>
                                    </div>
                                    <div className="col s3">
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <i className="material-icons" style={{ cursor: "pointer", padding: "5px" }} onClick={() => deleteContact(contact._id)}>delete</i>
                                            <a className="modal-trigger" href="#modal1" onClick={() => { setContact(contact); setConId(contact._id); }}>
                                                <i className="material-icons" style={{ cursor: "pointer", padding: "5px" }}>create</i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </li>))
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Home;