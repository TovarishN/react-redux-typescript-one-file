import * as  Redux from 'redux';
//import { Store } from '../App';
// var logger = (store: Redux.Store<Store.All>) =>
// 	(next: Redux.Dispatch<Store.All>) =>
// 		(action: any) => {
// 			if (action.type) {
// 				console.group(action.type);
// 				console.info('dispatching', action);
// 				console.log('prev state', store.getState());
// 			}
// 			let result = next(action)
// 			if (action.type) {
// 				console.log('next state', store.getState());
// 				console.groupEnd();
// 			}
// 			return result;
// 		};

// export default logger;

interface BaseInterface {
    someBaseFunc() : string;
}

class SomeClass implements BaseInterface {
    public someBaseFunc(): string {
        return "SomeClass impl";
    }

    create() {return new SomeClass();} 
}

// class SomeGeneric<T extends BaseInterface> {
//     constructor(TCreator: { new (): T; }) {
//         this.entity = new TCreator();
//     }
//     entity : T;

//     public genericFunc() : string {
//         return this.entity.someBaseFunc();
//     }
// }

// function activator<T extends IActivatable>(type: { new(): T ;} ): T {
//     return new type();
// }

//let gen = new SomeGeneric(SomeGeneric);
//et res = gen.genericFunc();

//console.log(res);

