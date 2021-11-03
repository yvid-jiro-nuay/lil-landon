import React, {useState, useEffect} from 'react';
//import arrivalChecklistData from './data/arrival_checklist.json';
//import servicesChecklistData from './data/services_checklist.json';
//import acccessibilityChecklistData from './data/accessibility_checklist.json';

const HotelInfo = () => {

    const [serviceChecklistData, setServiceChecklistData] = useState([]);
    const [acccessibilityChecklistData, setAcccessibilityChecklistData] = useState([]);
    const [arrivalChecklistData, setArrivalChecklistData] = useState([]);

    const getData = async(url, setDataCallback) => {
        // Query the API Gateway
        const resp = await fetch(url);
        let jsonData = await resp.json();

        // Assigning the JSON Data to the stateful variable
        setDataCallback(jsonData);
    }

    useEffect(() => {
        // Get the services checklist from the API
        getData('https://u86zly1qok.execute-api.ap-southeast-1.amazonaws.com/Production/lil-landon-services', setServiceChecklistData)        
        getData('https://u86zly1qok.execute-api.ap-southeast-1.amazonaws.com/Production/lil-landon-accessibility', setAcccessibilityChecklistData);
        getData('https://u86zly1qok.execute-api.ap-southeast-1.amazonaws.com/Production/lil-landon-arrival', setArrivalChecklistData);
    }, []);

    return(
        <div className="scene" id="hotelinfo">
            <article className="heading">
                <h1>Essential Information</h1>
            </article>
            <article id="usefulinfo">
                <section id="arrivalinfo">
                    <h2>Arrival Information</h2>
                    <ul>
                        {
                            arrivalChecklistData.map(
                                (arrival)=>
                                    <li><strong>{arrival.item}:</strong> {arrival.detail}</li>
                            )
                        }
                    </ul>
                </section>
                <section className="checklist" id="services">
                    <h2>Services and Amenities</h2>
                    <p>Our services and amenities are designed to make your travel easy, your stay comfortable, and your experience one-of-a-kind.</p>
                    <ul>
                        {
                            serviceChecklistData.map(
                                (service) => <li>{service.item}</li> 
                            )
                        }
                    </ul>
                </section>
                <section className="checklist" id="accessibility">
                    <h2>Accessibility</h2>
                    <p>We're committed to maintaining the same quality of service for every individual. We offer the following facilities for those with special needs:</p>
                    <ul>
                        {
                            acccessibilityChecklistData.map(
                                (accessibility) => <li>{accessibility.item}</li>
                            )
                        }
                        
                    </ul>
                </section>
            </article>
            <article id="greenprogram">
                <h2>ODB Green Program</h2>
                <p><strong>The ODB Hotel - London</strong> was recently renovated, and we considered the impact on the earth the entire way. From green building materials, to solar power, to energy-friendly lighting and appliances throughout the hotel - we’re saving energy in every socket, outlet, and switch. We’ve also initiated a recycling and composting program that reduces the load to local landfills, while providing valuable raw material for use in new products, or in the case of compost, for use in local gardens and landscapes.</p>
            </article>
        </div>
    );
}

export default HotelInfo;