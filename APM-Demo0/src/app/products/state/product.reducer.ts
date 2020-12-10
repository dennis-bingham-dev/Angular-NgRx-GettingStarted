import { Actions } from '@ngrx/effects';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
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
    currentProductId: number | null;
    products: Product[];
    error: string;
}

const initialState: IProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
};

const getProductFeatureState = createFeatureSelector<IProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) => {
        if (currentProductId === 0) {
            return {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0,
            };
        } else {
            return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
        }
    }
);

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

export const getError = createSelector(
    getProductFeatureState,
    state => state.error
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
            currentProductId: action.currentProductId
        };
    }),
    on(ProductActions.clearCurrentProduct, (state): IProductState => {
        return {
            ...state,
            currentProductId: null
        };
    }),
    on(ProductActions.initializeCurrentProduct, (state): IProductState => {
        return {
            ...state,
            currentProductId: 0
        };
    }),
    on(ProductActions.loadProductsSuccess, (state, action): IProductState => {
        return {
            ...state,
            products: action.products
        };
    }),
    on(ProductActions.loadProductsFailure, (state, action): IProductState => {
        return {
            ...state,
            products: [],
            error: action.error
        };
    }),
    on(ProductActions.updateProductSuccess, (state, action): IProductState => {
        const updatedProducts = state.products.map(
            item => action.product.id === item.id ? action.product : item);
        return {
            ...state,
            products: updatedProducts,
            currentProductId: action.product.id,
            error: ''
        };
    }),
    on(ProductActions.updateProductFailure, (state, action): IProductState => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(ProductActions.createProductSuccess, (state, action): IProductState => {
        const updatedProducts = state.products.concat(action.product);
        return {
            ...state,
            products: updatedProducts,
            currentProductId: action.product.id,
            error: ''
        };
    }),
    on(ProductActions.createProductFailure, (state, action): IProductState => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(ProductActions.deleteProductSuccess, (state, action): IProductState => {
        const updatedProducts = state.products.filter(product => product.id !== action.id);
        return {
            ...state,
            products: updatedProducts,
            currentProductId: null,
            error: ''
        };
    }),
    on(ProductActions.deleteProductFailure, (state, action): IProductState => {
        return {
            ...state,
            error: action.error
        };
    })
);
