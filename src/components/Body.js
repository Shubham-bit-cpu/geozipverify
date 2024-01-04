import '../css/body.css';
import React, { useEffect } from 'react';
import { useState } from "react";
import axios from 'axios';
import countrycase from '../countrycase';
import getZipCodeByCountry from '../countrycase';

// ... (your imports)

const Body = () => {
    const [usersearch, Setusersearch] = useState("");
    const [searchresult, Setsearchresults] = useState([{}]);
    const [zipcode, setzipcode] = useState("");
    const [placename, setPlacename] = useState("");
    const [country, SetCountry] = useState('');
    const [buttoncolor, SetButtoncolor] = useState(false);
    const [userSearchcheck, setUserSearchcheck] = useState(false);
    const [countryList, setCountryList] = useState([{}]);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [zipcodemptycheck, setZipcodEmptyCheck] = useState(false);
    const [zipcodecasecheck, setzipcodecasecheck] = useState("");



    useEffect(() => {
        //  Your existing code that runs on component mount
        const fetchData = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                console.log(response.data)
                setCountries(response.data);
                console.log(countryList)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    const userinput = (e) => {
        Setusersearch(e.target.value);
        if (usersearch == "") {
            SetButtoncolor(false)
        }
    }

    const searchzipcode = async () => {
        const searchurl = `http://localhost:3000/api/search?q=${usersearch}`;

        if (usersearch !== "") {
            setUserSearchcheck(false);

            try {
                const response = await axios.get(searchurl);

                // Assuming response.data is an object with properties like postal_code, place_name, country_code
                const receivedZipcode = response.data ? response.data.postal_code : "";
                setzipcode(receivedZipcode);
                setPlacename(response.data ? response.data.place_name : "");
                SetCountry(response.data ? response.data.country_code : "");

                // Set the entire search results object if needed
                Setsearchresults(response.data);

                if (receivedZipcode !== null && receivedZipcode !== "") {
                    SetButtoncolor(true);
                    setZipcodEmptyCheck(false);
                } else {
                    SetButtoncolor(false);
                    console.log("enter correct zip code");
                    setZipcodEmptyCheck(true);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setUserSearchcheck(true);
            SetButtoncolor(false);
            setzipcode("");
            setPlacename("");
            SetCountry("");
        }
    };

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setSelectedCountry(e.target.value);
        const zipcodecase = getZipCodeByCountry(selectedCountry);
        setzipcodecasecheck(zipcodecase)
        console.log(zipcodecase)
    }
    console.log(buttoncolor)


    // useEffect(() => {
    //     // Your existing code that runs on component mount
    //     // const fetchData = async () => {
    //     //     try {
    //     //         const response = await axios.get('http://localhost:3000/api/items');
    //     //         Setsearchresults(response.data);
    //     //     } catch (error) {
    //     //         console.log(error);
    //     //     }
    //     // };
    //     // fetchData();
    // }, []);
    return (
        <>
            <section className="container-fluid mainbody">
                <div className='toselectcountry'>
                    <div className='selectcountrywrapper'>
                        {/* <label htmlFor="country">Select a Country:</label> */}
                        <div className='countryselector'>
                            <select id="country" className='countrylabel' value={selectedCountry} onChange={handleCountryChange}>
                                <option value="" className='countrytxt'> Country </option>
                                {countries.map((country) => (
                                    <option key={country.cca2} value={country.name.common}>
                                        {country.name.common}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <div className='countryholder py-2'>
                        {selectedCountry && (
                            <p className='selectedcountry'>Correct formatting is: {zipcodecasecheck}</p>
                        )}
                    </div>
                </div>
                <div className="holder">
                    <div className='tablewrapper'>
                        {/* <h4 className='mainheading'>Please enter the ZipCode</h4> */}
                        <table>
                            <tbody>
                                {userSearchcheck ? <p className='userSearchcheck'> *Zip code is blank</p> : null}
                                {zipcodemptycheck ? <p className='userSearchcheck'> *Entered zip code not found</p> : null}
                                <tr>

                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Enter Zip code"
                                            value={usersearch}
                                            onChange={userinput}
                                            className='zipcode'
                                        />

                                    </td>
                                    <td>
                                        <button className={`search-red ${buttoncolor ? 'search-green' : 'search-red '}`}
                                            onClick={searchzipcode}>
                                            Search
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div>
                    <div className='row justify-content-center'>
                        <div className='col-6 d-flex align-items-end flex-column py-4'>
                            <label className='request_fields'>Entered Zip code </label>
                            <label className='request_fields'>Place Name  </label>
                            <label className='request_fields'>Country code </label>
                        </div>
                        <div className='col-6 d-flex align-items-start flex-column py-4'>
                            {zipcode ? <label className='response_fields'>{zipcode}</label> : null}
                            {placename ? <label className='response_fields'>{placename}</label> : null}
                            {country ? <label className='response_fields'>{country}</label> : null}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Body;
