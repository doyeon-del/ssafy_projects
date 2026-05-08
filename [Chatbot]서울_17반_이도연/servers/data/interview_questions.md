# AI 면접관용 RAG Knowledge Base

> 본 문서는 사람이 읽기 위한 일반 문서가 아니라, Retrieval-Augmented Generation(RAG) 기반 AI 면접관 시스템에서 Retrieval 품질, Chunk 응집도, Semantic Search 정확도, Reranking 품질을 극대화하기 위해 설계된 Knowledge Base이다.

---

# AI 면접관용 RAG 질문 데이터셋

> 본 문서는 AI 면접관이 지원자의 기술 역량, 문제 해결 능력, 협업 경험, 데이터/통계 기반 사고를 평가하기 위해 사용하는 RAG(Retrieval-Augmented Generation) 기반 질문 데이터셋입니다.
>
> 단순 질문 나열이 아닌, 면접관이 맥락 기반 꼬리 질문을 생성할 수 있도록 평가 포인트, 심화 방향, 좋은 답변 예시 키워드까지 포함합니다.

---

# 1. 공통 CS 및 개발 기초 (Common CS)

## 1-1. 자료구조 및 알고리즘

### Q1. Array와 Linked List의 차이점은 무엇이며, 각각 어떤 상황에서 사용하는 것이 유리한가요?

#### 상세 설명

Array는 연속된 메모리 공간에 데이터를 저장하는 자료구조이다. 인덱스를 기반으로 특정 위치에 즉시 접근할 수 있기 때문에 조회 성능이 매우 뛰어나며 일반적으로 O(1)의 시간 복잡도를 가진다. 이러한 특성 때문에 읽기 중심(Read-heavy) 시스템에서 매우 효율적이다.

반면 Linked List는 각 노드(Node)가 데이터와 다음 노드를 가리키는 포인터를 함께 저장하는 구조이다. 메모리 공간이 연속적일 필요가 없기 때문에 중간 삽입과 삭제에 유리하다. 특정 노드 위치를 알고 있는 경우 O(1)에 삽입/삭제가 가능하다. 하지만 원하는 위치까지 순차 탐색이 필요하기 때문에 조회 성능은 O(n) 수준으로 상대적으로 느리다.

현대 시스템에서는 CPU Cache Locality가 매우 중요한데, Array는 연속 메모리를 사용하기 때문에 CPU Cache Hit Rate가 높다. 반대로 Linked List는 메모리 여기저기에 노드가 흩어져 존재할 가능성이 높아 Cache Miss가 자주 발생한다. 이 때문에 실제 실무에서는 Dynamic Array 기반 자료구조가 더 많이 사용된다.

Python의 list 역시 내부적으로는 Dynamic Array 구조로 구현되어 있다. 데이터가 가득 차면 더 큰 메모리 공간을 새로 할당한 뒤 기존 데이터를 복사하는 방식으로 resize를 수행한다. 이러한 resize 비용은 순간적으로 O(n)이 발생하지만, 전체적으로는 Amortized O(1) append 성능을 제공한다.

#### 실무 관점

실제 서비스에서는:

- 조회가 많고 메모리 효율이 중요하면 Array 기반 구조 사용
- 삽입/삭제가 매우 빈번한 경우 Linked List 고려
- 대부분의 현대 애플리케이션은 Cache 효율 때문에 Array 기반 선호

예시:

- Python List → Dynamic Array 기반
- Java ArrayList → Dynamic Array 기반
- LRU Cache → Doubly Linked List + HashMap 조합

#### 평가 포인트

- 메모리 구조 이해
- 시간 복잡도 이해
- Cache Locality 이해
- Dynamic Array 이해
- 실무적 Tradeoff 이해

#### 심화 꼬리 질문

- Python list의 resize 전략은 어떻게 동작하나요?
- Cache Locality가 실제 성능에 어떤 영향을 주나요?
- 왜 현대 시스템에서 Linked List 사용 빈도가 낮나요?

#### Retrieval Keywords

`Array`, `Linked List`, `Dynamic Array`, `Cache Locality`, `Amortized Complexity`, `Pointer`, `CPU Cache`

#### Metadata

```json
{
    "category": "cs",
    "subcategory": "data_structure",
    "difficulty": "medium",
    "question_type": "core_cs"
}
```

---

### Q2. DFS와 BFS의 차이점을 설명하고, 최단 경로 문제에서 BFS를 사용하는 이유를 설명해주세요.

#### 상세 설명

DFS(Depth First Search)와 BFS(Breadth First Search)는 그래프와 트리 구조를 탐색하는 대표적인 알고리즘이다. 두 알고리즘 모두 모든 노드를 방문할 수 있지만, 탐색 방식과 사용 목적이 다르다.

DFS는 이름 그대로 한 방향으로 가능한 깊게 탐색한 뒤, 더 이상 진행할 수 없으면 이전 노드로 되돌아오는 방식이다. 일반적으로 Stack 자료구조 또는 재귀 호출을 사용해 구현한다.

예를 들어 미로 탐색 상황에서 DFS는 한 경로를 끝까지 따라가 본 뒤 막다른 길이면 다시 돌아오는 방식과 유사하다.

반면 BFS는 현재 노드와 가까운 노드부터 차례대로 탐색한다. Queue 자료구조를 사용하며, 동일한 Depth에 있는 노드를 먼저 방문한다.

예를 들어 SNS 친구 추천 시스템에서 “나와 가장 가까운 관계”를 찾는 경우 BFS 방식이 적합하다.

#### BFS가 최단 경로 문제에 적합한 이유

BFS는 가까운 노드부터 순차적으로 탐색하기 때문에, 가중치가 없는 그래프에서는 특정 노드에 최초로 도달하는 순간이 가장 짧은 경로가 된다.

예를 들어:

- 지하철 역 연결
- 게임 맵 이동
- 네트워크 Hop 탐색

처럼 모든 이동 비용이 동일한 경우 BFS는 최단 거리를 보장한다.

반면 DFS는 깊게 먼저 탐색하기 때문에 가장 먼저 찾은 경로가 최단 경로라는 보장이 없다.

#### DFS의 장점과 사용 사례

DFS는 다음 상황에서 유리하다.

- 모든 경우의 수 탐색
- 백트래킹 문제
- 조합/순열 생성
- 사이클 탐지
- 위상 정렬

특히 재귀 구조와 잘 어울리기 때문에 구현이 직관적인 경우가 많다.

#### BFS의 장점과 사용 사례

BFS는 다음 상황에서 유리하다.

- 최단 거리 탐색
- 레벨 단위 탐색
- 최소 이동 횟수 계산
- 네트워크 거리 계산

대표적으로:

- 최단 경로 알고리즘
- 웹 크롤링
- 추천 시스템

등에서 활용된다.

#### 시간 복잡도

DFS와 BFS 모두 일반적으로:

