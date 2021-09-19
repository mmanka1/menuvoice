import Environment from '../config/environment';

export const getNearbyRestaurants = async (latitude, longitude) => {
    try{
        let type = 'restaurant';
        let rankby = 'distance';
        let url = `${Environment['GOOGLE_MAPS_API_ENDPOINT']}location=${latitude}%2C${longitude}&rankby=${rankby}&type=${type}&key=${Environment['GOOGLE_MAPS_API_KEY']}`;
        let response = await fetch(url, 
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'GET',
            }   
        )
        let nearbyPlaces = await response.json();
        return nearbyPlaces.results[0].name     
    } catch(err){
        return err
    }
}

export const updateSteps = () => {

}
