import { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap"
import { addNewCrib, updateCrib } from "../services/cribServices";
import { useForm } from "react-hook-form";

const AddCrib = ({ show, onClose, listdata, type }) => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    useEffect(() => {
        setValue('name', listdata.name);
        setValue('location', listdata.location);
        setValue("img", listdata.img);
    })

    const onSubmit = (data) => {
        if (type === "Add") {
            handleAddCrib(data);
        }
        else if (type == 'Edit') {
            handleEditCrib(data);
        }
    }

    // Add crib
    const handleAddCrib = (data) => {
        addNewCrib(data).then(result => {
            onClose('Created');

        }, err => {
            console.log(err)
        })
    }
    //Edit crib
    const handleEditCrib = (data) => {

        updateCrib(data, listdata._id).then(result => {
            onClose('Updated');
        }, err => {
            console.log(err)
        })
    }
    return (
        <>
            <Modal show={show} onHide={onClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{type}
                        Cirb</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="cribName">
                                    <Form.Label>Crib Name <span style={{ 'color': 'red' }}>*</span></Form.Label>
                                    <Form.Control
                                        placeholder='Crib Name'
                                        type="text"
                                        {...register("name", { required: true })}
                                    />
                                    {errors.name && <small className="denger">Please enter the Crib Name</small>}
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="location">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        placeholder='Location'
                                        type="text"
                                        {...register("location", { required: true })}
                                    />
                                    {errors.location && <small className="denger">Please enter the Location</small>}
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Form.Group className="mb-3" controlId="imageUrl">
                                    <Form.Label>Image Url</Form.Label>
                                    <Form.Control type="text" placeholder="http://wwww.xyz.com/image"
                                        {...register("img")}
                                    />
                                </Form.Group>
                            </div>
                        </div>


                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={() => onClose('Close')}>Close</button> <button className="btn btn-success" type="submit">Submit</button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default AddCrib;