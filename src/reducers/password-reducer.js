const defaultState = {
  passwords: {},
  selectedPassword: {},
  loading: false,
  errors:{}
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'FETCH_PASSWORDS_FULFILLED': {
      return {
        ...state,
        passwords: action.payload,
        loading: false,
        errors: {}
      }
    }

    case 'FETCH_PASSWORDS_PENDING': {
      return {
        ...state,
        loading: true,
        errors: {}
      }
    }

    case 'FETCH_PASSWORDS_REJECTED': {
      return {
        ...state,
        loading: false,
        errors: { global: action.payload.message }
      }
    }

    case 'ADD_PASSWORDS_FULFILLED': {
      return {
        ...state,
        passwords: action.payload,
        loading: false,
        errors: {}
      }
    }

    default:
      return state;
  }
}