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
app.get([PATH], [HANDLER]);

app.post([PATH], [HANDLER]);

app.put([PATH], [HANDLER]);

app.delete([PATH], [HANDLER]);
```

- `all` 메소드는 메소드와 상관없이 모든 요청에 대해 하나의 경로에서 미들웨어 함수를 로드하는데 사용한다.
- Handler에서 응답값 설정 또는 next 함수를 호출하지 않으면 요청 상태가 변경되지 않는다.

```js
app.all([PATH], [HANDLER]);
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

## 참고

[Express](https://expressjs.com)