- O(V + E)

시간 복잡도를 가진다.

여기서:

- V = Vertex(정점 수)
- E = Edge(간선 수)

이다.

#### 실무 관점

실제 서비스에서는 단순 알고리즘 문제가 아니라:

- 메모리 사용량
- 재귀 깊이 제한
- 대규모 그래프 처리
- 병렬 처리 가능성

등도 고려해야 한다.

예를 들어 BFS는 Queue에 많은 노드를 저장하기 때문에 메모리 사용량이 커질 수 있다.

반면 DFS는 재귀 호출이 깊어질 경우 Stack Overflow 문제가 발생할 수 있다.

#### 평가 포인트

- Stack/Queue 자료구조 이해
- 탐색 방식 차이 이해
- 최단 경로 보장 원리 이해
- 시간 복잡도 이해
- 실제 사용 사례 이해

#### 심화 꼬리 질문

- DFS를 반복문으로 구현하는 방법은?
- BFS의 메모리 사용량 문제는 어떻게 해결할 수 있을까요?
- 가중치가 있는 그래프에서는 왜 BFS를 사용할 수 없나요?
- Dijkstra와 BFS 차이는 무엇인가요?

#### 면접관 검증 포인트

단순히 “DFS는 깊게, BFS는 넓게 탐색한다” 수준이 아니라:

- Queue/Stack 동작 방식
- 최단 경로 보장 이유
- 메모리 Tradeoff
- 재귀 기반 구현 특징
- 실제 시스템 적용 사례

까지 연결해서 설명할 수 있는지 확인한다.

#### Retrieval Keywords

`DFS`, `BFS`, `Graph Traversal`, `Shortest Path`, `Queue`, `Stack`, `Visited`, `Level Traversal`, `Backtracking`

#### Metadata

```json
{
    "category": "cs",
    "subcategory": "algorithm",
    "difficulty": "medium",
    "question_type": "core_cs",
    "concepts": ["DFS", "BFS", "Shortest Path", "Graph Traversal"]
}
```

---

### Q3. 시간 복잡도(Time Complexity)와 공간 복잡도(Space Complexity) 사이의 트레이드오프를 설명해주세요.

#### 상세 설명

시간 복잡도(Time Complexity)는 알고리즘이 실행되는 데 필요한 연산 횟수를 의미하며, 공간 복잡도(Space Complexity)는 알고리즘이 실행 중 사용하는 메모리 양을 의미한다.

실제 시스템에서는 실행 속도를 개선하기 위해 메모리를 더 많이 사용하는 경우가 많다. 이를 시간-공간 트레이드오프(Time-Space Tradeoff)라고 한다.

대표적인 예시는 캐싱(Cache)과 메모이제이션(Memoization)이다.

예를 들어 피보나치 수열을 단순 재귀로 구현하면 중복 계산이 반복되어 시간 복잡도가 O(2^n) 수준까지 증가한다. 하지만 이전 계산 결과를 메모리에 저장하면 O(n)으로 개선할 수 있다. 대신 추가 메모리를 사용하게 된다.

데이터베이스 인덱스 역시 대표적인 시간-공간 트레이드오프 사례이다. 인덱스를 생성하면 조회 속도는 빨라지지만 추가 저장 공간이 필요하고, Write 성능이 감소한다.

#### 실무 관점

실제 서비스에서는:

- 응답 속도(Latency)
- 메모리 비용
- 서버 스케일 비용
- 사용자 경험

등을 종합적으로 고려해야 한다.

예를 들어:

- 메모리는 충분하지만 응답 속도가 중요한 서비스 → Cache 적극 활용
- 메모리가 제한적인 임베디드 시스템 → 메모리 최적화 우선

전략을 선택할 수 있다.

또한 분산 시스템에서는 단순 메모리 문제가 아니라:

- 네트워크 비용
- Cache Consistency
- 데이터 동기화 비용

등도 함께 고려해야 한다.

#### 평가 포인트

- 시간/공간 복잡도 이해
- Cache 개념 이해
- Memoization 이해
- 실무적 Tradeoff 사고

#### 심화 꼬리 질문

- Redis Cache는 어떤 Tradeoff를 가지나요?
- CPU Cache와 Application Cache 차이는?
- 메모리를 더 사용해 성능을 개선한 경험이 있나요?

#### Retrieval Keywords

`Time Complexity`, `Space Complexity`, `Tradeoff`, `Memoization`, `Caching`, `Latency`, `Memory Overhead`

#### Metadata

```json
{
    "category": "algorithm",
    "subcategory": "complexity",
    "difficulty": "medium",
    "question_type": "core_cs"
}
```

---

# 2. 운영체제 및 네트워크

## 2-1. 운영체제 (OS)

### Q4. 프로세스(Process)와 스레드(Thread)의 차이를 설명해주세요.

#### 상세 설명

프로세스(Process)는 실행 중인 프로그램의 독립적인 실행 단위이다. 운영체제는 프로세스마다 독립된 메모리 공간을 할당하며, 일반적으로 Code, Data, Heap, Stack 영역을 각각 분리하여 관리한다.

예를 들어 Chrome 브라우저와 VSCode는 각각 별도의 프로세스로 실행된다.

반면 스레드(Thread)는 하나의 프로세스 내부에서 실행되는 작업 흐름 단위이다. 하나의 프로세스는 여러 개의 스레드를 가질 수 있으며, 같은 프로세스 내부의 스레드들은 Heap, Data 영역 등의 메모리를 공유한다.

즉:

- 프로세스 → 메모리 독립
- 스레드 → 메모리 공유

라는 차이가 존재한다.

#### 프로세스를 사용하는 이유

프로세스는 서로 독립된 메모리 공간을 사용하기 때문에 안정성이 높다.

예를 들어 하나의 프로세스가 비정상 종료되더라도 다른 프로세스에는 영향을 주지 않는다.

운영체제는 이러한 구조를 통해 프로그램 간 격리를 제공한다.

#### 스레드를 사용하는 이유

스레드는 메모리를 공유하기 때문에 프로세스보다 생성 비용과 Context Switching 비용이 작다.

또한:

- 병렬 처리
- 응답성 향상
- CPU 활용 증가

등이 가능하다.

예를 들어 웹 서버에서는:

- 요청 처리
- 파일 읽기
- DB 작업

등을 여러 스레드로 동시에 처리할 수 있다.

#### Context Switching

운영체제는 CPU를 여러 작업에 분배하기 위해 실행 대상을 전환한다.
이를 Context Switching이라고 한다.

프로세스 Context Switching은:

- 메모리 공간 변경
- PCB 변경
- 캐시 무효화

등이 발생하기 때문에 비용이 크다.

반면 스레드는 같은 프로세스 메모리를 공유하기 때문에 상대적으로 비용이 작다.

#### 멀티스레딩 환경 문제

