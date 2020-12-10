import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { User } from '../user';
import * as UserActions from './user.actions';

export interface IUserState {
    currentUser: User;
    maskUserName: boolean;
}

const initialState: IUserState = {
    currentUser: null,
    maskUserName: false
};

const getUserFeatureState = createFeatureSelector<IUserState>('user');

export const getMaskUserName = createSelector(
    getUserFeatureState,
    state => state.maskUserName
);

export const getCurrentUser = createSelector(
    getUserFeatureState,
    state => state.currentUser
);

export const userReducer = createReducer<IUserState>(initialState,
    on(UserActions.maskUserName, (state): IUserState => {
        return {
            ...state,
            maskUserName: !state.maskUserName
        };
    })
);
