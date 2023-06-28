<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Catalogue;
/**
 * @Route("/api", name="api_")
 */
class CatalogueController extends AbstractController
{
    /**
     * @Route("/catalogue", name="catalogue_index", methods={"GET"})
     */
    public function index(ManagerRegistry $doctrine): Response
    {
        $products = $doctrine
            ->getRepository(Catalogue::class)
            ->findAll();
   
        $data = [];
   
        foreach ($products as $product) {
           $data[] = [
               'id' => $product->getId(),
               'name' => $product->getName()
           ];
        }

        return $this->json($data);
    }

     /**
     * @Route("/catalogue", name="catalogue_new", methods={"POST"})
     */
    public function new(ManagerRegistry $doctrine, Request $request): Response
    {
        $entityManager = $doctrine->getManager();
   
        $catalogue = new Catalogue();
        $catalogue->setName($request->request->get('name'));
   
        $entityManager->persist($catalogue);
        $entityManager->flush();
   
        return $this->json('Created new project successfully with id ' . $catalogue->getId());
    }

     /**
     * @Route("/catalogue/{id}", name="catalogue_show", methods={"GET"})
     */
    public function show(ManagerRegistry $doctrine, int $id): Response
    {
        $project = $doctrine->getRepository(Catalogue::class)->find($id);
   
        if (!$project) {
   
            return $this->json('No project found for id' . $id, 404);
        }
   
        $data =  [
            'id' => $project->getId(),
            'name' => $project->getName()
        ];
           
        return $this->json($data);
    }


      /**
     * @Route("/catalogue/{id}", name="catalogue_edit", methods={"PUT", "PATCH"})
     */
    public function edit(ManagerRegistry $doctrine, Request $request, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $project = $entityManager->getRepository(Catalogue::class)->find($id);
   
        if (!$project) {
            return $this->json('No project found for id' . $id, 404);
        }
         
        $content = json_decode($request->getContent());
        $project->setName($content->name);
        $entityManager->flush();
   
        $data =  [
            'id' => $project->getId(),
            'name' => $project->getName()
        ];
           
        return $this->json($data);
    }


     /**
     * @Route("/catalogue/{id}", name="catalogue_delete", methods={"DELETE"})
     */
    public function delete(ManagerRegistry $doctrine, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $project = $entityManager->getRepository(Catalogue::class)->find($id);
   
        if (!$project) {
            return $this->json('No project found for id' . $id, 404);
        }
   
        $entityManager->remove($project);
        $entityManager->flush();
   
        return $this->json('Deleted a project successfully with id ' . $id);
    }
}
