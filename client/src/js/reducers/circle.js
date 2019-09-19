import { OPEN_CIRCLE_FORM } from '../constants/action-types';

import {
  // GET_ALL_USERS_SUCCESS,
  // GET_ALL_USERS_FAILURE,
  // GET_ALL_CIRCLES_FAILURE,
  GET_ALL_CIRCLES_SUCCESS,
  // ADD_CIRCLE_FAILURE,
  ADD_CIRCLE_SUCCESS,
  // DELETE_CIRCLE_FAILURE,
  DELETE_CIRCLE_SUCCESS,
  // DELETE_CIRCLE_USER_FAILURE,
  DELETE_CIRCLE_USER_SUCCESS,
  ADD_CIRCLE_USER_SUCCESS,
  // ADD_CIRCLE_USER_FAILURE,
  // GET_ALL_CIRCLES_REQUEST,
  // GET_ALL_USERS_REQUEST,
  // ADD_CIRCLE_REQUEST,
  // DELETE_CIRCLE_REQUEST,
  // ADD_CIRCLE_USER_REQUEST,
  // DELETE_CIRCLE_USER_REQUEST,
} from '../constants/circle';

const circleImages = [
  'https://gifimage.net/wp-content/uploads/2017/09/anime-gif-300x300-200kb-9.gif',
  'https://gifimage.net/wp-content/uploads/2017/09/anime-girl-angry-gif-5.gif',
  'https://gifimage.net/wp-content/uploads/2017/09/anime-girl-angry-gif-10.gif',
  'https://gifimage.net/wp-content/uploads/2017/09/anime-good-morning-gif-8.gif',
  'https://gifimage.net/wp-content/uploads/2017/09/anime-girl-angry-gif-9.gif',
  'https://gifimage.net/wp-content/uploads/2017/09/anime-girl-angry-gif-4.gif',
  'https://gifimage.net/wp-content/uploads/2017/09/anime-girl-angry-gif-3.gif',
  'https://gifimage.net/wp-content/uploads/2017/09/anime-girl-angry-gif-2.gif',
  'https://gifimage.net/wp-content/uploads/2017/09/anime-girl-angry-gif-1.gif',
  'https://gifimage.net/wp-content/uploads/2017/09/anime-girl-angry-gif-6.gif',
  'https://gifimage.net/wp-content/uploads/2017/09/anime-girl-angry-gif-7.gif',
  'https://gifimage.net/wp-content/uploads/2017/09/anime-girl-angry-gif-11.gif',
];

const initialState = {
  circleForm: {
    open: false,
    circle: false,
  },
  circles: {
    id1: {
      id: 'id1',
      title: 'Smith-Doe Family',
      description: 'For our close family',
      date: 'a date',
      src: '...',
      previewImage: circleImages[0],
      admins: ['userid', 'userid'],
      members: ['userid', 'userid', 'userid', 'userid', 'userid', 'userid', 'userid'],
      artifacts: ['artifactID', 'artifactID'],
      public: false,
    },
    id2: {
      id: 'id2',
      title: 'Mitchell Family',
      description: 'For our close family',
      date: 'a date',
      src: '...',
      previewImage: circleImages[1],
      admins: ['userid', 'userid'],
      members: ['userid', 'userid', 'userid', 'userid', 'userid', 'userid', 'userid'],
      artifacts: ['artifactID', 'artifactID'],
      public: false,
    },
    id3: {
      id: 'id3',
      title: 'Jack`s close friends ',
      description: 'For our close family',
      date: 'a date',
      src: '...',
      previewImage: circleImages[2],
      admins: ['userid', 'userid'],
      members: ['userid', 'userid', 'userid', 'userid', 'userid', 'userid', 'userid'],
      artifacts: ['artifactID', 'artifactID'],
      public: true,
    },
    id4: {
      id: 'id4',
      title: 'Smithsonian Artifacts',
      description: 'For our close family',
      date: 'a date',
      src: '...',
      previewImage: circleImages[4],
      admins: ['userid', 'userid'],
      members: ['userid', 'userid', 'userid', 'userid', 'userid', 'userid', 'userid'],
      artifacts: ['artifactID', 'artifactID'],
      public: true,
    },
    id5: {
      id: 'id5',
      title: 'Egyptian Artifacts',
      description: 'For our close family',
      date: 'a date',
      src: '...',
      previewImage: circleImages[3],
      admins: ['userid', 'userid'],
      members: ['userid', 'userid', 'userid', 'userid', 'userid', 'userid', 'userid'],
      artifacts: ['artifactID', 'artifactID'],
      public: true,
    },
    id6: {
      id: 'id6',
      title: 'Anime Artifacts',
      description: 'For our close family',
      date: 'a date',
      src: '...',
      previewImage: circleImages[5],
      admins: ['userid', 'userid'],
      members: ['userid', 'userid', 'userid', 'userid', 'userid', 'userid', 'userid'],
      artifacts: ['artifactID', 'artifactID'],
      public: true,
    },
  },
};

const circle = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CIRCLES_SUCCESS:
      return {
        circles: action.payload,
        circleForm: {
          ...state.circleForm,
        },
      };
    case ADD_CIRCLE_SUCCESS:
      return {
        ...state,
        circles: {
          ...state.circles,
          [action.payload.id]: {
            ...action.payload,
          },
        },
        circleForm: {
          ...state.circleForm,
        },
      };
    case ADD_CIRCLE_USER_SUCCESS:
      return {
        ...state,
        circles: {
          ...state.circles,
          [action.payload.circleid]: {
            ...state.circles[action.payload.circleid],
            members: [...state.circles[action.payload.circleid].members, action.payload.memberid],
          },
        },
      };
    case DELETE_CIRCLE_SUCCESS:
      return {
        ...state,
      };
    case DELETE_CIRCLE_USER_SUCCESS:
      return {
        ...state,
        circles: {
          ...state.circles,
          [action.payload.circleid]: {
            ...state.circles[action.payload.circleid],
            members: [...state.circles[action.payload.circleid].members].filter(uid => uid !== action.payload.memberid),
          },
        },
      };
    case OPEN_CIRCLE_FORM:
      return {
        ...state,
        circleForm: {
          open: !state.circleForm.open,
          circle: action.payload.circle,
        },
      };
    default:
      return state;
  }
};

export default circle;
