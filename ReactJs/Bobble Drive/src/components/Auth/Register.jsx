import { useRef, useState } from 'react';
import {Form, Card, Button, Alert} from 'react-bootstrap';
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from 'react-router-dom';
import CenteredContainer from '../CenteredContainer';

function Register() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const navigate = useNavigate();
    const {signup} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match!!");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate("/user");
        } catch (error) {
            setError("Failed to create an account"); 
            console.log(error);
        }

        setLoading(false);
    }

    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger" >{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                        </Form.Group>
                        <Form.Group className="mb-3" id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={passwordRef} type="password" placeholder="Enter Password" required />
                        </Form.Group>
                        <Form.Group className="mb-3" id="password-confirm">
                        <Form.Label>Confirm Password</Form.Label>
                            <Form.Control ref={passwordConfirmRef} type="password" placeholder="Enter Password again" required />
                        </Form.Group>
                        <Button disabled={loading} variant="primary" className="w-100" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                   Already have an account? <Link to="/login">Log In</Link> 
            </div>
        </CenteredContainer>
    );
}

export default Register;