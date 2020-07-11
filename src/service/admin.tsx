import http from './axios'

export const login = (params: string) => {
  return http
    .get('/admin/login', {
      params
    })
    .then((res) => {})
}

// uploadFileRequest  图片上传
export const uploadFileRequest = (params: string) => {
  return http
    .post(
      '/uploadFile',
      {},
      {
        data: params,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    .then((res) => {})
}
