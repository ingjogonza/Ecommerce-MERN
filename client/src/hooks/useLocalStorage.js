export const useLocalStorage = () => {

    const setItemFromLocalStorage = (key, value) => localStorage.setItem(key, value);

    const getItemFromLocalStorage = (key) => localStorage.getItem(key);

    const removeItemFromLocalStorage = (key) => localStorage.removeItem(key);

    return {
        setItemFromLocalStorage,
        getItemFromLocalStorage,
        removeItemFromLocalStorage
    }
}