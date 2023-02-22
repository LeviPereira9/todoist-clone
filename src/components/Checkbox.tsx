//Firebase
import { db, collection } from '../firebase';
import { CollectionReference, query, doc, updateDoc } from 'firebase/firestore';

//types
import { tasksType } from '../types/myType';

const Checkbox = ({ id }: { id: string }) => {
  const archiveTask = async () => {
    const tasksCollectionRef: CollectionReference<tasksType> = collection(
      db,
      'tasks',
    ) as CollectionReference<tasksType>;

    const taskDocRef = doc(tasksCollectionRef, id);

    const taskDoc = await updateDoc<tasksType>(taskDocRef, { archived: true });
  };

  return (
    <div
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={() => archiveTask()}
    >
      <span className="checkbox"></span>
    </div>
  );
};

export default Checkbox;
