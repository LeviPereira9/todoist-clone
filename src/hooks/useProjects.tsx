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

// Define o tipo de dados que a coleção 'projects' armazena.
import { Projects } from '../types/myType';

const useProjects = () => {
  // Estado inicial dos projetos como um array vazio
  const [projects, setProjects] = useState<Projects[]>([]);

  useEffect(() => {
    // Cria uma referência para a coleção 'projects' no Firebase
    const projectsCollectionRef: CollectionReference<Projects> = collection(
      db,
      'projects',
    ) as CollectionReference<Projects>;

    // Cria uma query para filtrar os projetos por usuário e ordená-los por ID
    const projectQuery = query<Projects>(
      projectsCollectionRef,
      where('userId', '==', 'wTJzDkRGVShfYX9L'),
      orderBy('projectId'),
    );

    // Define uma função assíncrona fetchProjects para buscar os projetos
    const fetchProjects = async () => {
      // Executa a query para buscar os projetos
      const projectData = await getDocs<Projects>(projectQuery);

      // Transforma os dados dos projetos para um objeto com os dados e o ID do documento
      const allProjects = projectData.docs.map(project => ({
        ...project.data(),
        docId: project.id,
      }));

      // Verifica se houve mudança nos projetos e atualiza o estado se necessário
      if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
        setProjects(allProjects);
      }
    };

    //Chama a função fetchProjects para buscar os projetos
    fetchProjects();
  }, [projects]); // Define a dependência do efeito como o estado de projeto

  // Retorna um objeto com os projetos e a função para atualizá-los
  return { projects, setProjects };
};

export { useProjects };
