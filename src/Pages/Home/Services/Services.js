import React, { useEffect, useState } from 'react';
import Service from '../Service/Service';
import './Services.css'

const Services = () => {

    // const services = [
    //     {id:1, name: 'oil change', price:100 , img:'https://i.ibb.co/TMmPYqs/car-mechanics1.jpg'},
    //     {id:1, name: 'oil change', price:100 , img:'https://i.ibb.co/HYpkVDD/car-mechanics2.jpg'},
    //     {id:1, name: 'oil change', price:100 , img:'https://i.ibb.co/Y2K273t/car-mechanics3.jpg'}
    // ]

    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('services.json')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])


    return (
        <div id='services' className='container'>
            <h1 className='services-title text-center text-primary'>Our Services ({services.length})</h1>
            <div className='services-container'>
                {
                    services.map(service => <Service
                        key={service.id}
                        service={service}
                    ></Service>)
                }
            </div>
        </div>
    );
};

export default Services;