const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};

const removeLocalStorage = (key) => {
    localStorage.removeItem(key);
}

export { setLocalStorage, getLocalStorage, removeLocalStorage };