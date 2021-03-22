export const setSession = (k, v) => sessionStorage.setItem(k, v)
export const getSession = (k) => sessionStorage.getItem(k)
export const clearSession = () => sessionStorage.clear()

export const getEmail = () => { return getSession('email') }