스레드는 메모리를 공유하기 때문에 동기화 문제가 발생할 수 있다.

대표적인 문제:

- Race Condition
- Deadlock
- Starvation

예를 들어 두 스레드가 동시에 같은 변수 값을 수정하면 예상치 못한 결과가 발생할 수 있다.

이를 해결하기 위해:

- Mutex
- Semaphore
- Lock
- Atomic Operation

등을 사용한다.

#### 실무 관점

현대 서버 환경에서는:

- 멀티스레딩
- 멀티프로세싱
- 비동기(Event Loop)

구조를 상황에 따라 선택한다.

예를 들어:

- CPU Bound 작업 → Multi Processing
- I/O Bound 작업 → Multi Thread 또는 Async

전략을 사용하는 경우가 많다.

#### 평가 포인트

- 프로세스/스레드 메모리 구조 이해
- Context Switching 이해
- 동기화 문제 이해
- 멀티스레딩 장단점 이해
- 실무적 사용 사례 이해

#### 심화 꼬리 질문

- Race Condition은 왜 발생하나요?
- Deadlock 발생 조건은?
- Python GIL은 무엇인가요?
- 멀티프로세싱과 멀티스레딩 차이는?

#### 면접관 검증 포인트

단순히 “프로세스는 독립적이고 스레드는 공유한다” 수준이 아니라:

- 메모리 구조
- Context Switching 비용
- 동기화 문제
- 실제 서버 구조
- CPU/I/O Bound 차이

까지 연결해서 설명할 수 있는지 확인한다.

#### Retrieval Keywords

`Process`, `Thread`, `Context Switching`, `Race Condition`, `Mutex`, `Semaphore`, `Synchronization`, `Multithreading`

#### Metadata

```json
{
    "category": "os",
    "subcategory": "process_thread",
    "difficulty": "medium",
    "question_type": "operating_system",
    "concepts": ["Process", "Thread", "Context Switching", "Synchronization"]
}
```

---

### Q5. 동기(Synchronous)와 비동기(Asynchronous)의 차이를 설명해주세요.

#### 상세 설명

동기(Synchronous)는 하나의 작업이 끝날 때까지 다음 작업이 대기하는 방식이다. 즉 요청과 응답 흐름이 순차적으로 진행된다.

예를 들어 파일을 읽는 작업이 3초 걸린다면, 해당 작업이 끝날 때까지 다음 코드가 실행되지 않는다.

반면 비동기(Asynchronous)는 작업 완료를 기다리지 않고 다음 작업을 수행할 수 있는 구조이다. 요청을 보낸 뒤 결과가 준비되면 Callback, Promise, Async/Await 등을 통해 결과를 처리한다.

비동기 구조는 특히 I/O 작업에서 효율적이다.

대표적인 I/O 작업:

- 네트워크 요청
- 데이터베이스 접근
- 파일 읽기/쓰기

이러한 작업은 CPU 연산보다 대기 시간이 길기 때문에 비동기 처리를 통해 서버 자원을 효율적으로 사용할 수 있다.

#### Blocking과 Non-blocking

동기/비동기는 흐름 제어 관점이고, Blocking/Non-blocking은 작업 대기 관점이다.

- Blocking → 작업 완료까지 제어권 반환 안 함
- Non-blocking → 즉시 제어권 반환

실무에서는 두 개념을 함께 이해해야 한다.

#### Event Loop

JavaScript와 Node.js는 Event Loop 기반 비동기 구조를 사용한다.

이벤트 루프는:

- 작업 요청 등록
- 완료 이벤트 감지
- Callback 실행

과정을 반복하며 비동기 처리를 수행한다.

Python FastAPI 역시 ASGI 기반 Async 구조를 활용하여 높은 동시성을 제공한다.

#### 실무 관점

비동기 구조는:

- 높은 동시성
- 서버 자원 효율
- 응답성 향상

장점이 있지만:

- 디버깅 난이도 증가
- Callback Hell
- Race Condition
- 상태 관리 복잡성

문제가 발생할 수 있다.

또한 CPU Bound 작업은 Async만으로 성능 개선이 어렵고, Multi Processing이 더 적합할 수 있다.

#### 평가 포인트

- Sync/Async 차이 이해
- Blocking/Non-blocking 이해
- Event Loop 이해
- CPU Bound / I/O Bound 차이 이해

#### 심화 꼬리 질문

- Async가 항상 더 빠른가요?
- Python Async와 Thread 차이는?
- Event Loop는 어떻게 동작하나요?

#### Retrieval Keywords

`Synchronous`, `Asynchronous`, `Blocking`, `Non-blocking`, `Event Loop`, `Async Await`, `Concurrency`

#### Metadata

```json
{
    "category": "backend",
    "subcategory": "async",
    "difficulty": "medium",
    "question_type": "server_architecture"
}
```

---

## 2-2. 네트워크

### Q6. HTTP와 HTTPS의 차이점을 설명해주세요.

#### 상세 설명

HTTP(HyperText Transfer Protocol)는 클라이언트와 서버 간 데이터를 주고받기 위한 대표적인 애플리케이션 계층 프로토콜이다. 기본 HTTP는 평문(Plain Text) 기반으로 데이터를 전송하기 때문에 네트워크 중간에서 패킷을 가로채면 요청 및 응답 내용을 그대로 확인할 수 있다.

반면 HTTPS는 HTTP 위에 TLS(Transport Layer Security) 암호화 계층을 추가한 프로토콜이다. HTTPS를 사용하면 클라이언트와 서버 사이의 통신 내용이 암호화되므로 중간자 공격(Man-in-the-Middle Attack)이나 패킷 스니핑 위험을 크게 줄일 수 있다.

HTTPS 연결 과정에서는 TLS Handshake가 수행된다. 이 과정에서:

- 서버 인증서 검증
- 공개키 교환
- 세션 키 생성

등이 이루어진다.

이후 실제 데이터 전송은 대칭키 기반 암호화를 사용하여 성능 부담을 줄인다.

#### HTTPS가 중요한 이유

현대 웹 서비스에서는:

- 로그인 정보
- 결제 정보
- 개인정보
- API Token

등 민감한 데이터를 다루기 때문에 HTTPS는 사실상 필수이다.

또한 브라우저와 검색 엔진은 HTTPS 사용 여부를 보안 및 신뢰성 요소로 평가한다.

#### 실무 관점

실제 운영 환경에서는 HTTPS 적용 시:

- 인증서 관리
- TLS 종료 지점
- Reverse Proxy 구성
- 성능 최적화

등을 고려해야 한다.

일반적으로 Nginx나 Load Balancer에서 TLS Termination을 수행한 뒤 내부 네트워크는 HTTP로 구성하기도 한다.

#### 평가 포인트

- TLS/SSL 이해
- 암호화 목적 이해
- 인증서 개념 이해
- Handshake 흐름 이해
- HTTPS 운영 구조 이해

