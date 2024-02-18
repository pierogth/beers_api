import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { SortableTable } from '@/Components/Table/Table';
import TableBody from '@/Components/Table/TableBody';
import axios from 'axios';

export default function Dashboard({ auth }) {
    
    const [beers, setBeers] = useState([]);
      const [searchInput, setSearchInput] = useState(localStorage.getItem('search') ?? '');
     const [isFocused, toggleFocus] = useState(false);
  const toggleFocusLabel = () => toggleFocus(true);
  const toggleBlurLabel = (e) => {
    if (e.target.value === '') {
      toggleFocus(!isFocused);
    }
  };
   const [dataFilterOrderAndPaginate, setDataFilterOrderAndPaginate] = useState([]);
    
    const callInternalAPI = async () => {
        
    //await axios.get('/sanctum/csrf-cookie')
    axios.get('http://localhost:8000/api/beers', {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${auth.token}`
        }
    }).then(response => {
        console.log(response.data)
        const filteredArray = response.data.data.map(({  image_url, name, ph, tagline }) => ({ image_url, name, ph, tagline }));
        console.log(filteredArray)
        setBeers(filteredArray)
        setDataFilterOrderAndPaginate(filteredArray)

    }).catch(error => {
    // handle error
    });





    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Accesso avvenuto con successo! questo è il token generato: {auth.token}</div>
                        <div className="p-6 text-gray-900"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>callInternalAPI()}>
                            Clicca qui</button> per contattare api backend che controlla il token e fa da proxy verso api.punkapi.com</div>
                    </div>
                </div>
            </div>

            <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
                <input
              type="text"
              className={
                isFocused ? 'form-control focus--mouse' : 'form-control'
              }
              value={searchInput}
              onFocus={toggleFocusLabel}
              onBlur={toggleBlurLabel}
              id="input-group-1"
              name="input-group-1"
              placeholder={'Ricerca'}
              onChange={e => { setSearchInput(e.target.value); localStorage.setItem('search', e.target.value); }}
            />
            
           {beers[0] ? <SortableTable columns={dataFilterOrderAndPaginate && Object.keys(beers[0])}
                data={dataFilterOrderAndPaginate}
                setData={setDataFilterOrderAndPaginate}
                searchInput={searchInput}
              actions={false}>
              <TableBody   columns={beers && Object.keys(beers[0])}
                  data={dataFilterOrderAndPaginate}
                actions={[]}
              routes={''}>

              </TableBody>
              </SortableTable>:        <h2 className="font-semibold text-xl text-center text-gray-800 dark:text-gray-200 leading-tight">
Non ci sono dati</h2> }

          </div>
        </div>
      </div>
        </AuthenticatedLayout>
    );
}
