import { request } from 'umi';
import axios from 'axios';

// axios.defaults.withCredentials=true
// axios.defaults.crossDomain=true
// axios.defaults.headers.post['Access-Control-Allow-Origin'] =

// /**
//  * 物品新增
//  * @param {*} options
//  * @returns
//  */
// export const goodsAdd = (options) => request('/goods/add', options);

/**
 * 物品更新
 * @param {*} options
 * @returns
 */
export const goodsUpdate = (options: object) =>
  axios({
    method: 'post',
    url: '/api/goods/update',
    data: options,
  });

/**
 * 物品删除
 * @param {*} options
 * @returns
 */
export const goodsDelete = (options: object) =>
  axios({
    method: 'post',
    url: '/api/goods/delete',
    data: options,
  });

/**
 * 物品列表
 * @param {*} options
 * @returns
 */
export const goodsList = (options: object) =>
  axios({
    method: 'post',
    url: '/api/goods/getList',
    data: options,
  });

/**
 * 物品详情
 * @param {*} options
 * @returns
 */
export const goodsDetail = (options: object) =>
  axios({
    method: 'post',
    url: '/api/goods/getById',
    data: options,
  });

/**
 * 好物审批
 * @param {*} options
 * @returns
 */
export const goodsAuditing = (options: object) =>
  axios({
    method: 'post',
    url: '/api/goodsShare/auditing',
    data: options,
  });

/**
 * 分类管理-新增类型
 * @param {*} options
 * @returns
 */
export const goodsAddType = (options: object) =>
  axios({
    method: 'post',
    url: '/api/goodsShare/addGoodsType',
    data: options,
  });

/**
 * 分类管理-更新类型
 * @param {*} options
 * @returns
 */
export const goodsUpdateType = (options: object) =>
  axios({
    method: 'post',
    url: '/api/goodsShare/updateGoodsType',
    data: options,
  });

/**
 * 分类管理-删除类型
 * @param {*} options
 * @returns
 */
export const goodsDeleteType = (options: object) =>
  axios({
    method: 'post',
    url: '/api/goodsShare/deleteGoodsType',
    data: options,
  });

/**
 * 分类管理列表
 * @param {*} options
 * @returns
 */
export const goodsTypeList = (options: object) =>
  axios({
    method: 'post',
    url: '/api/goodsShare/getGoodsTypeList',
    data: options,
  });

/**
 * 好物申请
 * @param {*} options
 * @returns
 */
export const goodsApply = (options?: object) =>
  axios({
    method: 'post',
    url: '/api/goodsShare/apply',
    data: options,
  });

/**
 * 领用工单 - 列表
 * @param {*} options
 * @returns
 */
export const receiveList = (options?: object) =>
  axios({
    method: 'post',
    url: '/api/objWarehouse/page',
    data: options,
  });

/**
 * 违停登记 - 列表
 * @param {*} options
 * @returns
 */
export const registerList = (options?: object) =>
  axios({
    method: 'post',
    url: '/api/violation/page',
    data: options,
  });

/**
 * 申请列表 - 列表
 * @param {*} options
 * @returns
 */
export const getGoodsList = (options?: object) =>
  axios({
    method: 'post',
    url: '/api/goodsShare/getGoodsList',
    data: options,
  });
