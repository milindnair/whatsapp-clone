import React from 'react'
import { UploadModalProps } from './index.interface'
import { Button, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'next/navigation';
import { handleUpload } from '@/lib/firebase/StorageHelper';

const UploadModal:React.FC<UploadModalProps> = ({handleClose}) => {
  const [file, setFile] = React.useState<File | null>(null);
  const params = useParams();
  return (
    <div className='mt-4 flex flex-col gap-2'>
      <div className="flex items-center gap-2">
        <Button variant="outlined" component="label">
          Upload File
          <input
            type="file"
            hidden
            accept='/image/*'
            multiple
            onChange={
              (e) => {
                if(e.target.files === null) return;
                setFile(e.target.files[0]);
              }}
          />
        </Button>
        {file !==null ? (
          <>
            <span>{file?.name}</span>
            <CloseIcon onClick={() => setFile(null)} className='cursor-pointer text-red-700'/>
          </>
        ): null}
        <Button variant="contained" component="label" disabled={file === null} onClick={() => handleUpload(params?.id,setFile,handleClose,file)}>
          Submit File

        </Button>
      </div>
    </div>
  )
}

export default UploadModal;