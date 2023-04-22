import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CenteredContainer from '../CenteredContainer';

const UpdateProfile = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const passwordConfirmRef = useRef();
    const {currentUser, updateEmail, updatePassword} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match!!");
        }

        const promises = [];
        setError("");
        setLoading(true);
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value));
        }

        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));    
        }

        Promise.all(promises).then(() => {
            navigate("/user");
        }).catch(() => {
            setError("Failed to update account!");
        }).finally(() => {
            setLoading(false);
        });

        setLoading(false);
    }

    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger" >{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control defaultValue={currentUser.email} ref={emailRef} type="email" placeholder="Enter email" required />
                        </Form.Group>
                        <Form.Group className="mb-3" id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={passwordRef} type="password" placeholder="Leave Blank to keep the same." />
                        </Form.Group>
                        <Form.Group className="mb-3" id="password-confirm">
                        <Form.Label>Confirm Password</Form.Label>
                            <Form.Control ref={passwordConfirmRef} type="password" placeholder="Leave Blank to keep the same." />
                        </Form.Group>
                        <Button disabled={loading} variant="primary" className="w-100" type="submit">
                            Update
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                   <Link to="/user">Cancel</Link> 
            </div>
        </CenteredContainer>
    );
}

export default UpdateProfile;
