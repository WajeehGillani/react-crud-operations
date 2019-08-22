import React from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    FormFeedback,
    Alert
} from "reactstrap";

class EditUser extends React.Component {
    state = {
        user: [],
        userId: this.props.match.params.id,
        showAlert: false,
        message: "",
        success: "",
    };
    componentDidMount(){
        this.getUsers();
        
    }
   

    getUsers = async () => {
        this.setState({ loading: true });
        const response = await fetch(
            `https://react-training-apis.herokuapp.com/api/users/${this.state.userId}`
        );
        const data = await response.json();
        this.setState({
            user: data.user
        });
        console.log(this.state.user.name);
    };




    render() {

        const Validation = Yup.object().shape({
            name: Yup.string()
                .required("Must not be empty")
                .min(3, "Not less than 3 characters ")
                .max(100, "Too Long"),
            email: Yup.string()
                .required("Must not be empty")
                .email("Must be Valid Email")
                .max(255, "Too Long"),
            gender: Yup.string().required("You have to select Gender!"),
            profession: Yup.string()
                .oneOf(["Dev", "Doctor", "Business Man"])
                .required("Please choose your Profession"),
            address: Yup.string()
                .required("Must not be empty")
                .min(3, "Not less than 3 characters ")
                .max(100, "Too Long")
        });
        return (
            <div>
                <Alert
                    isOpen={this.state.showAlert}
                    toggle={this.onDismiss}
                    fade
                    color={this.state.success ? `success` : `danger`}
                >
                    {this.state.message}
                </Alert>
                <h1>User User</h1>
                <Formik
                enableReinitialize
                    initialValues={{
                        name: this.state.user.name,
                        email: this.state.user.email,
                        gender: this.state.user.gender,
                        profession: this.state.user.profession,
                        address: this.state.user.address
                    }}
                    validationSchema={Validation}
                    onSubmit={(values, actions) => {
                        this.setState({
                            user: values
                        });
                        console.log(this.state.user)
                        actions.setSubmitting(true);

                        axios
                            .post(
                                `https://react-training-apis.herokuapp.com/api/users/${this.state.userId}/update`,
                                this.state.user
                            )
                            .then(res => {
                                console.log(res.data);
                                this.setState({
                                    showAlert: true,
                                    message: res.data.message,
                                    success: res.data.success,
                                    
                                });
                                if(this.state.success){
                                    this.props.history.push('/listings')
                                }
                               
                            })
                            .catch(error => {
                                console.log(error);
                              
                            });

                        actions.setSubmitting(false);
                        
                    }}
                    render={({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    }) => (
                            <Form onSubmit={handleSubmit}>
                                <FormGroup row>
                                    <Col md="6">
                                        <legend>Name</legend>

                                        <Input
                                            type="text"
                                            name="name"
                                            tag={Field}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                            invalid={errors.name && touched.name}
                                        />
                                        <FormFeedback tooltip>{errors.name}</FormFeedback>
                                    </Col>
                                    <Col md="6">
                                        <legend>Email</legend>
                                        <Input
                                            name="email"
                                            tag={Field}
                                            type="email"
                                            className="form-control"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            invalid={errors.email && touched.email}
                                        />
                                        <FormFeedback tooltip>{errors.email}</FormFeedback>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Col md="6">
                                        <legend>Gender</legend>
                                        <FormGroup check>
                                            <Label check>
                                                <Input
                                                    type="radio"
                                                    name="gender"
                                                    value="Male"
                                                    checked={values.gender}
                                                    onChange={handleChange}
                                                    invalid={errors.gender && touched.gender}
                                                />{" "}
                                                Male
                    </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input
                                                    type="radio"
                                                    name="gender"
                                                    value="Female"
                                                    checked={values.gender}
                                                    onChange={handleChange}
                                                    invalid={errors.gender && touched.gender}
                                                />{" "}
                                                Female
                    </Label>
                                        </FormGroup>

                                        <FormFeedback>{errors.gender}</FormFeedback>
                                    </Col>
                                    <Col md="6">
                                        <legend>Address</legend>
                                        <Input
                                            component="textarea"
                                            name="address"
                                            tag={Field}
                                            className="form-control"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.address}
                                            invalid={errors.address && touched.address}
                                        />
                                        <FormFeedback tooltip>{errors.address}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="6">
                                        <legend>Profession</legend>

                                        <Input
                                            type="select"
                                            name="profession"
                                            className="form-control"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.profession}
                                            invalid={errors.profession && touched.profession}
                                        >
                                            <option disabled>Choose</option>
                                            <option>Dev</option>
                                            <option>Doctor</option>
                                            <option>Business Man</option>
                                        </Input>
                                        <FormFeedback tooltip>{errors.profession}</FormFeedback>
                                    </Col>
                                </FormGroup>

                                <Button color="primary" type="submit">
                                    Submit
              </Button>
                            </Form>
                        )}
                />
               
            </div>
        );
    }
}

export default EditUser;
