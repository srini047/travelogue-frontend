import { myAxios } from "./helper";

export const getGuides = async () => {
  return myAxios.get(`/guides`).then((response) => response.data);
};

export const getTourists = async () => {
  return myAxios.get(`/tourists`);
};

export const createGuide = async () => {
  return myAxios.get(`/newGuide?`);
};

export const createTourist = async (name) => {
  return myAxios.get(`/newTourist?name=${name}`);
};
