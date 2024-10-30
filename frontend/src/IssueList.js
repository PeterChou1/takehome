import * as React from 'react';
import { ListAllIssue, CreateNewIssue, DeleteIssue } from "./API"
import IssueForm from "./components/IssueForm"
import IssueCard from "./components/IssueCard"
import { useLoaderData, useNavigate, useRevalidator} from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

  
export async function loader() {
    const issues = await ListAllIssue();
    return { issues };
}


export default function IssueList() {
    const { issues } = useLoaderData();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { revalidate } = useRevalidator();

    const deleteCallback = async (id) => {
        await DeleteIssue(id);
        revalidate();
    }

    const submitCallback = async (title, description, status, priority) => {
        await CreateNewIssue(title, description, status, priority);
        handleClose();
        revalidate();
    }

    return (
        <Box sx={{ flexGrow: 1, margin : 10 }}>
            <Fab color="primary" aria-label="add"
                onClick={handleOpen}
            >
                <AddIcon/>
            </Fab>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IssueForm handleSubmit={submitCallback} />
                </Box>
            </Modal>
            <Stack style={{padding: 10}} spacing={2}>
                {issues.map( issue => {
                    const { id, title, status, priority } = issue;
                    return (
                        <div key={id}>
                            <IssueCard info={{ id, title, status, priority }} deleteHandle={deleteCallback} />
                        </div>
                    )
                })}
            </Stack>
        </Box>
    )
}
