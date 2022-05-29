import http from './httpService';

const apiEndpoint = 'comments';

const commentUrl = (commentId) => `${apiEndpoint}/${commentId}`;

export const getComments = () => http.get(apiEndpoint);

export const deleteComment = (commentId) => http.delete(commentUrl(commentId));
