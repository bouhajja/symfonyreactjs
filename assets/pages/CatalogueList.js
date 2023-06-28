import React,{ useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
 
function CatalogueList() {
    const  [catalogueList, setCatalogueList] = useState([])
  
    useEffect(() => {
        fetchCatalogueList()
    }, [])
  
    const fetchCatalogueList = () => {
        axios.get('/api/catalogue')
        .then(function (response) {
            setCatalogueList(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/catalogue/${id}`)
                .then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Catalogue deleted successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    fetchProjectList()
                })
                .catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'An Error Occured!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
            }
          })
    }
  
    return (
        <Layout>
           <div className="container">
            <h2 className="text-center mt-5 mb-3">Symfony Project Manager</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-primary"
                            to="/catalogue/create">Create New Catalogue
                        </Link>
                    </div>
                    <div className="card-body">
              
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                 
                                    <th width="240px">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {catalogueList.map((catalogue, key)=>{
                                    return (
                                        <tr key={key}>
                                            <td>{catalogue.name}</td>
                                    
                                            <td>
                                                <Link
                                                    to={`/catalogue/show/${catalogue.id}`}
                                                    className="btn btn-outline-info mx-1">
                                                    Show
                                                </Link>
                                                <Link
                                                    className="btn btn-outline-success mx-1"
                                                    to={`/catalogue/edit/${catalogue.id}`}>
                                                    Edit
                                                </Link>
                                                <button 
                                                    onClick={()=>handleDelete(catalogue.id)}
                                                    className="btn btn-outline-danger mx-1">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <Link
                                                    to={`/`}
                                                    className="btn btn-outline-info mx-1">
                                                    retour page acceuil
                                                </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default CatalogueList;