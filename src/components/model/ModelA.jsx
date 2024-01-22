import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./model.css";

const ModelA = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Function to fetch contacts from the API
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "https://contact.mediusware.com/api/contacts",
        );
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    // Call the fetchContacts function when the component mounts
    fetchContacts();
  }, []);

  console.log(contacts);
  return (
    <div>
      <div className="d-flex justify-content-center gap-3">
        <Link to="/problem-2/all-contacts" className="btn btn-lg  buttonA">
          All Contacts
        </Link>

        <Link to="/problem-2/us-contacts" className="btn btn-lg  buttonB">
          US Contacts
        </Link>

        <Link to="/problem-2" className="btn btn-lg buttonC">
          Close
        </Link>
      </div>

      {/* <div className="col-8">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.number}</td>
                <td>{contact.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default ModelA;
