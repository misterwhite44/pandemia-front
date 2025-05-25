import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Input,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const Dataset = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // ici tu peux appeler ton API pour envoyer le fichier
      console.log('Fichier sélectionné :', selectedFile.name);
      // reset si besoin
      setSelectedFile(null);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Gestion des Datasets
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Importer des fichiers CSV contenant des données épidémiologiques.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Input
            type="file"
            inputProps={{ accept: '.csv' }}
            onChange={handleFileChange}
          />

          {selectedFile && (
            <Typography variant="body2" color="text.secondary">
              Fichier sélectionné : {selectedFile.name}
            </Typography>
          )}

          <Button
            variant="contained"
            aria-label="Importer le fichier"
            color="primary"
            startIcon={<UploadFileIcon />}
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Importer le fichier
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Dataset;
