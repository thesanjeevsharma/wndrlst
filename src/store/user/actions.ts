export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

export const loginUser = (user, session) => ({
  type: LOGIN_USER,
  payload: { user, session },
})

export const logoutUser = () => ({
  type: LOGOUT_USER,
})
