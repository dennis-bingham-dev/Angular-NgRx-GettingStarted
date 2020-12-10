import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const toggleProductCode = createAction('[Product] Toggle Product Code');
export const setCurrentProduct = createAction('[Product] Set Current Product', props<{ currentProductId: number }>());
export const clearCurrentProduct = createAction('[Product] Clear Current Product');
export const initializeCurrentProduct = createAction('[Product] Initialize Current Product');

// Loading (Complex Operation)
// this action kicks of the loading of products from eg. server
export const loadProducts = createAction('[Product] Load');
// this action is called if successful
export const loadProductsSuccess = createAction('[Product] Load Success', props<{ products: Product[] }>());
// this action is called if failure
export const loadProductsFailure = createAction('[Product] Load Fail', props<{ error: string }>());

// Update
export const updateProduct = createAction('[Product] Update Product', props<{ product: Product }>());
export const updateProductSuccess = createAction('[Product] Update Product Success', props<{ product: Product }>());
export const updateProductFailure = createAction('[Product] Update Product Fail', props<{ error: string }>());

// Create
export const createProduct = createAction('[Product] Create Product', props<{ product: Product }>());
export const createProductSuccess = createAction('[Product] Create Product Success', props<{ product: Product }>());
export const createProductFailure = createAction('[Product] Create Product Fail', props<{ error: string }>());

// Delete
export const deleteProduct = createAction('[Product] Delete Product', props<{ product: Product }>());
export const deleteProductSuccess = createAction('[Product] Delete Product Success', props<{ id: number }>());
export const deleteProductFailure = createAction('[Product] Delete Product Fail', props<{ error: string }>());
