import Environment from '../config/environment';
import brandIds from '../brand_ids.json';

//Private members
var menuItem = '';

//Public members
export const getNearbyRestaurant = async (latitude, longitude) => {
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
        return nearbyPlaces.results[0].name;   
    } catch(err){
        console.log(err);
        return null;
    }
}

export const searchMenuItems = async(keyword, restaurantName) => {
    try {
        //Get items from just the specified restaurant
        let restaurant = brandIds.find(r => r.name == restaurantName || r.name.replace(/'/g, '') == restaurantName)
        if (restaurant !== undefined) {
            let url = `${Environment['NUTRIONIX_API_ENDPOINT']}?query=${keyword}&brand_ids=${[restaurant.id]}`;
            let response = await fetch(url, 
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-type': 'application/json',
                        'x-app-id': `${Environment['NUTRITIONIX_APP_ID']}`,
                        'x-app-key': `${Environment['NUTRITIONIX_APP_KEY']}`,
                    },
                    method: 'GET',
                }   
            )
            let filteredItems = await response.json();
            // console.log(filteredItems.branded);
            return filteredItems.branded;
        }
        return null
        
        // return filteredRestaurantItems;
    } catch(err){
        console.log(err);
        return null;
    }
}

export const setChosenMenuItem = (item) => {
    menuItem = item;
}

export const getChosenMenuItem = () => {
    return menuItem
}