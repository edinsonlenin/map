import { ADD_PLACE, SET_PLACES } from '../actions/places';
import Place from '../../models/place';

const initialState = {
  places: [],
};

export default (state=initialState, action) => {
  switch(action.type){
    case SET_PLACES:
      return {
        places: action.payload.map(p => new Place(p.id.toString(), p.title, p.imageUri, p.address, p.latitude, p.longitude))
      };
    case ADD_PLACE:
      const newPlace = new Place(action.payload.id, action.payload.title, action.payload.image, action.payload.address, action.payload.latitude, action.payload.longitude);
      return {
        places: state.places.concat(newPlace)
      }
    default:
      return state;
  }
};