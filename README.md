# Node JS Server exercise

## Initialize

**npm 초기화**

```
npm init
```

**Express 설치**

```
npm i express
```

## Express generator

[express-generator](https://github.com/camp-son/nodejs-server/tree/express-generator) 브랜치 참고

## Routing

### Support method function

- HTTP에서 지원되는 `GET` / `POST` / `PUT` / `DELETE` / `PATCH` 등 다양한 메소드를 지원한다.

```js
app.get({ PATH }, { HANDLER });

app.post({ PATH }, { HANDLER });

app.put({ PATH }, { HANDLER });

app.delete({ PATH }, { HANDLER });
```

- `all` 메소드는 메소드와 상관없이 모든 요청에 대해 하나의 경로에서 미들웨어 함수를 로드하는데 사용한다.
- Handler에서 응답값 설정 또는 next 함수를 호출하지 않으면 요청 상태가 변경되지 않는다.

```js
app.all({ PATH }, { HANDLER });
```

### Route path

- 라우트 경로는 문자열, 문자열 패턴, 정규식으로 정의할 수 있다.
- `express`는 `path-to-regexp` 라이브러리를 사용한다.
- 문자열 일치

  - 지정한 문자열의 경로만 허용한다.

  ```js
  app.get("/", (req, res) => {
    res.send("root");
  });

  app.get("/about", (req, res) => {
    res.send("about");
  });

  app.get("/random-text.txt", (req, res) => {
    res.send("random-text.txt");
  });
  ```

- 문자열 패턴

  - `?` `+` `*` `(` `)` 정규식 서브세트이다.

  ```js
  // /acd or /abcd
  app.get("/ab?cd", (req, res) => {
    res.send("ab?cd");
  });

  // /abcd , /abbcd , /abbbcd etc...
  app.get("/ab+cd", (req, res) => {
    res.send("ab+cd");
  });

  // /abcd , /abycd , /ababcdcd, /abQWERcd etc...
  app.get("/ab*cd", (req, res) => {
    res.send("ab*cd");
  });

  // /abe , /abcde
  app.get("/ab(cd)?e", (req, res) => {
    res.send("ab(cd)?e");
  });
  ```

- 정규식 패턴

  - 정규식을 기반으로 경로를 지정한다.

  ```js
  // a 가 포함된 모든 경로
  app.get(/a/, (req, res) => {
    res.send("/a/");
  });

  // a 가 포함된 모든 경로
  app.get(/\*fly$/, (req, res) => {
    res.send("/*fly$/");
  });
  ```

### Route handler

- 각 라우트에는 하나 또는 그 이상의 핸들러를 등록할 수 있고, 배열로도 핸들러를 등록할 수 있다.
- next를 통해 다음 핸들러로 우회할 수 있고, 제어를 후속 라우트에게 전달할 수 있다.

  ```js
  // 단일 사용
  app.get({ PATH }, { HANDLER });

  // 다중 사용
  app.get({ PATH }, { HANDLER1 }, { HANDLER2 }, { HANDLER3 });

  // 배열 사용
  app.get({ PATH }, [{ HANDLER1 }, { HANDLER2 }, { HANDLER3 }]);
  ```

### Response methods

[Support method function ](#support-method-function);

- 요청이 있으면 응답을 전송해주어야 클라이언트가 정지하지 않고 정상적인 응답을 보여줄 수 있다.
- methods
  |Method|Description|
  |--|--|
  |res.download()|파일이 다운로드되도록 프롬프트합니다.|
  |res.end()|응답 프로세스를 종료합니다.|
  |res.json()|JSON 응답을 전송합니다.|
  |res.jsonp()|JSONP 지원을 통해 JSON 응답을 전송합니다.|
  |res.redirect()|요청의 경로를 재지정합니다.|
  |res.render()|보기 템플리트를 렌더링합니다.|
  |res.send()|다양한 유형의 응답을 전송합니다.|
  |res.sendFile|파일을 옥텟 스트림의 형태로 전송합니다.|
  |res.sendStatus()|응답 상태 코드를 설정한 후 해당 코드를 문자열로 표현한 내용을 응답 본문으로서 전송합니다.|

### app.route()

- 해당 메서드를 이용하여 경로에 대한 핸들러를 체이닝할 수 있다.
  ```js
  app
    .route("/handler")
    .get((req, res) => {
      res.send("Get handler");
    })
    .post((req, res) => {
      res.send("Post handler");
    })
    .put((req, res) => {
      res.send("Put handler");
    });
  ```

### express.Router

- express에 내장되어 있는 라우팅 시스템 미들웨어이다.

  ```js
  // /route/birds.js
  var express = require("express");
  var router = express.Router();

  router.use(() => {
    // ...
  });

  router.get("/", () => {
    // ...
  });

  router.get("/about", () => {
    // ...
  });

  // app.js
  var birds = require("/route/birds");

  app.use("/birds", birds);
  ```

## Static resource

- 정적 파일을 제공하려면 기본으로 제공되는 `express.static` 미들웨어 함수를 사용한다.
- 여러 정적 파일이 있는 경우 여러번 호출하면 된다.
- 정적 리소스의 prefix를 정의할 수 있다.
- 상대 경로가 아닌 절대 경로를 권장한다.

```js
// 기본 사용
app.use(express.static("public"));

// 다중 사용
app.use(express.static("public"));
app.use(express.static("files"));

// prefix
app.use("static", express.static("public"));

// 절대 경로
app.use("static", express.static(__dirname + "public"));
```

## Middleware

- 모든 코드를 실행
- 요청 및 응답에 대한 변경을 실행
- 요청-응답 주기를 종료
- 스택 내의 그 다음 미들웨어 호출
- 미들웨어 로드 된 순서가 중요하기 때문에 로드 순서가 중요


## 참고

[Express](https://expressjs.com)
