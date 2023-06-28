import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
  
function ProjectEdit() {
    const [id, setId] = useState(useParams().id)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [catalogueList, setCatalogueList] = useState([])
    const [catalogue, setCatalogue] = useState('')
      
    useEffect(() => {
        fetchCatalogueList();
        axios.get(`/api/project/${id}`)
        .then(function (response) {
            let project = response.data
            setName(project.name);
            setDescription(project.description);
            setCatalogue(project.catalogue.id);
        })
        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
        })
          
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
        axios.patch(`/api/project/${id}`, {
            name: name,
            description: description,
            catalogue: catalogue
        })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Project updated successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
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
                <h2 className="text-center mt-5 mb-3">Edit Project</h2>
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
{
catalogueList.map((catal, key)=>{
    const isEqual=(catal.id==catalogue)?'selected':'';    
    return (
   <option key={key} selected={isEqual} value={catal.id}>{catal.name}</option>
        )
    })}
</select>

</div>
                            <button 
                                disabled={isSaving}
                                onClick={handleSave} 
                                type="button"
                                className="btn btn-outline-success mt-3">
                                Update Project
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default ProjectEdit;