//Firebase
import { db, collection } from '../firebase';
import { CollectionReference, doc, updateDoc } from 'firebase/firestore';

//types
import { tasksType } from '../types/myType';

const Checkbox = ({ id }: { id: string }) => {
  //Atualização no FB, passa para arquivado(task concluida)
  const archiveTask = async () => {
    const tasksCollectionRef: CollectionReference<tasksType> = collection(
      db,
      'tasks',
    ) as CollectionReference<tasksType>;

    const taskDocRef = doc(tasksCollectionRef, id);

    await updateDoc<tasksType>(taskDocRef, { archived: true });
  };

  return (
    <div
      className="checkbox-holder"
      data-testid="checkbox-action"
      role="button"
      tabIndex={0}
      aria-label="Marcar tarefa como concluida"
      onClick={() => archiveTask()}
      //onKeyDown={()=>{...}}
    >
      <span className="checkbox"></span>
    </div>
  );
};

export default Checkbox;
