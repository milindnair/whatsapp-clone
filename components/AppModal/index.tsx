import { Box, Modal } from '@mui/material';
import React, { useEffect } from 'react';
import { Boxstyle } from './ModalStyles';
import { handlerModalChilderen } from './helper';
import { IconModalType } from './index.interface';
import { ContactsType } from '@/types';
import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore';
import { getSnapshotDoc, usersCollection } from '@/lib/firebase/userController';

type Props = {
    icon: JSX.Element;
    title: string;
    modalType: IconModalType;
};
const AppModal:React.FC<Props> = ({icon,title,modalType}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [contacts, setContacts] = React.useState<ContactsType[]>([]);
    
    useEffect(() => {
        onSnapshot(usersCollection, (snapshot:QuerySnapshot<DocumentData>) => {
            setContacts(snapshot.docs.map((doc) => getSnapshotDoc(doc)));
        });
    }, []);



  return (
    <div>
    <div onClick={handleOpen}>{icon}</div>
    <Modal open={open} onClose={handleClose}>
      <Box sx={Boxstyle}>
        <h1 className="text-xl font-bold">{title}</h1>
        {handlerModalChilderen(modalType, contacts, handleClose)}
      </Box>
    </Modal>
  </div>
  )
}

export default AppModal;