# 爬虫

## 简介

![image-20231222205451838](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312222054992.png)

对响应体的各种数据类型的解析

按照一定规则自动的获取互联网上的信息（随着网络的迅速发展，互联网成为大量信息的载体，如何有效地提取并利用这些信息成为一个巨大的挑战）

- 应用：
  - 搜索引擎（Google、百度、Bing 等搜索引擎，辅助人们检索信息）
  - 股票软件（爬取股票数据，帮助人们分析决策，进行金融交易）
  - Web 扫描（需要对网站所有的网页进行漏洞扫描）
  - 获取某网站最新文章收藏
  - 爬取天气预报
  - 给空间朋友点赞
  - ...

## goquery

goquery 包提供了发起 HTTP 请求并对返回结果 HTML 解析的功能

1. 发起请求：`goquery.NewDocument(url)`

​	![image-20231223123132028](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312231231172.png)

1. 解析
   1. 查找元素：`Find`

      ![image-20231223123458203](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312231234252.png)

   2. 查找子元素：`ChildrenFiltered`

      ![image-20231223132026942](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312231320000.png)

   3. 获取内容：`text`/`html`

​				![image-20231223130628481](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312231306526.png)

2.获取属性：`Attr`	

![image-20231223125412525](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312231256153.png)

1. 遍历元素：`Each`

   ![image-20231223130501872](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312231305930.png)

2. 选择器
   - `.class`/`#id`/`tag`
   - 复合选择器

## 案例：爬取 golang 官网的 package 搜索结果

这里以搜索 **goquery** 的结果为例 

```go
import (
	"fmt"
	"log"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

func main() {
	q := "goquery"

	url := "https://pkg.go.dev/search?q=" + q
	
	// 发起 http 请求，获取响应并创建 Document 结构体指针
	document, err := goquery.NewDocument(url)
	if err != nil {
		log.Fatal(err)
	}
	
    // css 选择器
	// .className
	document.Find("div.go-Content.SearchResults > div:nth-child(2) > div > div.SearchSnippet-headerContainer > h2 > a").Each(
		func(index int, tag *goquery.Selection) {
		href, exists := tag.Attr("href")
		contentText := strings.ReplaceAll(tag.Text(), " ", "")
		contentText = strings.ReplaceAll(contentText, "\n", "")
		fmt.Println(contentText, href, exists)
	})
}
```

