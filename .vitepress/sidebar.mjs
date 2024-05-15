export default {
  "/Golang/": [
    {
      text: 'Golang',
      items: [
        {
          text: '基础',
          items: [
            { text: '基础语法', link: '/Golang/基础/Go基础' },
            { text: 'GoWeb基础', link: '/Golang/基础/GoWeb' },
            { text: '爬虫', link: '/Golang/基础/Go爬虫' },
            { text: '正则表达式', link: '/Golang/基础/Go基础之正则表达式' }
          ]
        },
        {
          text: '面试',
          items: [
            { text: 'panic时返回错误', link: '/Golang/面试/Panic时返回错误' }
          ]
        }
      ]
    }
  ],
  "/Web/": [
    {
      text: 'Web',
      items: [
        { text: 'HTTPS证书校验', link: '/Web/Web开发之HTTPS证书校验' }
      ]
    }
  ],
  "/NoSQL/": [
    {
      text: '基础', link: '/NoSQL/Redis 基础'
    }
  ],
  "/中间件/": [
    {
      text: 'Docker',
      items: [
        {
          text: '基础',
          items: [
            { text: 'Docker入门', link: '/中间件/Docker基础' },
            { text: '使用Docker部署Golang项目', link: '/中间件/将Golang部署到Docker' },
          ]
        },
      ]
    }
  ],
}