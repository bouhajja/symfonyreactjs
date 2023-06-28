import React, {useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
  
function ProjectCreate() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [catalogueList, setCatalogueList] = useState([])
    const [catalogue, setCatalogue] = useState('')
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
    const handleSave = () => {
        setIsSaving(true);
        let formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        formData.append("catalogue", catalogue)
       
        axios.post('/api/project', formData)
          .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Project saved successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
            setName('')
            setDescription('')
          })
          .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false)
          });
    }
  
    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Create New Project</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-info float-right"
                            to="/">View All Projects
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input 
                                    onChange={(event)=>{setName(event.target.value)}}
                                    value={name}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea 
                                    value={description}
                                    onChange={(event)=>{setDescription(event.target.value)}}
                                    className="form-control"
                                    id="description"
                                    rows="3"
                                    name="description"></textarea>
                            </div>

                            <div className="form-group">

                            <label htmlFor="description">Catalogue</label>
                            <select 
                            onChange={(event)=>{setCatalogue(event.target.value)}}
                            value={catalogue} className='form-control' name='catalogue'>
                            {catalogueList.map((catalogue, key)=>{
                                    return (
                               <option key={key} value={catalogue.id}>{catalogue.name}</option>
                                    )
                                })}
                            </select>

                            </div>
                            <button 
                                disabled={isSaving}
                                onClick={handleSave} 
                                type="button"
                                className="btn btn-outline-primary mt-3">
                                Save Project
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default ProjectCreate;