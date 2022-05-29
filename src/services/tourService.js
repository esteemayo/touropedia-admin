import http from './httpService';

const apiEndpoint = 'tours';

const tourUrl = (tourId) => `${apiEndpoint}/${tourId}`;

export const getTours = () => http.get(`${apiEndpoint}?limit=100`);

export const getTour = (tourId) => http.get(`${apiEndpoint}/find/${tourId}`);

export const createTour = (tour) => http.post(apiEndpoint, tour);

export const updateTour = (tourId, tour) => http.patch(tourUrl(tourId), tour);

export const deleteTour = (tourId) => http.delete(tourUrl(tourId));
