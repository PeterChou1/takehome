import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { useNavigate  } from "react-router-dom";

export default function IssueCard({ info, deleteHandle }) {
    const { id, title, status, priority } = info;
    const navigate = useNavigate();
    const goToIssues = () => {
        navigate(`/issue/${id}`);
    };

    return (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Issue: {title}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{status}</Typography>
            <Chip label={priority} />
          </CardContent>
          <CardActions>
            <Button onClick={goToIssues} size="small">
                View Details
            </Button>
          </CardActions>
          <CardActions>
            <Button onClick={() => deleteHandle(id) }size="small">
                Delete
            </Button>
          </CardActions>
        </Card>
    );
}