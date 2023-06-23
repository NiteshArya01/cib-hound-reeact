import { faEdit, faPen, faPenAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react"
import AddCribb from "./AddCrib";

import { deleteCrib, getcribList } from "../services/cribServices";
import { Form } from "react-bootstrap";

const CribList = () => {
    const initalInputs = {
        name: '',
        location: '',
        img: '',
        id: ''
    }
    const [listData, setListData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(initalInputs);
    const [modelType, setModelType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const openModal = (type, data) => {
        setModelType(type);
        setModalData(data);
        setShowModal(true);
    }
    const closeModal = (status) => {
        setModalData(initalInputs);
        setShowModal(false);

        if (status !== 'Close') {
            getcribListData();
        }

    }

    // fetch crib list
    const getcribListData = () => {
        getcribList().then(result => {
            setListData(result.data);
        })
    }

    // Preventing to loss data when page get refreshed .// we can achived it by some other method like redux 
    useEffect(() => {
        setListData(JSON.parse(window.sessionStorage.getItem('list')));
    }, []);

    useEffect(() => {
        getcribList().then(result => {
            window.sessionStorage.setItem("list", JSON.stringify(result.data));
        })
    }, [listData]);

    // delete record
    const handleDelete = (id) => {

        deleteCrib(id).then(result => {
            getcribListData();
        })
    }

    // custom serach
    useEffect(() => {
        // Use a timer variable to store the timeout ID
        let timer;

        // Define the debounce function
        const debounce = (callback, delay) => {
            clearTimeout(timer);
            timer = setTimeout(callback, delay);
        };

        // Define the search function that will be executed after debounce
        const performSearch = () => {
            // Perform your search request here
            // console.log('Performing search for:', searchTerm);


            if (searchTerm != '') {
                const regex = new RegExp(searchTerm, 'i'); // 'i' flag for case-insensitive search

                const filtered = listData.filter((item) => {
                    return regex.test(item.name);
                });

                setListData(filtered);
            }
            else {
                getcribListData();
            }

        };

        // Call the debounce function inside the useEffect hook
        debounce(performSearch, 500); // Adjust the delay as per your requirements

        // Clean up the timer when the component unmounts
        return () => {
            clearTimeout(timer);
        };
    }, [searchTerm]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    return (
        <>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6 text-center">
                    <Form>
                        <input className="form-control search-box" type="text" placeholder="Search by name" value={searchTerm} onChange={handleInputChange} />
                    </Form>
                </div>
                <div className="col-md-3"></div>
            </div>

            <div className="row  mt-4">
                <div className="col-md-9">
                    <h3>Crib List</h3>
                </div>
                <div className="col-md-3 text-end">
                    <button className="btn btn-primary" onClick={() => openModal('Add', initalInputs)}>Add Crib</button>
                </div>
            </div>

            <div className="card mt-4">
                <div className="card-body">
                    <table className="table ">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Location</th>
                                <th scope="col">File Url</th>
                                <th scope="col" className="text-center" style={{ width: "10%" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listData.map((item, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <th scope="row">{idx + 1}</th>
                                            <td>{item.name}</td>
                                            <td>{item.location}</td>
                                            <td>{item.img}</td>
                                            <td className="text-center" style={{ width: "10%" }}>
                                                <FontAwesomeIcon icon={faEdit} color="gray" style={{ cursor: 'pointer', marginRight: '5px' }} onClick={() => openModal('Edit', item)} />
                                                <FontAwesomeIcon icon={faTrash} color="red" style={{ cursor: 'pointer' }} onClick={() => handleDelete(item._id)} />
                                            </td>
                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                </div>
            </div>


            <AddCribb show={showModal} onClose={closeModal} listdata={modalData} type={modelType} />
        </>
    )
}

export default CribList;
