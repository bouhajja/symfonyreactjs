import React, {useState} from 'react';
import { Link } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
  
function CatalogueCreate() {
    const [name, setName] = useState('');
    const [isSaving, setIsSaving] = useState(false)
  
    const handleSave = () => {
        setIsSaving(true);
        let formData = new FormData()
        formData.append("name", name)
       
        axios.post('/api/catalogue', formData)
          .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Catalogue saved successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
            setName('')
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
                <h2 className="text-center mt-5 mb-3">Create New catalogue</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-info float-right"
                            to="/catalogue">View All cATALOGUE
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
                            
                            <button 
                                disabled={isSaving}
                                onClick={handleSave} 
                                type="button"
                                className="btn btn-outline-primary mt-3">
                                Save CATALOGUE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default CatalogueCreate;