#### 심화 꼬리 질문

- TLS Handshake 과정은 어떻게 동작하나요?
- 공개키 암호화와 대칭키 암호화는 왜 함께 사용하나요?
- HTTPS가 HTTP보다 느린 이유는?

#### Retrieval Keywords

`HTTP`, `HTTPS`, `TLS`, `SSL`, `Certificate`, `Encryption`, `Handshake`, `MITM`

#### Metadata

```json
{
    "category": "network",
    "subcategory": "http_https",
    "difficulty": "medium",
    "question_type": "network_core"
}
```

---

### Q7. REST API란 무엇이며, 좋은 REST API 설계 원칙은 무엇인가요?

#### 상세 설명

REST(Representational State Transfer)는 웹 기반 시스템 간 통신을 단순하고 일관성 있게 만들기 위한 아키텍처 스타일이다. REST API는 자원(Resource)을 URI로 표현하고, HTTP Method를 활용하여 자원에 대한 행위를 정의한다.

예를 들어:

- GET /users → 사용자 조회
- POST /users → 사용자 생성
- PUT /users/1 → 사용자 수정
- DELETE /users/1 → 사용자 삭제

처럼 URI는 자원을 표현하고, HTTP Method는 동작을 표현한다.

REST의 핵심 특징 중 하나는 Stateless 구조이다. 서버는 클라이언트 상태를 저장하지 않으며, 모든 요청은 독립적으로 처리 가능해야 한다.

#### 좋은 REST API 설계 원칙

좋은 REST API는:

- 일관성 있는 URI 설계
- HTTP Method의 의미 준수
- 명확한 상태 코드 반환
- Resource 중심 구조
- 예측 가능한 응답 형식

을 가져야 한다.

예를 들어:

- 200 OK → 정상 조회
- 201 Created → 생성 성공
- 400 Bad Request → 잘못된 요청
- 401 Unauthorized → 인증 실패

등 HTTP Status Code를 명확히 사용하는 것이 중요하다.

#### 실무 관점

실제 서비스에서는 단순 REST 원칙뿐 아니라:

- API Versioning
- 인증/인가
- Rate Limiting
- Pagination
- API 문서화

등도 함께 고려해야 한다.

대규모 서비스에서는 Swagger(OpenAPI)를 사용해 API 명세 자동화 및 협업 효율을 높이는 경우가 많다.

#### 평가 포인트

- REST 구조 이해
- Resource 중심 설계 이해
- HTTP Method 이해
- Stateless 구조 이해
- 실무 API 설계 경험

#### 심화 꼬리 질문

- PUT과 PATCH 차이는 무엇인가요?
- REST와 GraphQL 차이는?
- API Versioning은 어떻게 관리하시겠습니까?

#### Retrieval Keywords

`REST API`, `HTTP Method`, `Resource`, `Stateless`, `URI`, `Status Code`, `OpenAPI`

#### Metadata

```json
{
    "category": "backend",
    "subcategory": "api_design",
    "difficulty": "medium",
    "question_type": "backend_core"
}
```

---

# 3. 데이터베이스 및 데이터 아키텍처

## 3-1. 데이터베이스

### Q8. 데이터베이스 정규화(Normalization)가 필요한 이유는 무엇인가요?

#### 상세 설명

정규화(Normalization)는 데이터 중복을 최소화하고 데이터 무결성을 유지하기 위해 테이블 구조를 체계적으로 분리하는 데이터베이스 설계 기법이다.

정규화의 가장 큰 목적은:

- 데이터 중복 제거
- 삽입/삭제/수정 이상 현상 제거
- 데이터 일관성 유지

이다.

예를 들어 하나의 테이블에 사용자 정보와 주문 정보를 모두 저장하면:

- 사용자 주소 변경 시 여러 행 수정 필요
- 주문 삭제 시 사용자 정보까지 삭제 가능
- 신규 사용자 등록 시 주문 정보 없으면 저장 불가능

같은 문제가 발생할 수 있다.

이를 각각 User 테이블과 Order 테이블로 분리하면 데이터 중복과 이상 현상을 줄일 수 있다.

#### 주요 정규형

제1정규형(1NF):

- 컬럼 값이 원자값이어야 함

제2정규형(2NF):

- 부분 함수 종속 제거

제3정규형(3NF):

- 이행 함수 종속 제거

실무에서는 일반적으로 3NF 수준까지 적용하는 경우가 많다.

#### 실무 관점

완전한 정규화가 항상 좋은 것은 아니다.

정규화를 과도하게 적용하면 JOIN이 많아져 조회 성능이 저하될 수 있다.

따라서 실제 서비스에서는:

- OLTP 시스템 → 정규화 중심
- 분석 시스템(OLAP) → 반정규화 활용

전략을 선택하는 경우가 많다.

예를 들어 조회 성능이 매우 중요한 서비스에서는 일부 중복을 허용하는 반정규화(Denormalization)를 사용하기도 한다.

#### 평가 포인트

- 데이터 무결성 이해
- 이상 현상 이해
- 정규형 개념 이해
- 정규화/반정규화 Tradeoff 이해

#### 심화 꼬리 질문

- 반정규화를 사용하는 이유는?
- JOIN 비용이 커지면 어떤 문제가 발생하나요?
- 실무에서 완전 정규화를 잘 하지 않는 이유는?

#### Retrieval Keywords

`Normalization`, `Data Integrity`, `Denormalization`, `Anomaly`, `JOIN`, `Schema Design`

#### Metadata

```json
{
    "category": "database",
    "subcategory": "normalization",
    "difficulty": "medium",
    "question_type": "database_core"
}
```

---

### Q9. 인덱스(Index)의 동작 원리를 설명해주세요.

#### 상세 설명

인덱스(Index)는 데이터베이스에서 검색 속도를 향상시키기 위한 자료구조이다. 인덱스가 없다면 데이터베이스는 원하는 데이터를 찾기 위해 테이블 전체를 순차적으로 탐색하는 Full Table Scan을 수행해야 한다. 데이터 양이 적을 때는 문제가 크지 않지만, 수백만 건 이상의 데이터가 존재하는 환경에서는 성능 병목이 발생할 수 있다.

대부분의 관계형 데이터베이스(MySQL, PostgreSQL 등)는 기본적으로 B-Tree 기반 인덱스를 사용한다. B-Tree는 균형 트리(Balanced Tree) 구조로 구성되며, 데이터가 정렬된 상태로 저장된다. 따라서 특정 값을 찾을 때 전체 데이터를 순차 탐색하지 않고 트리를 따라 내려가며 탐색할 수 있기 때문에 일반적으로 O(log n)의 탐색 성능을 제공한다.

예를 들어 사용자 테이블에서 email 컬럼에 인덱스가 존재한다면:

```sql
SELECT * FROM users WHERE email = 'test@example.com';
```

