## 2.3 Web Application Basics
### Additional Information
#### Network Address
1. [network interfaces](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=acb76dea-1aa7-e584-5ac8-012e88944e23&page=24)：参考 [network interfaces](obsidian://bookmaster?type=open-book&bid=FTcyhwpUReOpCYuo&aid=9a979fe8-11fc-7efb-ca20-bc39151b31e7&page=24)，这里不是很明白，大概指的是 Linux 下的网络接口配置。
2. [writes them to the standard error stream(which should display in your terminal window)](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=e82e60b9-2c5e-d274-3247-c88dfdf1cf92&page=24)：golang log 包默认是把错误输出到标准错误（stderr），输出到标准错误输出流的错误也会显示在终端，与输出到标准输出（stdout）不同的是：

	- stderr 的实时性更                                                                                          强，stderr 是没有缓冲的，发生错误后会马上输出。
	- 当 stdout 阻塞时发生错误，错误不会阻塞，会马上显示到终端。

### [Fixed Path and Subtree Patterns](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=33cf4a32-39ca-5844-0718-37b1f4c32dc9&page=28)

Go 的 servemux 支持两种不同类型的 URL 模式，固定路径和子树路径，固定路径不以斜杠结尾，而子树路径以斜杠结尾。

我们的两种模式 —— `"/snippet"` 和 `"/snippet/create"` 都是 固定路径的例子，在 Go 的 servemux, 像这些固定路径模式只有当请求的 URL 路径准确匹配时，才会被匹配（并且调用相应的处理器）；

相反，我们的 `"/"` 模式是一个 subtree path 的例子（因为它以"/"结尾），其他例子比如 `"/static/"`。子树路径模式（subtree path patterns），当请求 URL 路径的开头被子树路径（subtree path）匹配时，就会匹配（并且相应的处理器被调用），你可以认为子树路径（subtree path）的行为有点像它们在结尾有通配符，例如：`"/**"` 或者 `"/static/**"`

这就帮助解释了为什么 `"/"` path 会匹配所有。这个模式本质上意味着匹配后面跟随着任何字符串的单斜杠（或者什么都不匹配）。

## 2.5 Customizing HTTP Headers
1. [non-idempotent](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=323dddb5-2966-b8eb-bd68-fc2b3e49a0e2&page=35)：幂等性
### HTTP Status Code
| 状态码 | 含义 |
| ---- | ---- |
| [405](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=3cf1b47a-c5ac-d5f1-4b52-d0e7980b48b7&page=36) | method not allowed |
| [301](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=05c92eb3-aa02-aa9b-3dfe-4259415ffb69&page=33) | Permanent Redirect |

### [The http.Error Shortcut](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=3c41e5c6-58dc-98bf-f1ed-fa52f8b16196&page=39)
如果你想发送一个非 200 的状态码和一个纯文本的响应体，那么这是一个使用 `http.Error()` 简写的好机会。这是一个帮助函数，它携带一个给定的消息和状态码，然后在幕后为我们调用  `w.WriteHeader()`  和 `w.Write()` 方法。

*main.go*

```go
package main
...
func createSnippet(w http.ResponseWriter, r *http.Request) {
if r.Method != "POST" {
w.Header().Set("Allow", "POST")
// Use the http.Error() function to send a 405 status code and "Method N
// Allowed" string as the response body.
http.Error(w, "Method Not Allowed", 405)
return
}
w.Write([]byte("Create a new snippet..."))
}
...
```
### Addtitional Information 
#### [Manipulating the Header Map](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=653862a4-5f3f-4a8c-6b75-641bafc1a8fd&page=41)
```go
// Set a new cache-control header. If an existing "Cache-Control" header exists
// it will be overwritten.
w.Header().Set("Cache-Control", "public, max-age=31536000")

// In contrast, the Add() method appends a new "Cache-Control" header and can
// be called multiple times.
w.Header().Add("Cache-Control", "public")
w.Header().Add("Cache-Control", "max-age=31536000")

// Delete all values for the "Cache-Control" header.
w.Header().Del("Cache-Control")

// Retrieve the first value for the "Cache-Control" header.
w.Header().Get("Cache-Control")
```

#### Header Canonicalization

>[!NOTE]
>[Note: When headers are written to a HTTP/2 connection the header names and values will always be converted to lowercase, as per the specifications.](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=373f603b-8b9e-9c29-c38e-d286681e23dd&page=42)
>
>**注意**：当头被写到 HTTP/2 连接中时，头的名称和值总是会被转化成小写。

## 2.8 HTML Templating  and Inheritance
### Template Composition
![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202402042113182.png)

*base.layout.tmpl*

```tmpl
{{define "base"}}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{template "title" .}} - Snippetbox</title>
  </head>

  <body>
    <header>
      <h1><a href="/">Snippetbox</a></h1>
    </header>
    <nav>
      <a href="/">Home</a>
    </nav>
    <section>
      {{template "body" .}}
    </section>
  </body>
</html>
{{end}}
```

*home.page.tmpl*

```tmpl
{{template "base" .}}

{{define "title"}}Home{{end}}

{{define "body"}}
<h2>Latest Snippets</h2>
<p>There's nothing to see here yet!</p>
{{end}}
```

> [!NOTE]
> [Note: If you’re wondering, the dot at the end of the {{template "title" .}} action represents any dynamic data that you want to pass to the invoked template. We’ll talk more about this later in the book.](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=3a718cf1-3492-ee19-cd60-f7a721297155&page=59)
> 
> `{{template "title" .}}` 操作后面的点表示你想传递给被调用的模板的任何数据。

```go
// Define a home handler function which writes a byte slice containing
// "Hello from Snippetbox" as the response body
func home(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}

	// Initialize a slice containing the paths to the two files.
	// Note that the home.page.tmpl file must be the *first* file
	// in the slice.
	files := []string{
		"./ui/html/home.page.tmpl",
		"./ui/html/base.layout.tmpl",
	}

	// Use the template.ParseFiles() function to read the template
	// file into a template set. If there's an error, we log the
	// detailed error message and the http.Error() function to
	// send a generic 500 Internal Server Error response to the
	// user.
	ts, err := template.ParseFiles(files...)
	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Internal Server Error", 500)
		return
	}

	err = ts.Execute(w, nil)
	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Internal Server Error", 500)
	}
}
```

>[!WARNING]
>home.page.tmpl 这个文件必须是切片中的第一个文件。
### Additional Information 
[The Block Action](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=713e1c2d-fd82-7803-672c-fa8b8c1e112f&page=64)

## 2.9 Serving Static Files 
### Additional Information 
#### Features and Fucnctions
[Range requests](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=41908ac0-1960-c408-23c3-ee0b3ea0a800&page=74)

## 2.10 The http.Handler Interface
### [Handler Functions](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=8f702e6a-3470-886a-6b0f-af37ffc4f234&page=77)
### Requests Are Handled Concurrently
[race conditions](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=38573a88-9f92-8587-b012-ec9cc560506a&page=80)

## 3.2 Leveled Logging
### Additional Information 
#### [Concurrent Logging](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=5b9679b4-2211-a4cd-1e2e-c4f6c03fbae6&page=95)
[self-documenting](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=ac790c09-0368-e937-d6ee-f4f521620eac&page=107)：In computer programming, self-documenting (or self-describing) is a common descriptor for source code and user interfaces that follow certain loosely defined conventions for naming and structure. These conventions are intended to enable developers, users, and maintainers of a system to use it effectively without requiring previous knowledge of its specification, design, or behavior.

# 4 Database-Driven Responses
## 4.2 Installing a Database Driver
语义版本控制：[Semantic Versioning 2.0.0 | Semantic Versioning (semver.org)](https://semver.org/#semantic-versioning-200)

### [go.sum 文件的作用](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=4800c11d-b1bc-51bf-ea03-e24563007359&page=123)

go.sum 文件包含所需包对应的校验和，如果你打开它，你应该看到类似如下的内容：

*文件：go.sum*

```mod
module snippetbox  
  
go 1.21.5  
  
require github.com/go-sql-driver/mysql v1.7.1 // indirect
```

不像 go.mod 文件，go.sum 没有被设计成像我这样的人类可编辑，而且一般你不需要打开它，但是它起两个非常重要的作用：

- 如果你在你的终端运行 `go mod verify` 命令，这将验证下载到你的机器的包的校验和是否和 sum.go 文件中的条目一致，如果一致，你可以自信的认为他们没有被修改。
- 如果其他人需要下载项目的所有依赖——你可以通过运行 `go mod download`——如果有一些下载的依赖和文件中的校验和不匹配，他们将会得到一个错误。

## 4.4 Designing a Database Model
[nitty-gritty](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=355df2f0-a59b-9fa6-488a-93fe5d82e2c6&page=132)：n. 事实真相，本质。 

## 4.5 Executing SQL Statements
### Additional Information 
#### [Placeholder Parameters](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=c6491264-9957-484e-ee09-55cb6ea62bd0&page=144)

*snippetbox/cmd/web*

```go
// Insert This will insert a new snippet into the database.
func (m *SnippetModel) Insert(title, content, expires string) (int, error) {
	// Write the SQL statement we want to exercise. I've split it
	// over two lines for readability (which is why it's surrounded
	// with backquotes instead of normal double quotes).
	stmt := `INSERT INTO snippets (title, content, created, expires)
	VALUES(?, ?, UTC_TIMESTAMP(), DATE_ADD(UTC_TIMESTAMP(), INTERVAL ? DAY))`

	// Use the Exec() method on the embedded connection pool
	// to execute the statement. The first parameter is the
	// SQL statement, followed by the title, content and
	// expiry values for the placeholder parameters. This
	// method returns a sql.Result object, which contains some
	// basic information about what happened when the statement
	// was executed.
	result, err := m.DB.Exec(stmt, title, content, expires)
	if err != nil {
		return 0, err
	}

	// Use the LastInsertId() method on the result object to get
	// the ID of our newly inserted record in the snippets table.
	id, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	// The ID returned has the type int64, so we convert it to an
	// int type before returning.
	return int(id), nil
}
```

在上述的代码中，我们利用**占位符参数**来构造我们的 SQL 语句，？就是我们想要插入的数据占位符。

使用占位符参数来构造我们的查询字符串参数（而不是字符串插入）是帮助我们避免来自不被信任的，来自用户提供的输入的 SQL 注入攻击。

在幕后，`DB.Exec()` 方法会执行如下三步：

1. 他会在数据库中使用提供的 SQL 语句生成一个预处理语句. 数据库解析并且解析语句，然后将其存储起来准备用以执行。
2. 在第二个单独的步骤，`Exec()` 向数据库传入参数值。数据随后使用这些参数执行预处理语句，因为参数后面才被传输，在语句已经被编译之后，数据库会将他们看成纯数据。他们不会改变语句的意图。只要原始语句不来源于不被信任的数据，依赖注入就不会发生 。
3. 它接下来关闭（或者清理）在数据库中的预处理语句。

占位符参数依赖你的数据库而有说不同。MySQL，SQL Server 和 SQLite 使用 ？记号，但是 PostgreSQL 使用 $N 符号，例如，如你使用 PostgreSQL，你应该使用的写法：

```go
_, err := m.DB.Exec("INSERT INTO ... VALUES ($1, $2, $3)", ...)
```

## 4.6 Single-record SQL Queries
### [Type Conversions](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=17bea6e6-8e63-0e78-c059-433baf971818&page=148)
Behind the scenes of rows.Scan() your driver will automatically convert the raw output from the SQL database to the required native Go types. So long as you’re sensible with the types that you’re mapping between SQL and Go, these conversions should generally Just Work. Usually:

- CHAR, VARCHAR and TEXT map to string.
- BOOLEAN maps to bool.
- INT maps to int; BIGINT maps to int64.
- DECIMAL and NUMERIC map to float.
- TIME, DATE and TIMESTAMP map to time.Time.

A quirk of our MySQL driver is that we need to use the **parseTime=true** parameter in our DSN to force it to convert TIME and DATE fields to time.Time. Otherwise it returns these as `[]byte` objects. This is one of
the many driver-specific parameters that it oﬀers.

## [4.7 Multiple-record SQL Queries](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=298b25ca-edad-0660-c683-0b81354027b5&page=154)

*pkg/models/mysql/snippets.go*

```go
// Latest This will return the 10 most recently created snippets
func (m *SnippetModel) Latest() ([]*models.Snippet, error) {
	// Write the SQL statement we want to execute.
	stmt := `SELECT id, title, content, created, expires FROM snippets
	WHERE expires > UTC_TIMESTAMP() ORDER BY created DESC LIMIT 10`

	// Use the Query() method on the connection pool to execute our
	// SQL statement. This returns a sql.Rows returns a Rows
	// resultset containing the result of our query.
	rows, err := m.DB.Query(stmt)
	if err != nil {
		return nil, err
	}

	// We defer rows.Close() to ensure the sql.Rows resultset is
	// always properly closed before the Latest() method returns.
	// This defer statement should come *after* you check for an
	// error from the Query() method. Otherwise, if Query() return
	// an error, you'll get a panic trying to close a nil resultset.
	defer rows.Close()

	// Initialize an empty slice to hold the models.Snippet objects.
	snippets := []*models.Snippet{}

	// Use rows.Next to iterate through the rows in the resultset.
	// This prepares the first (and then each subsequent) row to
	// be acted on by the rows.Scan() method. If iteration over all
	// the rows completes then the resultset automatically closes
	// itself and frees-up the underlying database connection.
	for rows.Next() {
		// Create a pointer to a new zeroed Snippet struct.
		s := &models.Snippet{}
		// Use rows.Scan() to copy the values from each field in
		// the row to the new Snippet object that we created. Again,
		// the arguments to row.Scan() must pointers to the place
		// you want to copy the data into, and the number of arguments
		// must be exactly the same as the number of columns returned
		// by your statement.
		err = rows.Scan(&s.ID, &s.Title, &s.Content, &s.Created, &s.Expires)
		if err != nil {
			return nil, err
		}
		// Append it to the slice of snippets.
		snippets = append(snippets, s)
	}

	// When the rows.Next() loop has finished we call rows.Err() to
	// to retrieve an error that was encountered during the iteration.
	// It's important to call this - don't assume that a successful
	// iteration was completed over the whole resultset.
	if err = rows.Err(); err != nil {
		return nil, err
	}

	// if everything went OK then return the Snippets slice.
	return snippets, nil
}

```

> [!important] 
> 用 `defer rows.Close()` 关闭 `resultset` 在这是很重要的。只要 `resultset` 是打开的，它将保持底层的数据库链接是打开的···，所以如果在这个方法中出现了一些错误并且 `resultset` 没有关闭，它可能很快导致在连接池中的所有连接被用完。

### [Working with Transactions](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=5797a7b9-5dda-b3e0-8502-121f73aa6f45&page=161)
意识到调用 `Exec()`、`Query` 和 `QueryRow()` 可以使用 `sql.DB` 池中的任何连接池是非常重要的。即使你有两次调用，在你的代码中相互之间是立即执行的，也没法保证他们将会使用相同的数据库连接。

有时候这是不可接受的，例如，如果你用 MySQL 的 `LOCK TABLE` 给一个表加锁，你必须在相同的连接上调用 `UNLOCK TABLE` 去避免死锁。

为了保证相关的链接被使用，你可以用一个事务来包裹多条语句。这是基本方式：

```go
type ExampleModel struct {
	DB *sql.DB
}

func (m *ExampleModel) ExampleTransaction() error {
	// Calling the Begin() method on the connection pool creates a new sql.Tx
	// object, which represents the in-progress database transaction.
	tx, err := m.DB.Begin()
	if err != nil {
		return err
	}

	// Call Exec() on the transaction, passing in your statement and any
	// parameters. It's important to notice that tx.Exec() is called on the
	// transaction object just created, NOT the connection pool. Although we're
	// using tx.Exec() here you can also use tx.Query() and tx.QueryRow() in
	// exactly the same way.
	_, err = tx.Exec("INSERT INTO ...")
	if err != nil {
		// If there is any error, we call the tx.Rollback() method on the
		// transaction. This will abort the transaction and no changes will be
		// made to the database.
		tx.Rollback()
		return err
	}
	// Carry out another transaction in exactly the same way.
	_, err = tx.Exec("UPDATE ...")
	if err != nil {
		tx.Rollback()
		return err
	}
	// If there are no errors, the statements in the transaction can be committe
	// to the database with the tx.Commit() method. It's really important to ALW
	// call either Rollback() or Commit() before your function returns. If you
	// don't the connection will stay open and not be returned to the connectio
	// pool. This can lead to hitting your maximum connection limit/running out
	// resources.
	err = tx.Commit()
	return err
}
```

如果你想将多条 SQL 语句作为单个原子行为来执行，事务也是超级有用的。只要你在事件的任何错误中使用`tx.Rollback()` 方法，事务保证下面两种情况之一：

- 所有的语句都执行成功；或者
- 没有语句执行成功并且数据库保持不变。
### [Managing Connections](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=0ade0940-3473-f895-6ae5-549495e20ebe&page=163)
### [Prepared statements](obsidian://bookmaster?type=open-book&bid=gNZeRcxcHTYvWxQm&aid=409c22b1-127a-79c0-627f-514a1362fff2&page=164)

# 6 Middleware
## 6.2 Setting Security Headers 
### Additional Information 
#### Flow of Control
*snippetbox/cmd/web/middleware.go*

```go
package main

import "net/http"

func secureHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-XSS-Protection", "1; mode=block")
		w.Header().Set("X-Frame-Options", "deny")

		next.ServeHTTP(w, r)
	})
}
```

知道当最后一个在链上处理器返回时，控制流程是沿着链的反方法传递的。所有当我们的代码被执行时，控制流程实际上看起来像这样：

```plain
secureHeaders -> servemux -> application header -> servemux ->secureHeaders
```

在任何的中间件处理器，在 `next.ServeHTTP()` 之前的代码将会沿着链向下执行，并且任何在 `next.ServeHTTP()` 后面的代码 —— 或者在延迟函数中代码 —— 将会沿着链的反方向执行。

```go
func myMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Any code here will execute on the way down the chain.
		next.ServeHTTP(w, r)
		// Any code here will execute on the way back up the chain.
	})
}
```





