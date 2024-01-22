import React from 'react'
import { Link } from 'react-router-dom';

const ModelB = () => {
  return (
    <div>
      <div className="d-flex justify-content-center gap-3">
        <Link to="/modelA" className="btn btn-lg buttonA">
          All Contacts
        </Link>

        <Link to="/modelB" className="btn btn-lg buttonB">
          US Contacts
        </Link>

        <Link to="/problem-2" className="btn btn-lg buttonC">
          Close
        </Link>
      </div>
    </div>
  );
}

export default ModelB