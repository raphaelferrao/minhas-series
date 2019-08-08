import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Generos = () => {
    const [data, setData] = useState([]);

    // executa apenas uma vez
    useEffect( () => {
        axios.get('/api/genres')
            .then( (res) => {
               setData(res.data.data);
            } );
    }, []);

    const deleteGenero = (id) => {
        console.log(id);
        axios.delete(`/api/genres/${id}`)
            .then( res => {
                console.log(res);
                const generosAtualizado = data.filter( (item) => { return item.id !== id });
                setData(generosAtualizado);
            });
    };

    const renderizaLinha = (record) => {
        return (
            <tr key={record.id} >
                <th scope="row">{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <Link to={`generos/${record.id}`} className="btn btn-warning" >Editar</Link>
                    &nbsp;
                    <button className="btn btn-danger" onClick={() => deleteGenero(record.id)}  >Remover</button>
                </td>
            </tr>  
        );
    };

    if ( data.length === 0 ) {
        return (
            <div className="container" >
                <h1>Gêneros</h1>
                <div className="alert alert-warning" role="alert">
                    Você não possui gêneros criados!
                </div>
            </div>
        );
    }

    return (
        <div className="container" >
            <h1>Gêneros</h1>
            <div><Link to="/generos/novo" className="btn btn-primary" >Novo Gênero</Link></div>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                   { data.map(renderizaLinha) }
                </tbody>
            </table>
        </div>
    );
};

export default Generos;