쿼리 수행 시 데이터베이스는 전체 테이블을 읽지 않고 인덱스를 통해 빠르게 위치를 찾을 수 있다.

#### 인덱스의 장점

- 조회 성능 향상
- 정렬(Order By) 최적화
- 범위 검색(Between, Greater Than) 최적화
- JOIN 성능 향상

특히 WHERE, ORDER BY, JOIN 조건에 자주 사용되는 컬럼은 인덱스 적용 효과가 크다.

#### 인덱스의 단점

인덱스는 무조건 많다고 좋은 것이 아니다.

데이터 삽입(INSERT), 수정(UPDATE), 삭제(DELETE) 시 인덱스도 함께 수정되어야 하기 때문에 Write 성능이 저하된다.

즉:

- Read-heavy 시스템 → 인덱스 효과 큼
- Write-heavy 시스템 → 인덱스 과다 사용 주의

가 필요하다.

또한 인덱스는 별도의 저장 공간을 사용하기 때문에 메모리 및 디스크 사용량이 증가한다.

#### Composite Index

복합 인덱스(Composite Index)는 여러 컬럼을 조합하여 생성하는 인덱스이다.

예시:

```sql
INDEX(user_id, created_at)
```

이 경우:

- user_id 검색 가능
- user_id + created_at 검색 가능
- created_at 단독 검색은 비효율적

이라는 특징이 있다.

따라서 복합 인덱스에서는 컬럼 순서가 매우 중요하다.
일반적으로:

- Cardinality가 높은 컬럼
- 자주 필터링되는 컬럼

을 앞쪽에 배치한다.

#### 실무 관점

실제 운영 환경에서는 단순히 인덱스를 추가하는 것이 아니라 실행 계획(EXPLAIN)을 분석하여 병목을 확인한다.

대표적으로 확인하는 요소:

- Full Table Scan 발생 여부
- Index Range Scan 사용 여부
- Filesort 발생 여부
- Temporary Table 생성 여부

등이 있다.

대규모 서비스에서는:

- 너무 많은 인덱스
- 불필요한 복합 인덱스
- 낮은 Cardinality 컬럼 인덱싱

이 오히려 성능 저하 원인이 되기도 한다.

#### 평가 포인트

- B-Tree 구조 이해
- Full Scan과 Index Scan 차이 이해
- Read/Write Tradeoff 이해
- Composite Index 이해
- 실행 계획 분석 이해

#### 심화 꼬리 질문

- Cardinality가 낮은 컬럼에 인덱스를 걸면 왜 비효율적인가요?
- Covering Index란 무엇인가요?
- Clustered Index와 Non-Clustered Index 차이는?
- 인덱스가 있어도 사용되지 않는 경우는?

#### 면접관 검증 포인트

단순히 “검색이 빨라진다” 수준이 아니라:

- B-Tree 탐색 구조
- O(log n) 탐색 원리
- Write Overhead
- Cardinality
- 실행 계획 분석
- 실제 운영 환경 최적화

까지 설명할 수 있는지 확인한다.

#### Retrieval Keywords

`Index`, `B-Tree`, `Composite Index`, `Query Optimization`, `Execution Plan`, `Cardinality`, `Full Table Scan`, `Covering Index`

#### Metadata

```json
{
    "category": "database",
    "subcategory": "index",
    "difficulty": "medium",
    "question_type": "database_core",
    "concepts": ["B-Tree", "Composite Index", "Cardinality", "Execution Plan"]
}
```

---

## 3-2. 데이터 아키텍처

### Q10. 좋은 데이터 모델 설계란 무엇이라고 생각하시나요?

#### 평가 포인트

- 확장성 고려 여부
- 유지보수성 고려 여부
- 비즈니스 요구사항 반영 능력

#### 심화 꼬리 질문

- 스키마 변경이 잦은 시스템에서는 어떻게 설계하시겠습니까?
- 정형 데이터와 비정형 데이터는 어떻게 다르게 접근해야 하나요?

#### 좋은 답변 키워드

`Scalability`, `Maintainability`, `Flexibility`, `Domain modeling`

---

### Q11. 데이터 정의(Data Definition)가 시스템 전체 성능에 영향을 주는 이유는 무엇인가요?

#### 평가 포인트

- 데이터 중심 설계 사고
- 구조 설계 중요성 이해
- 아키텍처적 관점

#### 심화 꼬리 질문

- 잘못된 데이터 구조 설계 사례를 경험한 적 있나요?
- 데이터 스키마가 비즈니스 성장에 미치는 영향은?

#### 좋은 답변 키워드

`Schema design`, `Query efficiency`, `Data consistency`, `Architecture`

---

# 4. 통계 및 데이터 분석 특화

## 4-1. 통계 기초

### Q12. 상관관계와 인과관계의 차이를 설명해주세요.

#### 평가 포인트

- 통계적 사고력
- 데이터 해석 능력
- 비즈니스 의사결정 위험 인식

#### 심화 꼬리 질문

- 허위 상관관계(Spurious Correlation)의 사례를 설명해주세요.
- A/B 테스트는 어떻게 인과성을 검증하나요?

#### 좋은 답변 키워드

`Correlation`, `Causation`, `Confounding variable`, `Experiment design`

---

### Q13. 이상치(Outlier)는 데이터 분석에 어떤 영향을 미치며 어떻게 처리하시나요?

#### 평가 포인트

- 데이터 전처리 경험
- 통계적 판단 능력
- 분석 목적 기반 의사결정 능력

#### 심화 꼬리 질문

- 이상치를 제거하면 안 되는 경우는?
- Robust한 통계 방법에는 무엇이 있나요?

#### 좋은 답변 키워드

`IQR`, `Z-score`, `Robust statistics`, `Data preprocessing`

---

### Q14. 과적합(Overfitting)이란 무엇이며 어떻게 방지할 수 있나요?

#### 평가 포인트

- 머신러닝 기본 이해
- 일반화 성능 개념 이해
- 검증 전략 이해

#### 심화 꼬리 질문

- Bias-Variance Tradeoff 설명 가능하신가요?
- Cross Validation을 사용하는 이유는?

#### 좋은 답변 키워드

`Regularization`, `Cross validation`, `Generalization`, `Bias-Variance tradeoff`

---

# 5. AI / RAG / LLM 특화

## 5-1. LLM 및 생성형 AI

### Q15. RAG(Retrieval-Augmented Generation)의 동작 원리를 설명해주세요.

#### 상세 설명

RAG(Retrieval-Augmented Generation)는 검색 시스템(Retrieval)과 생성형 언어 모델(Generation)을 결합한 구조이다. 기존 LLM은 학습 시점 이후의 최신 정보를 알 수 없고, 학습되지 않은 도메인 지식에 대해 부정확한 답변(Hallucination)을 생성할 가능성이 있다. RAG는 이러한 문제를 해결하기 위해 외부 지식 저장소를 검색한 뒤, 검색 결과를 LLM의 Context에 함께 주입하여 응답을 생성한다.

