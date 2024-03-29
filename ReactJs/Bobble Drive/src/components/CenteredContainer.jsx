import { Container } from "react-bootstrap";

const CenteredContainer = ({children}) => {
    return (
        <Container style={{minHeight: "100vh"}} className="d-flex align-items-center justify-content-center">
            <div className="w-100" style={{ maxWidth: "400px" }}>
                {children}
            </div>
        </Container>
    );
}

export default CenteredContainer;
