import React from 'react';
import { useState, useEffect } from 'react';

const Table = () => {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(false);

    async function fetchAPI() {
        try {
            const resp = await fetch('http://127.0.0.1:8000/api/lead/', {
            headers: {
                "Content-Type": "application/json"
                  }}
                )
            const data = await resp.json();
            setData(data)
            setLoad(true);
        }
        catch(e) {
           throw new Error(e) 
        }
    }
   
    useEffect(() => {
        const interval = setInterval(fetchAPI, 60000);
        return () => clearInterval(interval);
    }, [])
    
    return (
        <div>
            <div className='feedbacktable'>
                <table id='customers'>              
                    <thead>
                        <td>Txn Hash</td>
                        <td>Txn Fee</td>
                        <td>Status</td>
                    </thead>
                    
                    {
                        load && data.map((str => (
                            <tbody>
                                <tr key={str.id}>
                                    <td>{str.hashname}</td>
                                    <td>{str.summ}</td>
                                    <td>{str.typeaction}</td>
                                </tr>
                            </tbody>
                        )))
                    }
                </table>
            </div>
        </div>
    );
};

export default Table;