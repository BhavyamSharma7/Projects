import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const Folder = ({folder}) => {
    return (
        <Button
            variant="outline-dark"
            className="d-flex align-items-center mt-3 p-2 text-truncate w-100"
            as={Link}
            to={{
                pathname: `/folder/${folder.id}`,
                state: { folder: folder },
            }}
        >
            <FontAwesomeIcon icon={faFolder} style={{marginRight: "10px", fontSize: "18px"}} />
            {folder.name}
        </Button>
    );
}

export default Folder;
