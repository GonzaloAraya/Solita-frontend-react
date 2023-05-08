import axios from "axios";
import {server} from "./settings";


export async function bikeJourneyData(page, pageSize){
    console.log(page, pageSize)
    const response = await axios.get( server + '/bikeJourney/public/pag/' + page + '/' + pageSize);
    if(!response) {
        throw new Error(response);
    } else {
        return response.data;
    }
}

