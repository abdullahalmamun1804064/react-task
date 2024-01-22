import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./model.css";
import ModelC from "./ModelC";

const ModelB = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [onlyEven, setOnlyEven] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [data, setData] = useState({});
  const [country, setCountry] = useState("United States"); // Default country

  const fetchContacts = async () => {
    try {
      const response = await axios.get(
        `https://contact.mediusware.com/api/country-contacts/${country}/`,
        {
          params: {
            search,
            page,
            page_size: pageSize,
          },
        },
      );

      let filteredContacts = response.data.results;

      if (onlyEven) {
        filteredContacts = filteredContacts.filter(
          (contact) => contact.id % 2 === 0,
        );
      }

      setContacts(filteredContacts);
      setTotalCount(response.data.count);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleOnlyEvenChange = () => {
    setOnlyEven(!onlyEven);
  };

  const handleCountryChange = (newCountry) => {
    setCountry(newCountry);
  };

  useEffect(() => {
    fetchContacts();
  }, [search, page, pageSize, onlyEven, country]);

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

      <div className="d-flex align-items-center">
        <label htmlFor="search" className="visually-hidden">
          Search
        </label>
        <input
          type="text"
          className="search p-2 mt-4"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div className="d-flex">
        <div className="col-8">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Phone</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  onClick={() => {
                    setData(contact);
                    setOpenModel(true);
                  }}
                >
                  <td>{contact.id}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.country?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {Array.from({ length: Math.ceil(totalCount / pageSize) }).map(
              (_, index) => (
                <button key={index} onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              ),
            )}
          </div>

          <div className="mt-3">
            <input
              type="checkbox"
              id="onlyEven"
              checked={onlyEven}
              onChange={handleOnlyEvenChange}
            />
            <label htmlFor="onlyEven" className="ms-2">
              Only even
            </label>
          </div>
        </div>
        <div className="col-3 m-3">
          <ModelC
            data={data}
            isOpen={openModel}
            onClose={() => setOpenModel(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default ModelB;
