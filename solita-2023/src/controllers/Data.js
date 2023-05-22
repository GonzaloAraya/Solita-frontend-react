import axios from "axios";
import {server} from "./settings";


export async function bikeJourneyData(page, pageSize){
    const response = await axios.get( server + '/public/pag/' + page + '/' + pageSize);
    if(!response) {
        throw new Error(response);
    } else {
        return response.data;
    }
}

export async function stationInformationDeparture(place){
    const response = await axios.get( server + '/public/average/departure/'+ place);
    if(!response) {
        throw new Error(response);
    } else {
        return response.data;
    }
}

export async function stationInformationReturn(place){
    const response = await axios.get( server + '/public/average/return/' + place);
    if(!response) {
        throw new Error(response);
    } else {
        return response.data;
    }
}

export async function authentication(user, password){
    const response = await axios.post( server + '/public/authenticate', {
        user: user,
        password: password
      });
    if(!response) {
        throw new Error(response);
    } else {
        localStorage.setItem('login', JSON.stringify({
            login: true,
            token:response.data.jwtToken
        }))
        return response.data;
    }
}

