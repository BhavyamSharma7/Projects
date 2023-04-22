import { Button, Form, Modal } from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faFolderPlus} from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { database } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { ROOT_FOLDER } from '../../hooks/useFolder';

const FolderButton = ({currentFolder}) => {

    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState("");
    const { currentUser } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentFolder === null) return;

        // create a folder in the database
        const path = [...currentFolder.path];
        if (currentFolder !== ROOT_FOLDER) {
            path.push({name: currentFolder.name, id: currentFolder.id})
        }
        database.folders.add({
            name: name,
            parentId: currentFolder.id,
            userId: currentUser.uid,
            path: path,
            createdAt: database.getCurrentTimestamp(),
        });
        setName("");
        setOpenModal(false);
    }

    return (
        <>
            <Button onClick={()=>setOpenModal(true)} variant="outline-success" size="md" >
                <FontAwesomeIcon icon={faFolderPlus}/>
            </Button>
            <Modal show={openModal} onHide={()=>setOpenModal(false)}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Folder Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>setOpenModal(false)} >Cancel</Button>
                        <Button variant="success" type="submit" >Add Folder</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default FolderButton;
