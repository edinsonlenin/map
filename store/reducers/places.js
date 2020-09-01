import { ADD_PLACE, SET_PLACES } from '../actions/places';
import Place from '../../models/place';

const initialState = {
  places: [],
};

export default (state=initialState, action) => {
  switch(action.type){
    case SET_PLACES:
      console.log('SET_PLACES', action.payload);
      return {
        places: action.payload.map(p => new Place(p.id.toString(), p.title, p.imageUri))
      };
    case ADD_PLACE:
      const newPlace = new Place(action.payload.id, action.payload.title, action.payload.image);
      return {
        places: state.places.concat(newPlace)
      }
    default:
      return state;
  }
};