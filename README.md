# Axios-TypeScript

> 基于 TypeScript 重写 Axios，暂不支持 Node 环境

## 功能描述

* 构建[XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)请求
* 支持[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)API
* 支持拦截器，自定义拦截请求和响应
* 支持请求取消
* 支持JSON数据的自动转换
* 支持防止XSRF攻击

## 快速开始

- 安装：`npm i @facebesidewyj/axios`

- 使用示例：

  ```javascript
  import axios from '@facebesidewyj/axios'

  // 默认发送GET请求
  axios('http://127.0.0.1:8080')
    .then(res => {
      console.info(res)
    })
    .catch(err => {
      console.error(err)
    })
  
  // 发送GET请求，支持传入配置项
  axios.get('http://127.0.0.1:8080', {
      params: {
        name: 'axios'
      }
    })
    .then(res => {
      console.info(res)
    })
    .catch(err => {
      console.error(err)
    }) 
  
  // 发送POST请求
  axios.post('http://127.0.0.1:8080', {
      name: 'axios'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  ```

## API 使用

* axios(config)：直接使用axios函数

  ```javascript
  axios({
    method: 'get',
    url: 'http://127.0.0.1:8080',
    params: {
      name: 'axios'
    }
  });
  ```

* axios(url[, config])：配置项可不传，直接传入url

  ````javascript
  axios('http://127.0.0.1:8080')
  ````

* 方法别名：

  * axios.request(config)

  * axios.get(url[, config])
  * axios.delete(url[, config])
  * axios.head(url[, config])
  * axios.options(url[, config])
  * axios.post(url[, data[, config]])
  * axios.put(url[, data[, config]])
  * axios.patch(url[, data[, config]])

  > 使用方法别名时，可以不需要在config中指定url，method和data属性。

* axios.create([config])：创建实例，自定义请求行为

  ```javascript
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8080',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });
  ```

