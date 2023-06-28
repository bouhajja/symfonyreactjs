import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout"
import axios from 'axios';
  
function CatalogueShow() {
    const [id, setId] = useState(useParams().id)
    const [catalogue, setCatalogue] = useState({name:''})
    useEffect(() => {
        axios.get(`/api/catalogue/${id}`)
        .then(function (response) {
            setCatalogue(response.data)
        })
        .catch(function (error) {
          console.log(error);
        })
    }, [])
  
    return (
        <Layout>
           <div className="container">
            <h2 className="text-center mt-5 mb-3">Show Catalogue</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-info float-right"
                            to="/catalogue"> View All catalogues
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">Name:</b>
                        <p>{catalogue.name}</p>
                        
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default CatalogueShow;