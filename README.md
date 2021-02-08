# Express generator

## Express generator 생성

- 커멘드로 사용할 수 있도록 전역에 `express-generator` 설치한다.

```
npm i express-generator -g
```

- `express` 커멘드 명령어를 통해 옵션과 함께 만들 디렉토리 명을 입력하여 자동으로 생성한다.

```
express [option] [dir]

ex) express --view=ejs nodejs-server
```

- 자동으로 생성된 모듈을 설치한다.

```
npm i
```

## Express generator 구조 분석

```
├ bin
│  - www // http 서버를 실행하는 스크립트
├ public // 정적 리소스를 담아놓는 디렉토리이고, 외부에서 해당 리소스에 접근할 수 있다.
│  - images
│  - javascripts
│  - stylesheets
├ routes // 라우터를 관리하는 폴더이고, app.js에서 보면 루트 컨텐스트는 별도로 지정하여 라우트를 분리하여 관리할 수 있다.
│  - index.js
│  - users.js
├ views // 웹에 렌더링되는 파일들을 모아두는 폴더이다.
│  - error.ejs
│  - index.ejs
├ app.js // 서버의 역할을 하고 미들웨어를 관리한다.
```
