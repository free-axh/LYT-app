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
 * 领用工单 - 获取物品领用规则
 * @param {*} options
 * @returns
 */
export const getRecipientsRules = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/objLengMsg/getList',
    data: options,
  });

/**
 * 领用工单 - 获取物品领用规则
 * @param {*} options
 * @returns
 */
export const updateRecipientsRules = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/objLengMsg/update',
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
 * 社群管理-社群审核
 * @param options
 * @returns
 */
export const updateCommunityList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/association/update',
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

/**
 * 话题列表-删除列表
 * @param options
 * @returns
 */
export const deleteTopicList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/communityTopic/delete',
    data: options,
  });

/**
 * 话题列表-发起审核
 * @param options
 * @returns
 */
export const updateTopicList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/communityTopic/update',
    data: options,
  });

/**
 * 社群成员-列表
 * @param options
 * @returns
 */
export const getMemberList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/associationPeople/getList',
    data: options,
  });

/**
 * 社群成员-移除
 * @param options
 * @returns
 */
export const deleteMemberList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/associationPeople/delete',
    data: options,
  });

/**
 * 发布列表-查询列表
 * @param options
 * @returns
 */
export const getReleaseList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/associationPublish/getList',
    data: options,
  });

/**
 * 发布列表-删除列表
 * @param options
 * @returns
 */
export const deleteReleaseList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/associationPublish/delete',
    data: options,
  });

/**
 * 发布列表-发布审核
 * @param options
 * @returns
 */
export const updateReleaseList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/associationPublish/update',
    data: options,
  });

/**
 * 设备告警-列表查询
 * @param options
 * @returns
 */
export const getEquipmentWarningList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/rubbishDeviceAlarm/getList',
    data: options,
  });

/**
 * 设备列表-列表查询
 * @param options
 * @returns
 */
export const getEquipmentList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/rubbishDevice/getList',
    data: options,
  });

/**
 * 投放记录-列表查询
 * @param options
 * @returns
 */
export const getRecordList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/rubbishClassification/getList',
    data: options,
  });

/**
 * 垃圾分类-累计分类次数
 * @param options
 * @returns
 */
export const getCount = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/rubbishClassification/getCount',
    data: options,
  });

/**
 * 垃圾分类-累计赠送积分
 * @param options
 * @returns
 */
export const getTotalScore = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/rubbishClassification/getTotalScore',
    data: options,
  });

/**
 * 每日食谱-列表查询
 * @param options
 * @returns
 */
export const getRecipeList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/food/getGroupList',
    data: options,
  });

/**
 * 每日食谱-新增食谱
 * @param options
 * @returns
 */
export const addRecipeList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/food/add',
    data: options,
  });

/**
 * 每日食谱-删除食谱
 * @param options
 * @returns
 */
export const deleteRecipeList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/food/delete',
    data: options,
  });

/**
 * 每日食谱-详情
 * @param options
 * @returns
 */
export const detailRecipeList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/food/getList',
    data: options,
  });

/**
 * 每日食谱-编辑
 * @param options
 * @returns
 */
export const updateRecipeList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/food/update',
    data: options,
  });

/**
 * 商品列表-列表查询
 * @param options
 * @returns
 */
export const getFoodGoodsList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/foodCommodity/getList',
    data: options,
  });

/**
 * 商品列表-商品类别
 * @param options
 * @returns
 */
export const getGoodsTypeList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/foodType/getList',
    data: options,
  });

/**
 * 商品列表-商品新增
 * @param options
 * @returns
 */
export const addGoodsTypeList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/foodCommodity/add',
    data: options,
  });

/**
 * 商品列表-删除商品
 * @param options
 * @returns
 */
export const deleteGoodsTypeList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/foodCommodity/delete',
    data: options,
  });

/**
 * 商品列表-删除商品
 * @param options
 * @returns
 */
export const updatePutaway = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/foodCommodity/updatePutaway',
    data: options,
  });

/**
 * 商品列表-删除商品
 * @param options
 * @returns
 */
export const detailGoodsTypeList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/foodCommodity/getById',
    data: options,
  });

/**
 * 分类管理-列表查询
 * @param options
 * @returns
 */
export const getSortList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/foodType/getPageList',
    data: options,
  });

/**
 * 分类管理-新增列表
 * @param options
 * @returns
 */
export const addSortList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/foodType/add',
    data: options,
  });

/**
 * 分类管理-编辑列表
 * @param options
 * @returns
 */
export const updateSortList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/foodType/update',
    data: options,
  });

/**
 * 分类管理-删除列表
 * @param options
 * @returns
 */
export const deleteSortList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/foodType/delete',
    data: options,
  });

/**
 * 订单管理-列表查询
 * @param options
 * @returns
 */
export const getOrderList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/foodPay/getPageList',
    data: options,
  });

/**
 * 订单管理-列表详情
 * @param options
 * @returns
 */
export const detailOrderList = (options?: object) =>
  axios({
    method: 'post',
    url: '/ocean/foodPay/getById',
    data: options,
  });