일반적인 동작 흐름은 다음과 같다.

1. 사용자의 질문(Query)을 입력받는다.
2. 질문을 Embedding Model을 사용해 벡터(Vector)로 변환한다.
3. Vector Database에서 가장 유사한 문서를 검색한다.
4. 검색된 문서를 Prompt Context에 포함한다.
5. LLM이 Retrieval된 정보를 기반으로 응답을 생성한다.

예를 들어 사용자가 “Redis의 Cache Aside Pattern이 무엇인가?”를 질문하면, 시스템은 먼저 질문 의미를 벡터로 변환한다. 이후 Vector DB에서 Redis 캐싱 전략 관련 문서를 검색하고, 해당 내용을 Prompt에 포함하여 LLM이 답변하도록 만든다.

이 구조의 핵심은 “LLM이 직접 모든 지식을 기억하지 않아도 된다”는 점이다. 즉, 모델 자체를 재학습(Fine-tuning)하지 않고도 최신 문서나 사내 데이터, 기술 문서 등을 활용할 수 있다.

#### 왜 RAG가 중요한가?

RAG는 다음 문제를 해결하기 위해 사용된다.

- 최신 정보 반영
- 사내 문서 기반 응답
- Hallucination 감소
- 출처 기반 답변 생성
- 모델 재학습 비용 감소

특히 기업 환경에서는:

- 기술 문서
- 사내 위키
- 고객 FAQ
- 정책 문서
- 코드 문서

등을 Retrieval 대상으로 활용한다.

#### Retrieval 품질이 중요한 이유

RAG 시스템에서는 Retrieval 품질이 전체 응답 품질을 결정한다.
LLM은 Retrieval된 Context 이상으로 정확한 답변을 생성하기 어렵다.

예를 들어:

- 잘못된 문서가 검색되거나
- 관련성이 낮은 Chunk가 선택되면

LLM 역시 부정확한 답변을 생성할 가능성이 높아진다.

따라서 실제 RAG 시스템에서는:

- Chunking 전략
- Embedding 품질
- Hybrid Search
- Reranking
- Metadata Filtering

등이 매우 중요하다.

#### Fine-tuning과의 차이

Fine-tuning은 모델 내부 파라미터 자체를 변경하는 방식이다.
반면 RAG는 외부 문서를 검색하여 Context만 추가한다.

즉:

- Fine-tuning → 모델 자체 학습
- RAG → 외부 지식 검색 기반

이라는 차이가 존재한다.

실무에서는:

- 자주 변경되는 정보 → RAG
- 모델 행동 자체 변경 → Fine-tuning

방식을 선택하는 경우가 많다.

#### 평가 포인트

- Retrieval + Generation 구조 이해
- Embedding 및 Vector DB 이해
- Context Injection 개념 이해
- Hallucination 문제 이해
- Fine-tuning과의 차이 이해

#### 심화 꼬리 질문

- Retrieval 품질이 낮으면 어떤 문제가 발생하나요?
- Chunk Size는 어떻게 결정하시겠습니까?
- Hybrid Search는 왜 사용하는가요?
- Reranker는 어떤 역할을 수행하나요?
- Context Window 한계는 어떻게 해결할 수 있나요?

#### 면접관 검증 포인트

단순히 “검색 후 LLM에 넣는다” 수준이 아니라:

- Embedding 기반 검색 구조
- Semantic Similarity
- Vector Database 동작 방식
- Chunking 전략
- Retrieval Failure 문제
- Hallucination 완화 전략

까지 연결해서 설명할 수 있는지 확인한다.

#### Retrieval Keywords

`RAG`, `Retrieval-Augmented Generation`, `Embedding`, `Vector Database`, `Semantic Search`, `Chunking`, `Hybrid Search`, `Reranking`, `Context Injection`, `LLM`

#### Metadata

```json
{
    "category": "ai",
    "subcategory": "rag",
    "difficulty": "advanced",
    "question_type": "llm_system",
    "concepts": ["RAG", "Embedding", "Vector Database", "Chunking", "Hybrid Search", "Reranking"]
}
```

---

### Q16. Embedding이란 무엇이며 왜 중요한가요?

#### 평가 포인트

- 벡터 표현 이해
- 의미 기반 검색 이해
- NLP 기본 이해

#### 심화 꼬리 질문

- Cosine Similarity는 왜 사용하나요?
- Dense Embedding과 Sparse Embedding 차이는?

#### 좋은 답변 키워드

`Semantic vector`, `Cosine similarity`, `Vector space`, `Semantic search`

---

### Q17. LLM 기반 서비스에서 Hallucination 문제를 어떻게 완화할 수 있을까요?

#### 평가 포인트

- 생성형 AI 한계 이해
- 신뢰성 확보 전략 이해
- 서비스 안정성 관점

#### 심화 꼬리 질문

- 출처 기반 응답 시스템은 어떻게 설계하시겠습니까?
- Temperature 조정은 어떤 영향을 미치나요?

#### 좋은 답변 키워드

`Grounding`, `RAG`, `Source citation`, `Temperature`, `Prompt engineering`

---

# 6. 프로젝트 및 협업

## 6-1. 협업 및 커뮤니케이션

### Q18. 비개발 직군과 개발자 간 커뮤니케이션에서 가장 중요한 것은 무엇이라고 생각하시나요?

#### 평가 포인트

- 커뮤니케이션 능력
- 추상적 요구사항 해석 능력
- 기술 설명 능력

#### 심화 꼬리 질문

- 기술적 개념을 비전공자에게 설명했던 경험이 있나요?
- 요구사항 충돌 상황에서는 어떻게 대응하나요?

#### 좋은 답변 키워드

`Translation of requirements`, `Stakeholder communication`, `Alignment`

---

### Q19. 본인의 의견이 팀 내에서 반대되었을 때 어떻게 대응하시나요?

#### 평가 포인트

- 협업 태도
- 논리적 설득력
- 갈등 해결 능력

#### 심화 꼬리 질문

- 실제 사례를 들어 설명해주세요.
- 데이터 기반 설득을 어떻게 수행하나요?

#### 좋은 답변 키워드

`Evidence-based decision`, `Consensus`, `Technical reasoning`

---

## 6-2. 프로젝트 심층 질문

### Q20. 프로젝트에서 가장 어려웠던 기술적 문제는 무엇이었나요?

#### 평가 포인트

- 문제 해결 과정
- 디버깅 능력
- 학습 능력

#### 심화 꼬리 질문

- 원인을 어떻게 추적했나요?
- 다른 해결 방법도 고려했나요?
- 성능 개선 수치는 어떻게 측정했나요?

#### 좋은 답변 키워드

`Root cause analysis`, `Debugging`, `Tradeoff`, `Performance metrics`

---

