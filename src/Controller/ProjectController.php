<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Project;
use App\Entity\Catalogue;
/**
 * @Route("/api", name="api_")
 */
class ProjectController extends AbstractController
{
    /**
     * @Route("/project", name="project_index", methods={"GET"})
     */
    public function index(ManagerRegistry $doctrine): Response
    {
        $products = $doctrine
            ->getRepository(Project::class)
            ->findAll();
   
        $data = [];
   
        foreach ($products as $product) {
            if(!is_null($product->getCatalogue()))
            {
                $catalogue=[
                    'name'=>$product->getCatalogue()->getName(),
                    'id'=>$product->getCatalogue()->getId()
                   ];
            }
            else
            {
                $catalogue=[
                    'name'=>'',
                    'id'=>''
                   ];
            }
          
            $data[] = [
               'id' => $product->getId(),
               'name' => $product->getName(),
               'description' => $product->getDescription(),
               'catalogue'=>$catalogue
           ];
        }

        return $this->json($data);
    }

     /**
     * @Route("/project", name="project_new", methods={"POST"})
     */
    public function new(ManagerRegistry $doctrine, Request $request): Response
    {
        $entityManager = $doctrine->getManager();

        $catalogue = $doctrine->getRepository(Catalogue::class)->find($request->request->get('catalogue'));

   
        $project = new Project();
        $project->setName($request->request->get('name'));
        $project->setDescription($request->request->get('description'));
        $project->setCatalogue($catalogue);
        
        $entityManager->persist($project);
        $entityManager->flush();
   
        return $this->json('Created new project successfully with id ' . $project->getId());
    }

     /**
     * @Route("/project/{id}", name="project_show", methods={"GET"})
     */
    public function show(ManagerRegistry $doctrine, int $id): Response
    {
        $project = $doctrine->getRepository(Project::class)->find($id);
   
        if (!$project) {
   
            return $this->json('No project found for id' . $id, 404);
        }

        if(!is_null($project->getCatalogue()))
        {
            $catalogue=[
                'name'=>$project->getCatalogue()->getName(),
                'id'=>$project->getCatalogue()->getId()
               ];
        }
        else
        {
            $catalogue=[
                'name'=>'',
                'id'=>''
               ];
        }
   
        $data =  [
            'id' => $project->getId(),
            'name' => $project->getName(),
            'description' => $project->getDescription(),
            'catalogue'=>$catalogue
        ];
           
        return $this->json($data);
    }


      /**
     * @Route("/project/{id}", name="project_edit", methods={"PUT", "PATCH"})
     */
    public function edit(ManagerRegistry $doctrine, Request $request, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $project = $entityManager->getRepository(Project::class)->find($id);

   
        if (!$project) {
            return $this->json('No project found for id' . $id, 404);
        }
         
        $content = json_decode($request->getContent());

        $catalogue = $doctrine->getRepository(Catalogue::class)->find($content->catalogue);

        $project->setName($content->name);
        $project->setDescription($content->description);
        $project->setCatalogue($catalogue);
        $entityManager->flush();

        if(!is_null($project->getCatalogue()))
        {
            $catalogue=[
                'name'=>$project->getCatalogue()->getName(),
                'id'=>$project->getCatalogue()->getId()
               ];
        }
        else
        {
            $catalogue=[
                'name'=>'',
                'id'=>''
               ];
        }
   
        $data =  [
            'id' => $project->getId(),
            'name' => $project->getName(),
            'description' => $project->getDescription(),
            'catalogue'=>$catalogue
        ];
           
        return $this->json($data);
    }


     /**
     * @Route("/project/{id}", name="project_delete", methods={"DELETE"})
     */
    public function delete(ManagerRegistry $doctrine, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $project = $entityManager->getRepository(Project::class)->find($id);
   
        if (!$project) {
            return $this->json('No project found for id' . $id, 404);
        }
   
        $entityManager->remove($project);
        $entityManager->flush();
   
        return $this->json('Deleted a project successfully with id ' . $id);
    }
}
