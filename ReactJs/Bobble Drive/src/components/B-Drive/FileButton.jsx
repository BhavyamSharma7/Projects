import ReactDOM from "react-dom";
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { database, storage } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { ROOT_FOLDER } from '../../hooks/useFolder';
import { v4 as uuidV4 } from "uuid";
import { ProgressBar, Toast } from "react-bootstrap";


const FileButton = ({ currentFolder }) => {
    
    const [uploadingFiles, setUploadingFiles] = useState([]);
    const { currentUser } = useAuth();

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (currentFolder === null || file === null) return;
        
        const id = uuidV4();
        setUploadingFiles(prevUploadingFiles => [
            ...prevUploadingFiles,
            { id: id, name: file.name, progress: 0, error: false }
        ])
        const filePath = currentFolder === ROOT_FOLDER ?
            `${currentFolder.path.join("/")}/${file.name}` :
            `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`;
        
        const uploadTask = storage.ref(`/files/${currentUser.id}/${filePath}`).put(file);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = snapshot.bytesTransferred / snapshot.totalBytes;
                setUploadingFiles(prevUploadingFiles => {
                    return prevUploadingFiles.map(uploadFile => {
                        if (uploadFile.id === id) {
                            return {...uploadFile, progress: progress}
                        }

                        return uploadFile;
                    })
                });
            },
            () => {
                setUploadingFiles(prevUploadingFiles => {
                    return prevUploadingFiles.map(uploadFile => {
                        if (uploadFile.id === id) {
                            return {...uploadFile, error: true}
                        }

                        return uploadFile;
                    })
                });
            },
            () => {
                setUploadingFiles(prevUploadingFiles => {
                    return prevUploadingFiles.filter(uploadFile => {
                        return uploadFile.id !== id;
                    })
                })

                uploadTask.snapshot.ref.getDownloadURL().then(url => {
                    database.files
                        .where("name", "==", file.name)
                        .where("folderId", "==", currentFolder.id)
                        .where("userId", "==", currentUser.uid)
                        .get()
                        .then(existingFiles => {
                            const existingFile = existingFiles.docs[0];
                            if (existingFile && window.confirm("File Already exists! Do you want to replace the exixting file?")) {
                                existingFile.ref.update({ url: url });
                            } else {
                                database.files.add({
                                    url: url,
                                    name: file.name,
                                    createdAt: database.getCurrentTimestamp(),
                                    folderId: currentFolder.id,
                                    userId: currentUser.uid,
                                });
                            }
                        })
               }) 
            })
    }

    return (
        <>
            <label className="btn btn-outline-success btn-md m-2 me-2">
                <FontAwesomeIcon style={{fontSize: "16px"}} icon={faFileUpload} />
                <input
                    type="file"
                    onChange={handleFileUpload}
                    style={{opacity: 0, position: "absolute", float: "left"}}
                />
            </label>
            {uploadingFiles.length > 0 && 
                ReactDOM.createPortal(
                    <div
                        style={{position: "absolute", bottom: "1rem", right: "1rem", maxWidth: "250px"}}
                    >
                        {uploadingFiles.map(uploadingFile => (
                            <Toast key={uploadingFile.id}
                                onClose={() => setUploadingFiles(prevUploadingFiles => {
                                    return prevUploadingFiles.filter(uploadFile => {
                                        return uploadFile.id !== uploadingFile.id;
                                    })
                                })}
                            >
                                <Toast.Header closeButton={uploadingFile.error} className="text-truncate w-100 d-block">
                                    {uploadingFile.name}
                                </Toast.Header>
                                <Toast.Body>
                                    <ProgressBar
                                        animated={!uploadingFile.error}
                                        variant={uploadingFile.error ? "danger" : "primary"}
                                        now={uploadingFile.error ? 100 : uploadingFile.progress * 100}
                                        label={uploadingFile.error ? "Error" : `${Math.round(uploadingFile.progress*100)}%`}
                                    />
                                </Toast.Body>
                            </Toast>
                        ))}
                    </div>,
                    document.body
                )
            }
        </>
    );
}

export default FileButton;
