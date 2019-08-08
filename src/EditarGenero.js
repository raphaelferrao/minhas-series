import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const EditarGenero = (props) => {
    console.log(props);

    const [name, setName] = useState('');
    const [success, setSuccess] = useState(false);
    const [msgError, setMsgError] = useState('');

    // executa apenas uma vez
    useEffect( () => {
        axios.get(`/api/genres/${props.match.params.id}`)
            .then( (res) => {
                setName(res.data.name);
            } );
    }, [props.match.params.id]);

    const onChangeName = (evt) => {
        /*
        console.log(evt);
        console.log(evt.target);
        console.log(evt.target.value);
        */
        setName(evt.target.value);
    };

    const save = () => {
        axios.put(`/api/genres/${props.match.params.id}`,
                {  
                    name: name
                }
            )
            .then( res => {
                console.log(res);
                if (res.status === 200) {
                    setSuccess(true);
                }
            })
            .catch( error => {
                // Error 😨
                if (error.response) {
                    /*
                    * The request was made and the server responded with a
                    * status code that falls out of the range of 2xx
                    */
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    setMsgError(`Status: ${error.response.status} - ${error.response.data}` );
                } else if (error.request) {
                    /*
                    * The request was made but no response was received, `error.request`
                    * is an instance of XMLHttpRequest in the browser and an instance
                    * of http.ClientRequest in Node.js
                    */
                    console.log(error.request);
                    setMsgError(error.request);
                } else {
                    // Something happened in setting up the request and triggered an Error
                    console.log('Error', error.message);
                    setMsgError(error.message);
                }
                console.log(error.config);
            });
    };

    if ( success ) {
        return (
            <Redirect to='/generos' />
        );
    }

    const msgSaveError = () => {
        if ( !success && msgError!=='' ) {
            return (
                <div className="alert alert-danger" role="alert">
                    <pre>Erro ao salvar novo gênero: {msgError}</pre>
                </div>
            );
        } else {
            return ;
        }
    };

    return (
        <div className="container" >
            <h1>Novo Gênero</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input  type="text" className="form-control" id="name" 
                            value={name} onChange={onChangeName}
                            placeholder="Nome do gênero" />
                </div>
                <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
                {msgSaveError()}
            </form>
        </div>
    );
};

export default EditarGenero;