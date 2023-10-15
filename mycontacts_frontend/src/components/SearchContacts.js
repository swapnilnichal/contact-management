import { React, useState } from "react";
import Navbar from "./Navbar";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);

  const searchContacts = async (search) => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`/api/contacts/search?query=${search}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      let data = await response.json();
      console.log("data : ", data);
      setSearchData(data);
    } catch (err) {
      console.log(err);
    }
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