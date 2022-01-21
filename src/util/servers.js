import { request } from 'umi';

/**
 * 物品新增
 * @param {*} options
 * @returns
 */
export const goodsAdd = (options) => request('/goods/add', options);

/**
 * 物品更新
 * @param {*} options
 * @returns
 */
export const goodsUpdate = (options) => request('/goods/update', options);

/**
 * 物品删除
 * @param {*} options
 * @returns
 */
export const goodsDelete = (options) => request('/goods/delete', options);

/**
 * 物品列表
 * @param {*} options
 * @returns
 */
export const goodsList = (options) => request('/goods/getList', options);

/**
 * 物品详情
 * @param {*} options
 * @returns
 */
export const goodsDetail = (options) => request('/goods/getById', options);

/**
 * 好物分享-新增类型
 * @param {*} options
 * @returns
 */
export const goodsAddType = (options) =>
  request('/goodsShare/addGoodsType', options);

/**
 * 好物分享-更新类型
 * @param {*} options
 * @returns
 */
export const goodsUpdateType = (options) =>
  request('/goodsShare/updateGoodsType', options);

/**
 * 好物分享-删除类型
 * @param {*} options
 * @returns
 */
export const goodsDeleteType = (options) =>
  request('/goodsShare/deleteGoodsType', options);

/**
 * 好物分享-获取列表
 * @param {*} options
 * @returns
 */
export const goodsTypeList = (options) =>
  request('/goodsShare/getGoodsTypeList', options);

/**
 * 好物申请
 * @param {*} options
 * @returns
 */
export const goodsApply = (options) => request('/goodsShare/apply', options);

/**
 * 好物审批
 * @param {*} options
 * @returns
 */
export const goodsAuditing = (options) =>
  request('/goodsShare/auditing', options);
