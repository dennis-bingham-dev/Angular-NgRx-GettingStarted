import { createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { Product } from '../product';
import * as ProductActions from './product.actions';

// Do this because products is lazy loaded so this allows it to behave the same
// as if it were declared in app.state.ts when it isn't lazy loaded.
export interface State extends AppState.State {
    products: IProductState;
}

export interface IProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
}

const initialState: IProductState = {
    showProductCode: true,
    currentProduct: null,
    products: []
};

const getProductFeatureState = createFeatureSelector<IProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    state => state.currentProduct
);

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

export const productReducer = createReducer<IProductState>(initialState,
    on(ProductActions.toggleProductCode, (state): IProductState => {
    return {
        ...state,
        showProductCode: !state.showProductCode
    };
    }),
    on(ProductActions.setCurrentProduct, (state, action): IProductState => {
        return {
            ...state,
            currentProduct: action.product
        };
    }),
    on(ProductActions.clearCurrentProduct, (state): IProductState => {
        return {
            ...state,
            currentProduct: null
        };
    }),
    on(ProductActions.initializeCurrentProduct, (state): IProductState => {
        return {
            ...state,
            currentProduct: {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            }
        };
    })
);
