const API_PORT = 3001;
const API_ENDPOINT = `http://localhost:${API_PORT}/`;

export const LOGON_USER_ENDPOINT = API_ENDPOINT + "logon-user";

export const LOGIN_USER_ENDPOINT = API_ENDPOINT + "login-user";

export const FETCH_USER_INITIAL_DATA_ENDPOINT = API_ENDPOINT + "internal-page";

export const CREATE_GROUP_ENDPOINT = API_ENDPOINT + "create-group";

export const JOIN_GROUP_ENDPOINT = API_ENDPOINT + "join-group";

export const GET_GROUP_CONTENT_ENDPOINT = API_ENDPOINT + "get-group-content";
 
export const ADD_CARD_TO_PERSONAL_ENDPOINT = API_ENDPOINT + "add-card-personal";

export const ADD_CARD_TO_GROUP_ENDPOINT = API_ENDPOINT + "add-card-group";

export const CHANGE_PERSONAL_COLUMN_COLOR_ENDPOINT = API_ENDPOINT + "change-personal-color";

export const CHANGE_GROUP_COLUMN_COLOR_ENDPOINT = API_ENDPOINT + "change-group-color";

export const DELETE_PERSONAL_CARD_ENDPOINT = API_ENDPOINT + "delete-personal-card";

export const DELETE_GROUP_CARD_ENDPOINT = API_ENDPOINT + "delete-group-card";

export const MOVE_PERSONAL_CARD_ENDPOINT = API_ENDPOINT + "move-personal-card";

export const MOVE_GROUP_CARD_ENDPOINT = API_ENDPOINT + "move-group-card";

export const CHANGE_PERSONAL_CARD_CONTENT_ENDPOINT = API_ENDPOINT + "change-personal-card-content";

export const CHANGE_GROUP_CARD_CONTENT_ENDPOINT = API_ENDPOINT + "change-group-card-content";

export const KICK_USER_ENDPOINT = API_ENDPOINT + "kick-user";