### Q21. 프로젝트 설계 시 가장 중요하게 고려한 요소는 무엇인가요?

#### 평가 포인트

- 설계 철학
- 우선순위 설정 능력
- 시스템 사고

#### 심화 꼬리 질문

- 당시 다시 설계한다면 무엇을 바꾸고 싶나요?
- 기술 선택 기준은 무엇이었나요?

#### 좋은 답변 키워드

`Scalability`, `Maintainability`, `User experience`, `Architecture`

---

# 7. AI 면접관용 꼬리 질문 템플릿

## 기술 선택 검증

- “왜 그 기술을 선택하셨나요?”
- “대안 기술과 비교했을 때 장단점은 무엇이었나요?”
- “해당 기술의 한계는 무엇인가요?”

---

## 성능 및 확장성 검증

- “사용자가 100배 증가하면 어떤 문제가 발생할까요?”
- “병목 지점은 어디라고 생각하시나요?”
- “캐싱 전략을 적용한다면 어디에 적용하시겠습니까?”

---

## 데이터 기반 사고 검증

- “그 판단을 어떤 데이터로 검증하셨나요?”
- “정량적으로 성과를 어떻게 측정했나요?”
- “지표 설계는 어떻게 하셨나요?”

---

## 협업 검증

- “팀원과 의견 충돌이 발생한 적 있나요?”
- “일정 지연 상황에서 어떻게 대응했나요?”
- “본인의 역할 범위를 넘어 협업했던 경험이 있나요?”

---

# 8. 면접관 페르소나 설정

## Persona A - 기술 중심 면접관

특징:

- 깊은 CS 이해도 요구
- 기술 선택 근거 중시
- 성능 및 구조적 사고 검증

주요 관심사:

- 알고리즘
- 시스템 설계
- 성능 최적화
- 데이터 구조

---

## Persona B - 데이터/통계 중심 면접관

특징:

- 데이터 기반 사고 중시
- 통계적 해석 능력 검증
- 실험 설계 능력 확인

주요 관심사:

- 데이터 품질
- 이상치 처리
- 인과 추론
- 모델 평가

---

## Persona C - 협업 중심 면접관

특징:

- 팀워크 및 소통 능력 검증
- 갈등 해결 능력 확인
- 프로젝트 참여 태도 평가

주요 관심사:

- 커뮤니케이션
- 협업 경험
- 리더십
- 문제 해결 태도

---

# 9. AI 면접관 응답 가이드라인

AI 면접관은 다음 원칙을 기반으로 질문을 생성한다.

1. 단순 암기형 질문보다 사고 과정 중심 질문을 우선한다.
2. 지원자의 답변에서 키워드를 추출해 꼬리 질문을 생성한다.
3. 지원자의 프로젝트 경험과 연결하여 실제 사례 기반 질문을 수행한다.
4. 데이터/통계 전공자의 경우 정량적 사고를 검증하는 방향으로 심화한다.
5. 답변의 논리성과 근거 중심 사고를 평가한다.
6. 모호한 답변에는 구체적인 사례를 요구한다.
7. 기술 선택에는 항상 트레이드오프 질문을 연결한다.

---

# 10. 고급 시스템 설계 및 백엔드 심층 질문

## 10-1. 시스템 설계 (System Design)

### Q22. 대규모 트래픽을 처리하는 채팅 시스템을 설계한다면 어떤 구조를 고려하시겠습니까?

#### 평가 포인트

- 수평 확장(Horizontal Scaling) 이해
- Stateless 서버 구조 이해
- WebSocket 및 실시간 통신 이해
- 메시지 브로커 활용 이해
- 장애 대응 전략 이해

#### 심화 꼬리 질문

- Redis Pub/Sub과 Kafka의 차이는 무엇인가요?
- Sticky Session 없이 WebSocket 연결을 어떻게 관리할 수 있을까요?
- 채팅 메시지 순서를 어떻게 보장할 수 있을까요?
- 읽지 않은 메시지(Unread Count)는 어떻게 설계하시겠습니까?

#### 전문 개념 포인트

- Load Balancer
- Session Affinity
- CQRS
- Event-driven Architecture
- Backpressure
- Distributed Lock

#### 좋은 답변 키워드

`Horizontal scaling`, `WebSocket gateway`, `Redis`, `Kafka`, `Event sourcing`, `Fault tolerance`

---

### Q23. 캐시(Cache)를 사용하는 이유와 캐시 전략에 대해 설명해주세요.

#### 평가 포인트

- 캐시 계층 이해
- 병목 제거 전략 이해
- 일관성 문제 이해

#### 심화 꼬리 질문

- Cache Stampede란 무엇인가요?
- Write-through와 Write-back 차이는?
- Redis를 사용할 때 주의해야 할 점은?

#### 전문 개념 포인트

- Cache Aside Pattern
- LRU / LFU
- TTL
- Distributed Cache
- Consistency Model

#### 좋은 답변 키워드

`Cache invalidation`, `Redis`, `TTL`, `Eviction policy`, `Distributed cache`

---

## 10-2. 데이터 엔지니어링 및 파이프라인

### Q24. ETL과 ELT의 차이를 설명해주세요.

#### 평가 포인트

- 데이터 파이프라인 이해
- 데이터 웨어하우스 구조 이해
- 현대 데이터 아키텍처 이해

#### 심화 꼬리 질문

- 왜 최근에는 ELT 방식이 증가하고 있나요?
- Data Lake와 Data Warehouse의 차이는?
- Streaming Pipeline은 어떻게 구성하시겠습니까?

#### 전문 개념 포인트

- Batch Processing
- Stream Processing
- CDC(Change Data Capture)
- Airflow
- Spark
- Snowflake Schema

#### 좋은 답변 키워드

`Data pipeline`, `Transformation`, `Streaming`, `Data warehouse`, `Orchestration`

---

### Q25. 데이터 품질(Data Quality)을 어떻게 관리할 수 있을까요?

#### 평가 포인트

- 데이터 거버넌스 이해
- 품질 검증 체계 이해
- 운영 환경 고려 능력

#### 심화 꼬리 질문

- 데이터 드리프트(Data Drift)는 어떻게 감지하나요?
- 스키마 변경 대응 전략은?
- 데이터 품질 지표는 어떻게 정의하시겠습니까?

#### 전문 개념 포인트

- Data Validation
- Schema Evolution
- Data Lineage
- Observability
- Monitoring

#### 좋은 답변 키워드

`Data validation`, `Monitoring`, `Schema registry`, `Lineage`, `Drift detection`

---

# 11. 머신러닝 및 AI 심화 질문

## 11-1. 머신러닝 이론

### Q26. Bias-Variance Tradeoff를 설명해주세요.

#### 평가 포인트

- 모델 일반화 이해
- 과적합/과소적합 이해
- 모델 선택 기준 이해

#### 심화 꼬리 질문

