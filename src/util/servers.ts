import axios from 'axios';

/**
 * 物品更新
 * @param {*} options
 * @returns
 */
export const goodsUpdate = (options: object) =>
  axios({
    method: 'post',
    url: '/ocean/goods/update',
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
    url: '/ocean/goods/delete',
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
    url: '/ocean/goods/page/getList',
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
    url: '/ocean/goods/getById',
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
    url: '/ocean/goodsShare/auditing',
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
    url: '/ocean/goodsShare/addGoodsType',
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
    url: '/ocean/goodsShare/updateGoodsType',
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
    url: '/ocean/goodsShare/deleteGoodsType',
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
    url: '/ocean/goodsShare/page/getGoodsTypeList',
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
    url: '/ocean/goodsShare/apply',
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
    url: '/ocean/objLend/page',
    data: options,
  });

/**
 * 领用工单 - 详情
 * @param {*} options
 * @returns
 */
export const receiveDetail = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/objLend/list',
    data: options,
  });

/**
 * 领用工单 - 审核
 * @param {*} options
 * id
 * approvalDate
 * approvalFailExplain:不通过原因
 * approvalStatus:1通过 0不通过
 * approvalUser
 * approvalUserId
 * @returns
 */
export const receiveApproval = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/objLend/approval',
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
    url: '/ocean/violation/page',
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
    url: '/ocean/goodsShare/page/getGoodsList',
    data: options,
  });

/**
 * 物品信息查询
 * @param {*} options
 * @returns
 */
export const getGoodsInfo = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/objWarehouse/list',
    data: options,
  });

/**
 * 达人列表-列表
 * @param options
 * @returns
 */
export const getExpertList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/talent/getList',
    data: options,
  });

/**
 * 达人列表-添加达人
 * @param options
 * @returns
 */
export const addExpert = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/talent/add',
    data: options,
  });

export const deleteExpert = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/talent/delete',
    data: options,
  });

/**
 * 上传图片
 * @param options
 * @returns
 */
export const uploadFile = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/file/upload',
    headers: { 'Content-Type': 'multipart/form-data', userId: 'no' },
    data: options,
  });

/**
 * 社群管理-社群列表
 * @param options
 * @returns
 */
export const getCommunityList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/association/getList',
    data: options,
  });

/**
 * 社群管理-删除社群
 * @param options
 * @returns
 */
export const deleteCommunityList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/association/delete',
    data: options,
  });

/**
 * 话题列表-列表
 * @param options
 * @returns
 */
export const getTopicList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/communityTopic/getPageList',
    data: options,
  });
