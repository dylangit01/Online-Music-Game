// export const SET_USERS = 'SET_USERS';
export const SET_PLAYLISTS = 'SET_PLAYLISTS';
export const SET_PLAYLIST = 'SET_SONGS';
export const SET_DIFFICULT = 'SET_DIFFICULT';

const dataReducer = (state, action) => {
  switch (action.type) {
    case SET_PLAYLISTS:
      return { ...state, playlists: action.playlists, loading: false };

    // Set the current playlist id
    case SET_PLAYLIST:
      return { ...state, playlist: action.playlist };

    case SET_DIFFICULT:
      return { ...state, difficulty: action.difficulty };

    default:
      return state;
  }
};

export default dataReducer;
