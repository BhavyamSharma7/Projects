import { useRef, useState } from 'react';
import {Form, Card, Button, Alert} from 'react-bootstrap';
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from 'react-router-dom';
import CenteredContainer from '../CenteredContainer';

function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const {login} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);   
            navigate("/");
        } catch (error) {
            setError("Failed signing in to account"); 
            console.log(error);
        }

        setLoading(false);
    }

    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
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
                        <Button disabled={loading} variant="primary" className="w-100" type="submit">
                            Log In
                        </Button>
                    </Form>
                    <div className="text-center mt-3 w-100">
                        <Link to="/forgot-password">Forgot Password</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                   Don't have an account? <Link to="/signup">Register here</Link>
            </div>
        </CenteredContainer>
    );
}

export default Login;