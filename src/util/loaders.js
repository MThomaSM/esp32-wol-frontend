import {getResources} from "./loadResources";

export const devicesLoader = async() => {
    return getResources("devices");
}

export const computersLoader = async() => {
    return getResources("computers");
}

export const startlistLoad = async(deviceUuid) => {
  return getResources("startlist/"+deviceUuid);
}

export const computersByDevice = async(deviceUuid) => {
    return getResources("computers/byDevice/"+deviceUuid);
}