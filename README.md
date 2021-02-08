# Node JS Server exercise

## 초기 설정

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

- HTTP에서 지원되는 `GET` / `POST` / `PUT` / `DELETE` / `PATCH` 등 다양한 메소드를 지원한다.

```js
app.get([PATH], [HANDLER]);

app.post([PATH], [HANDLER]);

app.put([PATH], [HANDLER]);

app.delete([PATH], [HANDLER]);
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
