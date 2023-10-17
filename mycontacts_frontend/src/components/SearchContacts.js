import { React, useState,useEffect } from "react";
import M from 'materialize-css';
import Navbar from "./Navbar";

const Search = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData,setSearchData] = useState([]);


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

            const data = await response.json();
            setContacts(data);
            console.log("data is data",data);
        } catch (err) {
            console.error(err);
        }
    };

    fetchData(); // Call the function to fetch contacts when the component mounts
}, []);

  const searchContacts = async (searchTerm) => {
    const regex = new RegExp(searchTerm, 'i');
    const results = contacts.filter((contact) => {
      return (
        regex.test(contact.name) || 
        regex.test(contact.email) || 
        regex.test(contact.phone)
      );
    });
    // console.log(results);
    if(results.length === 0){
      setSearchData(results)
      M.toast({ html: "No records found", classes: "#f44336 red" });
      return false;
    }
    setSearchData(results)
  }

  return (
    <>
      <Navbar />
      <div className="row" >
        <div className=" col s12">
          <div className="search">
            <input placeholder="Search..." type="text" onChange={(e) => setSearchTerm(e.target.value)} />
            <button type="submit" onClick={() => searchContacts(searchTerm)}>Search</button>
          </div>
        </div>
      </div>
      <div className="row" >
        <div className=" col s12">
        <ul className="collection">
                        {searchData && searchData.map(contact => (
                            <li className="collection-item avatar" id="contactList" key={contact._id}>
                                <div className="row" style={{ margin: "0" }}>
                                    <div className=" col s2">
                                        <i className="material-icons circle center" style={{ top: "23px", left: " 30px" }}>contact_phone</i>
                                    </div>
                                    <div className="col s10">
                                        <p className="title"><span>Name : {contact.name}</span></p>
                                        <p><span>Email Id :{contact.email}</span></p>
                                        <p><span>Phone No. :{contact.phone}</span></p>
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
export default Search;