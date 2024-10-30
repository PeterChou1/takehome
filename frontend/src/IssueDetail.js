import * as React from 'react';
import { GetIssueDetail, UpdateIssueDetail, DeleteIssue } from "./API"
import IssueForm from "./components/IssueForm"
import IssueCard from "./components/IssueCard"
import { useParams, useLoaderData, useRevalidator } from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';


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

export async function loader({ params }) {
    const issueDetail = await GetIssueDetail(params.issueId);
    return { issueDetail };
}


function IssueDetail() {
    const { issueId } = useParams();
    const { revalidate } = useRevalidator();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { issueDetail } = useLoaderData();
    const { title, description, status, priority } = issueDetail;

    const submitCallback = async (title, description, status, priority) => {
        await UpdateIssueDetail(issueId, title, description, status, priority);
        handleClose();
        revalidate();
    }

    return (
        <Box sx={{ flexGrow: 1, margin : 10 }}>
            <Fab color="primary" aria-label="add"
                onClick={handleOpen}
            >
                <EditNoteIcon/>
            </Fab>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IssueForm handleSubmit={submitCallback} current={{title, description, status, priority}} />
                </Box>
            </Modal>
            <Box sx={{ p: 2 }}>
                <Stack
                direction="row"
                sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                >
                <Typography gutterBottom variant="h5" component="div">
                    Issue: {title}
                </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {description}
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="body2">
                Status
                </Typography>
                <Chip color="primary" label={status} size="small" />
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="body2">
                Priority
                </Typography>
                <Chip color="primary" label={priority} size="small" />
            </Box>
        </Box>
    )
}

export default IssueDetail;