- Ensemble 기법은 왜 성능이 좋은가요?
- 데이터 양이 적을 때 어떻게 대응하시겠습니까?

#### 전문 개념 포인트

- Generalization Error
- Regularization
- Variance Reduction
- Cross Validation

#### 좋은 답변 키워드

`Underfitting`, `Overfitting`, `Regularization`, `Generalization`

---

### Q27. Precision과 Recall 사이의 Tradeoff를 설명해주세요.

#### 평가 포인트

- 분류 모델 평가 이해
- 비즈니스 맥락 기반 판단 능력
- 임계값(Threshold) 조정 이해

#### 심화 꼬리 질문

- F1-score는 왜 사용하는가?
- ROC-AUC는 어떤 의미를 가지는가?
- 실제 서비스에서는 어떤 지표를 더 중요하게 보나요?

#### 전문 개념 포인트

- Confusion Matrix
- Class Imbalance
- Threshold Tuning
- Cost-sensitive Learning

#### 좋은 답변 키워드

`False Positive`, `False Negative`, `Threshold`, `Evaluation metric`

---

## 11-2. LLM 및 RAG 심화

### Q28. Vector Database의 내부 동작 원리를 설명해주세요.

#### 평가 포인트

- 벡터 검색 원리 이해
- Approximate Nearest Neighbor 이해
- 고차원 벡터 공간 이해

#### 심화 꼬리 질문

- HNSW란 무엇인가요?
- FAISS와 ChromaDB의 차이는?
- Embedding 차원이 너무 크면 어떤 문제가 발생하나요?

#### 전문 개념 포인트

- ANN Search
- HNSW
- IVF
- Product Quantization
- Cosine Similarity
- Euclidean Distance

#### 좋은 답변 키워드

`Vector indexing`, `ANN`, `HNSW`, `Embedding retrieval`, `Similarity search`

---

### Q29. RAG 시스템의 Retrieval 품질을 어떻게 개선할 수 있을까요?

#### 평가 포인트

- 검색 품질 향상 전략 이해
- Chunking 전략 이해
- Hybrid Search 이해

#### 심화 꼬리 질문

- Semantic Search만 사용하는 것의 한계는?
- Reranker는 왜 필요한가요?
- Chunk Size는 어떻게 결정하시겠습니까?

#### 전문 개념 포인트

- BM25
- Hybrid Retrieval
- Cross Encoder
- Reranking
- Chunk Overlap
- Metadata Filtering

#### 좋은 답변 키워드

`Hybrid search`, `Chunking`, `Reranking`, `Semantic retrieval`, `Recall improvement`

---

### Q30. LLM 기반 서비스에서 비용 최적화를 어떻게 수행할 수 있을까요?

#### 평가 포인트

- API 비용 구조 이해
- Latency/Cost Tradeoff 이해
- 모델 선택 전략 이해

#### 심화 꼬리 질문

- 작은 모델과 큰 모델을 어떻게 조합하시겠습니까?
- Prompt Compression 전략은?
- Caching은 어디에 적용할 수 있나요?

#### 전문 개념 포인트

- Token Optimization
- Prompt Compression
- Response Caching
- Routing Model
- Distillation

#### 좋은 답변 키워드

`Token cost`, `Caching`, `Model routing`, `Latency optimization`

---

# 12. DevOps 및 운영 심화

## 12-1. 배포 및 인프라

### Q31. Docker를 사용하는 이유는 무엇인가요?

#### 평가 포인트

- 컨테이너 개념 이해
- 환경 일관성 이해
- 배포 자동화 이해

#### 심화 꼬리 질문

- VM과 Container의 차이는?
- Docker Layer Cache란?
- Kubernetes는 왜 필요한가요?

#### 전문 개념 포인트

- Container Isolation
- Image Layer
- Orchestration
- CI/CD

#### 좋은 답변 키워드

`Containerization`, `Immutable infrastructure`, `Scalability`, `Deployment consistency`

---

### Q32. CI/CD Pipeline을 어떻게 설계하시겠습니까?

#### 평가 포인트

- 자동화 이해
- 테스트 전략 이해
- 배포 안정성 이해

#### 심화 꼬리 질문

- Blue-Green Deployment란?
- Rollback 전략은?
- Feature Flag를 왜 사용하는가?

#### 전문 개념 포인트

- Canary Deployment
- GitOps
- Automated Testing
- Observability

#### 좋은 답변 키워드

`CI/CD`, `Automation`, `Rollback`, `Canary deployment`, `Pipeline`

---

# 13. 기술 리더십 및 아키텍처 사고

## 13-1. 기술 의사결정

### Q33. 새로운 기술 도입 여부를 어떤 기준으로 판단하시나요?

#### 평가 포인트

- 기술 선택 기준
- 장기 유지보수 관점
- 팀 생산성 고려 능력

#### 심화 꼬리 질문

- 최신 기술을 무조건 도입하면 안 되는 이유는?
- 기술 부채(Technical Debt)를 어떻게 관리하시나요?

#### 전문 개념 포인트

- Technical Debt
- ROI
- Maintainability
- Ecosystem Stability

#### 좋은 답변 키워드

`Tradeoff`, `Maintainability`, `Technical debt`, `Ecosystem maturity`

---

### Q34. 확장 가능한 시스템을 설계할 때 가장 중요하게 고려하는 요소는 무엇인가요?

#### 평가 포인트

- 시스템 사고
- 병목 분석 능력
- 장애 대응 전략

#### 심화 꼬리 질문

- Single Point of Failure를 어떻게 제거할까요?
- Eventually Consistent 시스템을 설명해주세요.

#### 전문 개념 포인트

- CAP Theorem
- Distributed System
- Fault Tolerance
- High Availability

#### 좋은 답변 키워드

`Scalability`, `Availability`, `Resilience`, `Distributed architecture`

---

# 14. 행동 기반 심층 면접 질문

## 14-1. 문제 해결 능력 검증

### Q35. 기술적으로 실패했던 경험과 그 원인을 설명해주세요.

#### 평가 포인트

- 회고 능력
- 실패 분석 능력
- 개선 능력

#### 심화 꼬리 질문

- 당시 가장 큰 판단 실수는 무엇이었나요?
- 같은 상황이라면 지금은 어떻게 대응하시겠습니까?

#### 좋은 답변 키워드

`Retrospective`, `Root cause`, `Learning mindset`, `Iteration`

---

### Q36. 일정 압박 속에서 품질과 속도 사이의 균형을 어떻게 맞추시나요?

#### 평가 포인트

- 우선순위 설정 능력
- 현실적 판단 능력
- 리스크 관리 능력

#### 심화 꼬리 질문

- 어떤 기능을 포기할지 어떻게 결정하시나요?
- MVP 설계 경험이 있나요?

#### 좋은 답변 키워드

`Prioritization`, `MVP`, `Risk management`, `Scope control`

---
