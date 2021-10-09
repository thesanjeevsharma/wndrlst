import type { User, Session } from 'types/users'
import { LOGIN_USER } from './actions'

type State = {
  user: User | null
  session: Session | null
}

const initialState: State = {
  user: null,
  session: null,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        user: action.payload.user,
        session: action.payload.session,
      }
    }

    default:
      return state
  }
}
