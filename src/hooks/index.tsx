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
  onSnapshot,
  QuerySnapshot,
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

// Define o tipo de dados que a coleção 'projects' armazena.
type projectsType = {
  name: string;
  projectId: string;
  userId: string;
}

// Essa função verifica se existe uma coleção de tarefas (tasks) agrupadas por projeto

const useTasks = (selectedProject: string) => {
  const [tasks, setTasks] = useState<tasksType[]>([]);
  const [archivedTasks, setArchivedTasks] = useState<tasksType[]>([]);

  // Define um efeito colateral que será executado quando o componente for montado e sempre que a propriedade `selectedProject` mudar
  useEffect(() => {
    // Cria uma referência para a coleção 'tasks' no Firebase
    const tasksCollectionRef: CollectionReference<tasksType> = collection(
      db,
      'tasks',
    ) as CollectionReference<tasksType>;

    // Cria uma query para buscar todas as tarefas(tasks) do usuário.
    let tasksQuery = query<tasksType>(
      tasksCollectionRef,
      where('userid', '==', 'wTJzDkRGVShfYX9L'),
    );

    if (selectedProject && !collatedTasksExist(selectedProject)) {
      // Se a propriedade `selectedProject` for verdadeira e não existir uma coleção de tarefas(tasks) agrupadas por projeto
      tasksQuery = query<tasksType>( // Cria uma query para buscar todas as tarefas(tasks) do usuário pelo projectId que corresponda ao selectProject.
        tasksCollectionRef,
        where('userId', '==', 'wTJzDkRGVShfYX9L'),
        where('projectId', '==', selectedProject),
      );
    } else if (selectedProject === 'TODAY') {
      // Se a propriedade `selectedProject` for igual a 'TODAY'
      tasksQuery = query<tasksType>(// Query pela data de hoje.
        tasksCollectionRef,
        where('userId', '==', 'wTJzDkRGVShfYX9L'),
        where('date', '==', moment().format('DD/MM/YYYY')),
      );
    } else if (selectedProject === 'INBOX' || selectedProject === '0') {
      // Se a propriedade `selectedProject` for igual a 'INBOX' ou igual a 0
      tasksQuery = query<tasksType>( // Cria uma query para buscar todas as tarefas(tasks) do usuário que ainda não têm data
        tasksCollectionRef,
        where('userId', '==', 'wTJzDkRGVShfYX9L'),
        where('date', '==', ''),
      );
    }

    // Usa a função onSnapshot para obter uma atualização em tempo real da tasksQuery
    const unsubscribe = onSnapshot<tasksType>(
      tasksQuery,
      (snapshot: QuerySnapshot<tasksType>) => {
        const newTasks = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filtro paras tarefas(tasks) não arquivadas e armazenadas em filteredTasks e as tarefas arquivadas (archivedTasks) armazenadas em filteredArchivedTasks.
        const filteredTasks = newTasks.filter(task => task.archived !== true);
        const filteredArchivedTasks = newTasks.filter(
          task => task.archived !== false,
        );
        // As tarefas(tasks) filtradas vão para setTasks, com uma condição que se a tarefa (task) pertence ao projeto selecionado (selectedProject) e que estão atrasadas há menos de 7 dias. 
        setTasks(
          selectedProject === 'NEXT_7'
            ? filteredTasks.filter(
                task =>
                  moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7,
              )
            : filteredTasks,
        );
        // O estado das tarefas arquivadas (archivedTasks) é atualizado com setArchivedTasks.
        setArchivedTasks(filteredArchivedTasks);
      },
    );

    // Retorna o unsubscribe, a fim de cancelar a atualização em tempo real quando o componente que usa o hook é desmontado ou atualizado.
    return () => unsubscribe();
  }, [selectedProject]);

  //  Retorna os objetos com os dados das tasks e tasks arquivados.
  return { tasks, archivedTasks };
};

// Hook que retorna uma lista de projetos e uma função para atualizá-la
const useProjects = () => {
  // Estado inicial dos projetos como um array vazio
  const [projects, setProjects] = useState<projectsType[]>([]);

  useEffect(() => {
    // Cria uma referência para a coleção 'projects' no Firebase
    const projectsCollectionRef: CollectionReference<projectsType> = collection(
      db,
      'projects',
    ) as CollectionReference<projectsType>;

    // Cria uma query para filtrar os projetos por usuário e ordená-los por ID
    const projectQuery = query<projectsType>(
      projectsCollectionRef,
      where('userId', '==', 'wTJzDkRGVShfYX9L'),
      orderBy('projectId'),
    );

    // Define uma função assíncrona fetchProjects para buscar os projetos
    const fetchProjects = async ()=>{
      // Executa a query para buscar os projetos
      const projectData = await getDocs<projectsType>(projectQuery);

      // Transforma os dados dos projetos para um objeto com os dados e o ID do documento
      const allProjects = projectData.docs.map(project => ({
        ...project.data(),
        docId: project.id,
      }));

      // Verifica se houve mudança nos projetos e atualiza o estado se necessário
      if (JSON.stringify(allProjects) !== JSON.stringify(projects)){
        setProjects(allProjects);
      }
    }

    //Chama a função fetchProjects para buscar os projetos
    fetchProjects();
  }, [projects]); // Define a dependência do efeito como o estado de projeto

  // Retorna um objeto com os projetos e a função para atualizá-los
  return { projects };
};

// Exportando os Hooks.
export { useTasks, useProjects };
