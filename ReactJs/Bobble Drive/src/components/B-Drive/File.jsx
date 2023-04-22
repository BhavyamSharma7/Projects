import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const File = ({file}) => {
    return (
        <a href={file.url} target="_blank" className="btn btn-outline-dark text-truncate w-100 p-2 d-flex align-items-center mt-3">
            <FontAwesomeIcon style={{marginRight: "10px", fontSize: "18px"}} icon={faFile} className="me-2" />
            {file.name}
        </a>
    );
}

export default File;
