import React, { useState } from "react";
import "./cribHund.css";
import { Form } from "react-bootstrap";

import CribList from "./CribList";

const CribHound = () => {

    return (
        <div className="container">
            {/* <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6 text-center">
                    <Form>
                        <input className="form-control search-box" type="text" placeholder="Search by name" />
                    </Form>
                </div>
                <div className="col-md-3"></div>
            </div> */}
            <CribList />
        </div>
    )
}

export default CribHound;