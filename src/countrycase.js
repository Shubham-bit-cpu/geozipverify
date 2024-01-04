const getZipCodeByCountry = (country) => {
    switch (country) {
        case 'Poland':
            return '11-303';
        case 'India':
            return '175290';
        // Add more cases for other countries
        default:
            return ''; // Default case if the country is not found
    }
};

export default getZipCodeByCountry;