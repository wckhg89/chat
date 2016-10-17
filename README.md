# 노드 JS 채팅 앱 (16.10.17 - ver 0.1.0)

### 노드 JS 채팅 앱

페이스북 로그인을 통해 채팅방에 입장하여 채팅을 나눌 수 있습니다.

### 프로젝트 구성

- Server Side
  - 엔진 : nodejs
  - 프레임 워크 : express framework
  - 템플릿 엔진 : PUG(JADE)


### 프로젝트 환경 구성

- package.json에 있는 npm을 불러오기 위해 npm install을 해주고 시작합니다.
  - 주요 npm
    - facebook login : passport, passport-facebook
    - 웹 프레임워크 : express
    - 소켓 통신 : socket.io
- 개발환경에서 진행시에는 nodemon을 이용합니다. (npm install nodemon -g)


### 버전 업데이트 히스토리

1. ver 0.1.0
    - facebook 로그인 기능
    - JADE 서버사이드 템플레이팅
    - socket.io 통신
