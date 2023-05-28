import axios from "axios";
import { server } from "./settings";

export async function bikeJourneyData(page, pageSize) {
  console.log(page + "---- " + pageSize);
  const response = await axios.get(
    server + "/public/pag/" + page + "/" + pageSize
  );
  if (!response) {
    throw new Error(response);
  } else {
    return response.data;
  }
}

export async function stationInformationDeparture(place) {
  const response = await axios.get(
    server + "/public/average/departure/" + place
  );
  if (!response) {
    throw new Error(response);
  } else {
    return response.data;
  }
}

export async function stationInformationReturn(place) {
  const response = await axios.get(server + "/public/average/return/" + place);
  if (!response) {
    throw new Error(response);
  } else {
    return response.data;
  }
}

export async function authentication(user, password) {
  const response = await axios.post(server + "/public/authenticate", {
    user: user,
    password: password,
  });
  if (!response) {
    throw new Error(response);
  } else {
    sessionStorage.setItem(
      "login",
      JSON.stringify({
        login: true,
        token: response.data.jwtToken,
      })
    );
    return response.data;
  }
}

export async function updateBikeJourneyData(id, data) {
  const token = JSON.parse(sessionStorage.getItem("login")).token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.put(server + "/private/" + id, data, {
      headers,
    });
    console.log(response);
    console.log(headers.Authorization);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}

export async function createJourneyData(data) {
  const token = JSON.parse(sessionStorage.getItem("login")).token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(server + "/private/", data, { headers });
    console.log(response);
    console.log(headers.Authorization);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}
