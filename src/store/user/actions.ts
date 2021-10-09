export const LOGIN_USER = 'LOGIN_USER'

export const loginUser = (user, session) => ({
  type: LOGIN_USER,
  payload: { user, session },
})
