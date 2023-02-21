//React
import { useState, useEffect } from 'react';

//Firebase
import { db, collection } from '../firebase';
import {
  CollectionReference,
  query,
  where,
  getDocs,
  orderBy,
} from 'firebase/firestore';

//date
import moment from 'moment';

//Verificador de projetos
import { collatedTasksExist } from '../helpers';

// Define o tipo de dados que a coleção 'tasks' armazena.
type tasksType = {
  archived: boolean;
  date: string;
  projectId: string;
  task: string;
  userId: string;
};

// Essa função verifica se existe uma coleção de tarefas (tasks) agrupadas por projeto

const useTasks = (selectedProject: string | number) => {
  const [tasks, setTasks] = useState<tasksType[]>([]);
  const [archivedTasks, setArchivedTasks] = useState<tasksType[]>([]);

  // Define um efeito colateral que será executado quando o componente for montado e sempre que a propriedade `selectedProject` mudar
  useEffect(() => {
    const fetchTask = async () => {
      // Cria uma referência para a coleção 'tasks' no Firebase
      const tasksCollectionRef: CollectionReference<tasksType> = collection(
        db,
        'tasks',
      ) as CollectionReference<tasksType>;

      // Cria uma query para buscar todas as tarefas do usuário.
      let tasksQuery = query<tasksType>(
        tasksCollectionRef,
        where('userid', '==', 'wTJzDkRGVShfYX9L'),
      );

      if (selectedProject && !collatedTasksExist(selectedProject)) {
        // Se a propriedade `selectedProject` for verdadeira e não existir uma coleção de tarefas agrupadas por projeto
        tasksQuery = query<tasksType>( // Cria uma query para buscar todas as tarefas do usuário que pertencem ao projeto selecionado
          tasksCollectionRef,
          where('userId', '==', 'wTJzDkRGVShfYX9L'),
          where('projectId', '==', selectedProject),
        );
      } else if (selectedProject === 'TODAY') {
        // Se a propriedade `selectedProject` for igual a 'TODAY'
        tasksQuery = query<tasksType>(
          tasksCollectionRef,
          where('userId', '==', 'wTJzDkRGVShfYX9L'),
          where('date', '==', moment().format('DD/MM/YYYY')),
        );
      } else if (selectedProject === 'INBOX' || selectedProject === 0) {
        // Se a propriedade `selectedProject` for igual a 'INBOX' ou igual a 0
        tasksQuery = query<tasksType>( // Cria uma query para buscar todas as tarefas do usuário que ainda não têm data
          tasksCollectionRef,
          where('userId', '==', 'wTJzDkRGVShfYX9L'),
          where('date', '==', ''),
        );
      }

      const unsubscribe = await getDocs<tasksType>(tasksQuery);

      const newTasks = unsubscribe.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredTasks = newTasks.filter(task => task.archived !== true);
      const filteredArchivedTasks = newTasks.filter(
        task => task.archived !== false,
      );

      setTasks(
        selectedProject === 'NEXT_7'
          ? filteredTasks.filter(
              task =>
                moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7,
            )
          : filteredTasks,
      );
      setArchivedTasks(filteredArchivedTasks);
    };

    //Por fim, a função fetchTask é executada sempre que selectedProject é atualizado. Isso permite que a lista de tarefas seja atualizada sempre que um novo projeto é selecionado.

    fetchTask();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

const useProjects = async () => {
  const [projects, setProjects] = useState<tasksType[]>([]);

  useEffect(() => {
    // Cria uma referência para a coleção 'tasks' no Firebase
    const tasksCollectionRef: CollectionReference<tasksType> = collection(
      db,
      'tasks',
    ) as CollectionReference<tasksType>;

    const projectQuery = query<tasksType>(
      tasksCollectionRef,
      where('userId', '==', 'wTJzDkRGVShfYX9L'),
      orderBy('projectId'),
    );

    const fetchProjects = async () => {
      const projectData = await getDocs<tasksType>(projectQuery);

      const allProjects = projectData.docs.map(project => ({
        ...project.data(),
        docId: project.id,
      }));

      if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
        setProjects(allProjects);
      }
    };

    fetchProjects();
  }, [projects]);
  return { projects };
};

export { useTasks, useProjects };
