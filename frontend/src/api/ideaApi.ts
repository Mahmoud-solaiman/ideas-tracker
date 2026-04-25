import { Idea } from "../utils/types";
import API from "./axios";

export const getIdea = () => API.get('/ideas');
export const createIdea = (data: Idea) => API.post('/ideas', data);