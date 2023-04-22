import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { ROOT_FOLDER } from '../../hooks/useFolder';
import { Link } from 'react-router-dom';

const FolderBreadcrumbs = ({ currentFolder }) => {
    
    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
    if (currentFolder) {
        path = [...path, ...currentFolder.path];
    }

    return (
        <Breadcrumb className="flex-grow-1" listProps={{ className: "bg-white pl-0 m-0"}}>
            {path.map((folder, index) => (
                <Breadcrumb.Item
                    key={folder.id}
                    linkAs={Link}
                    className="text-truncate d-inline-block"
                    style={{ maxWidth: "200px" }}
                    linkProps={{
                        to: {
                            pathname: folder.id ? `/folder/${folder.id}` : "/",
                            state: {folder: {...folder, path: path.slice(1, index)}},
                        },
                    }}
                >
                    <h4 style={{padding: "0 5px"}}>{folder.name}</h4>
                </Breadcrumb.Item>
            ))}
            {currentFolder && (
                <Breadcrumb.Item
                    className="text-truncate d-flex"
                    style={{maxWidth: "200px"}}
                    active
                >
                    <h4>{currentFolder.name}</h4>
                </Breadcrumb.Item>
            )}
        </Breadcrumb>
    );
}

export default FolderBreadcrumbs;
