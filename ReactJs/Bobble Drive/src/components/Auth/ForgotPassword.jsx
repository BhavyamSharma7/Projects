import { useRef, useState } from 'react';
import {Form, Card, Button, Alert} from 'react-bootstrap';
import { useAuth } from "../../contexts/AuthContext";
import { Link } from 'react-router-dom';
import CenteredContainer from '../CenteredContainer';

function ForgotPassword() {

    const emailRef = useRef();

    const {resetPassword} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            setMessage("");
            setError("");
            setLoading(true);  
            await resetPassword(emailRef.current.value);
            setMessage("Instructions to reset password sent to your Email.");
        } catch (error) {
            setError("Failed to reset password!! Check Credentials and Try Again."); 
            console.log(error);
        }

        setLoading(false);
    }

    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Reset Password</h2>
                    {error && <Alert variant="danger" >{error}</Alert>}
                    {message && <Alert variant="success" >{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                        </Form.Group>
                        <Button disabled={loading} variant="primary" className="w-100" type="submit">
                            Reset Password
                        </Button>
                    </Form>
                    <div className="text-center mt-3 w-100">
                        Click here to <Link to="/login">Log In</Link> your account.
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                   Don't have an account? <Link to="/signup">Register here</Link>
            </div>
        </CenteredContainer>
    );
}

export default ForgotPassword;