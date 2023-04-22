import React from 'react';
import Navbar from './BobbleNavbar';
import { Container } from 'react-bootstrap';
import FolderButton from './FolderButton';
import { useFolder } from '../../hooks/useFolder';
import Folder from "./Folder";
import { useParams, useLocation } from 'react-router-dom';
import FolderBreadcrumbs from './FolderBreadcrumbs';
import FileButton from './FileButton';
import File from './File';


const Dashboard = () => {
    const { folderId } = useParams();
    const { state = {} } = useLocation().pathname;
    const { folder, childFolders, childFiles } = useFolder(folderId, state.folder);

    return (
        <>
            <Navbar />
            <Container fluid>
                <div className="d-flex align-items-center justify-center">
                    <FolderBreadcrumbs currentFolder={folder} />
                    <FolderButton currentFolder={folder} />
                    <FileButton currentFolder={folder} />
                </div>
                {childFolders.length > 0 && (
                    <div className="d-flex flex-column flex-wrap justify-content-evenly w-100">
                        {childFolders.map(childFolder => (
                            <div key={childFolder.id} style={{maxWidth: "150px"}}>
                                <Folder folder={childFolder} />
                            </div>
                        ))}
                    </div>
                )}
                {childFolders.length>0 && childFiles.length>0 && <hr/> }
                {childFiles.length > 0 && (
                    <div className="d-flex flex-column flex-wrap justify-content-evenly w-100">
                        {childFiles.map(childFile => (
                            <div key={childFile.id} style={{maxWidth: "150px"}}>
                                <File file={childFile} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </>
    );
}

export default Dashboard;
