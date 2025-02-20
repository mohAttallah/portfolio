'use client';

import { useState } from 'react';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

const ResumeButton: React.FC = () => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
  };

  return (
    <Button
      variant="contained"
      startIcon={downloaded ? <FileDownloadDoneIcon /> : <DownloadIcon />}
      href="attachments/resume.pdf"
      download
      onClick={handleDownload}
      disabled={downloaded}
      sx={{
        width: '150px',
        height: '40px',
        backgroundColor: downloaded ? 'green' : 'primary.main',
        color: 'white',
        textTransform: 'none',
        borderRadius: '4px',
        '&:hover': {
          backgroundColor: downloaded ? 'darkgreen' : 'primary.dark',
        },
        '&.Mui-disabled': {
          backgroundColor: 'darkgreen',
          color: 'lightgray',
        },
      }}
    >
      {downloaded ? 'Downloaded' : 'Resume'}
    </Button>
  );
};

export default ResumeButton;