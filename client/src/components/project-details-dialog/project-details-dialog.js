import React from 'react'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'

const ProjectDetailsDialog = ({ projectId, openDialog, handleClose }) => {

    return (
        <Dialog
            fullWidth={true}
            maxWidth={'md'}
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle>
            <DialogContent>
                {projectId}
            </DialogContent>
        </Dialog>
    )
}

export default ProjectDetailsDialog