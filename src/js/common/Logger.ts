import * as  Redux from 'redux';
import { Store } from '../App';
var logger = (store: Redux.Store<Store.All>) =>
	(next: Redux.Dispatch<Store.All>) =>
		(action: any) => {
			if (action.type) {
				console.group(action.type);
				console.info('dispatching', action);
				console.log('prev state', store.getState());
			}
			let result = next(action)
			if (action.type) {
				console.log('next state', store.getState());
				console.groupEnd();
			}
			return result;
		};

export default logger;