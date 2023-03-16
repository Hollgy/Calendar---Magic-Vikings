// localStorage.js

export const getDataFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key)) || [];
  };
  
  export const setDataInLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  