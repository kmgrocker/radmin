import { BASE_URL } from "./constant";

export function a11yProps(index = 0) {
  return {
    id: `userrole-tab-${index}`,
    "aria-controls": `userrole-tabpanel-${index}`,
  };
}
export function resolveGetURL(selected = "") {
  switch (selected) {
    case "Actions":
      return `${BASE_URL}/actions`;
    case "Users":
      return `${BASE_URL}/users`;
    case "Roles":
      return `${BASE_URL}/roles`;
    case "Organizations":
      return `${BASE_URL}/orgs`;
    case "Buisness Functions":
      return `${BASE_URL}/buisness`;
    default:
      return "";
  }
}
export function resolveGetByIdURL(selected = "", id) {
  switch (selected) {
    case "Actions":
      return `${BASE_URL}/action/${id}`;
    case "Users":
      return `${BASE_URL}/user/${id}`;
    case "Roles":
      return `${BASE_URL}/role/${id}`;
    case "Organizations":
      return `${BASE_URL}/org/${id}`;
    case "Buisness Functions":
      return `${BASE_URL}/buisness/${id}`;
    default:
      return "";
  }
}

export const headerConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export async function retryFetch(fn,retryCount){
  if(retryCount>0){
     retryFetch(fn,retryCount-1)
  }
}
