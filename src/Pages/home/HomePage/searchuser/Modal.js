import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Modals = ({ open, handleClose, emlplo }) => {
    console.log(emlplo);
    function refreshPage() {
        window.location.reload(false);
    }
    const handleConfirme = async () => {
        try {
          await axios.delete(`http://localhost:8000/emlploye/${emlplo}`);
          refreshPage();
        } catch (error) {}
      };
    return (
        <div>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                      Etes-vous sur de vouloir supprimer?
                    </Typography>
                    <Box display="flex" justifyContent="space-between">
                        <Button
                         onClick={handleClose}
                        >
                            Annuller
                        </Button>
                        <Button
                        onClick={handleConfirme}
                        >
                            Confirmer
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
export default Modals;