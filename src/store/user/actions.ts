import supabase from 'supabase'

export const LOGIN_USER = 'LOGIN_USER'
export const FETCH_USER_DATA = 'FETCH_USER_DATA'
export const LOGOUT_USER = 'LOGOUT_USER'

export const loginUser = (user, session) => (dispatch) => {
  dispatch(fetchUserData(user.id))
  dispatch({
    type: LOGIN_USER,
    payload: { user, session },
  })
}

export const fetchUserData = (userId: string) => async (dispatch) => {
  const { data, error } = await supabase
    .from('likes')
    .select()
    .eq('user_id', userId)
  if (error) {
    console.log('❌ Failed to fetch user data!')
  } else {
    dispatch({ type: FETCH_USER_DATA, payload: { data } })
  }
}

export const logoutUser = () => ({
  type: LOGOUT_USER,
})
