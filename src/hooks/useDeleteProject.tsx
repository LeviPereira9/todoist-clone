//React
import { useState } from 'react';

//Firebase
import { db, deleteDoc } from '../firebase';
import { doc } from 'firebase/firestore';

//Delete Hook

const useDeleteProject = () => {
  const [loadingDel, setLoadingDel] = useState(false);
  const [errorDel, setErrorDel] = useState(null);

  const deleteProject = async (docId: string) => {
    setLoadingDel(true);
    setErrorDel(null);

    try {
      const deleteDocRef = doc(db, 'projects', docId);

      await deleteDoc(deleteDocRef);
    } catch (errorDel: any) {
      setErrorDel(errorDel);
    }
  };

  return { loadingDel, errorDel, deleteProject };
};

export { useDeleteProject };
