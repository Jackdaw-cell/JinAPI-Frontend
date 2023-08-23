// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addPost POST /api/interfaceInfo/add */
export async function addPostUsingPOST(
  body: API.InterfaceInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/interfaceInfo/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deletePost POST /api/interfaceInfo/delete */
export async function deletePostUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/interfaceInfo/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** editPost POST /api/interfaceInfo/edit */
export async function editPostUsingPOST(
  body: API.PostEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/interfaceInfo/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getPostVOById GET /api/interfaceInfo/get/vo */
export async function getPostVOByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPostVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePostVO>('/api/interfaceInfo/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listPostVOByPage POST /api/interfaceInfo/list/page/vo */
export async function listPostVOByPageUsingPOST(
  body: API.InterfaceInfoQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostVO>('/api/interfaceInfo/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMyPostVOByPage POST /api/interfaceInfo/my/list/page/vo */
export async function listMyPostVOByPageUsingPOST(
  body: API.InterfaceInfoQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostVO>('/api/interfaceInfo/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** searchPostVOByPage POST /api/interfaceInfo/search/page/vo */
export async function searchPostVOByPageUsingPOST(
  body: API.InterfaceInfoQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostVO>('/api/interfaceInfo/search/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updatePost POST /api/interfaceInfo/update */
export async function updatePostUsingPOST(
  body: API.InterfaceInfoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/interfaceInfo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function createSseClient(uid: string | number | undefined,
                                      options?: any) {
  return request<any>( '/api/interfaceInfo/invokeByCreateSse', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Accept: 'application/json',
      charset: 'UTF-8',
      "uid": uid,
      'dataType': 'json'
    },
    ...(options || {}),
  });
}
