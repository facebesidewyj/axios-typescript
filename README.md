# Axios-TypeScript

> 基于 TypeScript 重写 Axios，暂不支持 Node 环境

## 快速开始

- 安装：`npm i @facebesidewyj/axios`

- 使用示例：

  ```javascript
  import axios from '@facebesidewyj/axios'

  axios('http://127.0.0.1:8080')
    .then(res => {
      console.info(res)
    })
    .catch(err => {
      console.error(err)
    })
  ```
