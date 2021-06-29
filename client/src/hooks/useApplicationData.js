// import { useEffect, useReducer } from 'react';
// import dataReducer, { SET_PLAYLISTS } from '../reducer/data_reducer';
// import axios from 'axios';

// const useApplicationData = () => {
//   const [state, dispatch] = useReducer(dataReducer, {
//     users: [],
//     playlist: null,
//     playlists: [],
//     loading: true,
//     difficulty: 'easy',
//     selectedSong: ''
//   });

//   useEffect(() => {
//     axios({ method: 'GET', url: '/api/playlists' })
//       .then(({ data }) => {
//         console.log(data);
//         dispatch({ type: SET_PLAYLISTS, playlists: data });
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   return {
//     state,
//     dispatch,
//   };
// };

// export default useApplicationData;
