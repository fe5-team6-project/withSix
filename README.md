# <span id="top">Hobby Together</span>

[🔗 Hobby Together 바로가기](https://github.com/fe5-team6-project/withSix)

<img src="" alt="하비투게더 이미지">

-   ID : hobbytogether@gmail.com
-   PW : 123123a

### 목차

## 1. HobbyTogether 서비스 소개

**Hobby Together**은 사람들이 함께 모여 취미 생활을 즐길 수 있는 플랫폼입니다. 이곳에서는 취미가 있는 사람과 없는 사람 모두 다양한 모임을 통하여 새로운 경험을 접할 수 있으며, 서로의 취미를 공유하여 소통할 수 있습니다.

-   모임의 특징을 알 수 있는 사진, 글, 참가 비용을 통해 모임을 생성하여 사람들과 모일 수 있습니다.
-   모임 후기와 자신의 일상을 공유할 수 있는 게시물을 업로드 하여 댓글과 좋아요를 통해 사람들과 원활한 소통을 할 수 있습니다.
-   사람들과 팔로우 하여 서로의 모임 글, 모임 후기 등을 볼 수 있습니다.

## 2. 팀 소개

<table>
  <tbody>
    <tr>
      <td text-align="center"><a href=""><img src="" width="300px;" alt=""/><br /><sub><b> 팀장 </b></sub></a><br /></td>
      <td text-align="center"><a href=""><img src="" width="300px;" alt=""/><br /><sub><b> 팀원 </b></sub></a><br /></td>
      <td text-align="center"><a href=""><img src="" width="300px;" alt=""/><br /><sub><b> 팀원  </b></sub></a><br /></td>
      <td text-align="center"><a href=""><img src="" width="300px;" alt=""/><br /><sub><b> 팀원 </b></sub></a><br /></td>
     </tr>
  </tbody>
</table>

## 3. 프로젝트 개발 기간

23년 6월 12일 ~ 23년 6월 27일

## 4. 프로젝트 목표

-   취미를 공유하고 함께 즐기는 모임의 편리한 운영
-   다양한 취미 분야의 교류와 지식 공유
-   사회적 연결과 친밀감 형성
-   매년 증가하고 우울증 예방과 건강한 취미 생활

## 5. 협업 방식

### 5-1. 브랜치 전략 : GitHub Flow

[GitHub-Flow](https://github.com/fe5-team6-project/withSix/issues/2)

-   단순하고 직관적인 워크플로우 : 팀원들간의 협업을 원활하게 진행할 수 있도록 쉽고 직관적인 GitHub-Flow 방식을 채택하였습니다. 잦은 충돌이 발생할 것을 방지하고자 작업을 작은 단위로 나누고 메인 브랜치에 지속적으로 머지하는 방식으로 진행하였습니다.
-   효과적인 협업과 코드 리뷰 : 팀원들 간의 효과적인 협업과 코드 리뷰를 장려하기 위해 사용하였습니다. 각 작업은 별도의 브랜치에서 수행되고, 다른 팀원들의 리뷰와 함께 승인을 받은 후에 메인 브랜치로 머지됩니다. 이를 통해 코드의 품질을 높이고 버그를 사전에 발견하여 소프트웨어의 안정성과 신뢰성을 향상시켰습니다.

### 5-2. PR 팀원 컨펌

-   Pull Request(PR)는 코드 변경 사항을 리뷰 및 피드백을 받기 위해 메인 브랜치에 병합하기 전 제출하였습니다. PR은 최소 2명 이상의 팀원의 승인을 받고, 메인으로 병합하는 과정으로 진행하였습니다. 이를 통해 코드의 품질을 높이고 버그를 줄이며 충돌을 예방하였고, 팀원들 간의 효과적인 의사소통과 협업을 도모하였습니다.

### 5-3. 프로젝트 진행 상황 관리 : GitHub Issues

[GitHub-Issues](https://github.com/fe5-team6-project/withSix/issues)

-   원활한 협업을 위하여 팀원들의 프로젝트 진행 상황을 모니터링하고, 의견을 공유하며 오류 발생 시 함께 문제를 해결하였습니다. 버그, 기능 요청, 작업 등과 같은 이슈를 추적하고 관리하였고, 이를 통해 팀원 간의 프로젝트의 진행 상황을 쉽게 파악할 수 있었습니다.

## 6. 컨벤션

프로젝트 진행 중 팀원 간의 원활한 소통과 협업을 위하여 커밋, 코드 컨벤션을 만들었습니다.
[컨벤션&프리티어](https://github.com/fe5-team6-project/withSix/issues/4)

### 6-1. 커밋 컨벤션

```
1. 커밋 유형 지정
Feat: 새로운 기능 추가
Design : CSS, 사용자 UI 디자인 변경
Docs : 문서 수정
Style : 코드포맷, 세미콜론 누락, 개행, 코드 구조, 형태
Test : 테스트코드, 리팩토링 테스트 코드 추가
Refactor: 코드 리팩토링
Fix : 버그 및 오류 수정
Remove : 불필요한 파일 삭제
Chore : 빌드 업무, 패키지매니저, 폴더트리, 세팅 수정
rename: 파일명 혹은 폴더명 수정, 위치 옮기기
Comment : 필요한 주석 추가 및 변경

2. 커밋 메시지는 제목 & 본문 구성 & 이슈 번호
git commit -m "Feat : 팔로우 버튼 기능 구현 (#24)"
```

### 6-2. 코드 컨벤션

-   프리티어 설정

```
{
  "tabWidth": 4,
  "singleQuote": true,
  "semi": true,
  "printWidth": 80,
  "trailingComma": "es5"
}
```

-   css 컨벤션

```
position
display
width
height
margin
padding
border
background
font
기타
```

## 7. 개발 환경

### 7-1. 개발 환경

-   react / styled-component / github / git / notion / npm / prettier / vscode
    <img src='https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black'>
    <img src="https://camo.githubusercontent.com/3f990cfefb64f13d28397fe586c3aa38a81fde585de479205d63c79363ebe07a/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f446973636f72642d3732383944413f7374796c653d666f722d7468652d6261646765266c6f676f3d646973636f7264266c6f676f436f6c6f723d7768697465">
    <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
    <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
    <img src="https://camo.githubusercontent.com/d20c06f1854face8c434a4fa2ffa62a2c6d52368120cc7dafd77166da5732caf/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f74696f6e2d3030303030303f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6f74696f6e266c6f676f436f6c6f723d7768697465">
    <img src="https://camo.githubusercontent.com/9abeae4423897ca54188b931497524e0813488fa46e6851cc38474e224b1db21/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e504d2d4342333833373f7374796c653d666f722d7468652d6261646765266c6f676f3d4e504d266c6f676f436f6c6f723d7768697465">
    <img src="https://camo.githubusercontent.com/b321018f04d8b008f045076634453bb3e02522644badbe270f89e58f930c314d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f50726574746965722d4637423933453f7374796c653d666f722d7468652d6261646765266c6f676f3d7072657474696572266c6f676f436f6c6f723d7768697465">
    <img src="https://camo.githubusercontent.com/3e464611f0c5605982be6433cb91125088f0685de4db90d1c539ae711a4b61a5/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f56697375616c5f53747564696f5f436f64652d3030374143433f7374796c653d666f722d7468652d6261646765266c6f676f3d76697375616c2d73747564696f2d636f6465266c6f676f436f6c6f723d7768697465">
    <img src="https://camo.githubusercontent.com/4a1038affbb2653ec140936555b3714ddc322526be8567b489e8423a795dea18/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4669676d612d4632344531453f7374796c653d666f722d7468652d6261646765266c6f676f3d6669676d61266c6f676f436f6c6f723d7768697465">

### 7-2. node modules

## 8. 폴더구조

```
│README.md
│package.json
│package-lock.json
│.prettierrc.js
│.gitignore
├─💼public
└─💼src
    ├─🗂️assets
    │  ├─📁icons
    │  ├─📁images
    │  │  └─🗂️common
    │  └─📁logo
    ├─🗂️components
    │  ├─📁common
    │  ├─📁date
    │  ├─📁follow
    │  ├─📁footer
    │  ├─📁header
    │  ├─📁likeButton
    │  ├─📁main
    │  ├─📁modal
    │  ├─📁postDetail
    │  │  ├─📁comments
    │  │  ├─📁postSideToggle
    │  │  └─🗂️utils
    │  ├─📁search
    │  ├─📁slick
    │  ├─📁together
    │  └─📁writebutton
    ├─🗂️lib
    │  ├─📁apis
    │  │  └─🗂️constant
    │  ├─📁utils / validation
    │  │  └─🗂️image
    ├─🗂️pages
    │   ├─📁chat
    │   ├─📁follow
    │   ├─📁home
    │   ├─📁login
    │   ├─📁main
    │   ├─📁post
    │   ├─📁profile
    │   ├─📁signup
    │   ├─📁together
    │   └─📁usersearch
    ├─🗂️route
    └─🗂️store
        └─📁slices
```

## 9. 역할 분담

## 10. 기능 시현

## . 예정 리팩토링 내용

## . 소감
