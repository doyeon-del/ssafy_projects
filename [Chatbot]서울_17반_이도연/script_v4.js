// script.js - [기본 코드] GPT와 직접 통신하기
// 목표: 백엔드 서버(/chat)로 메시지를 보내고, GPT 응답을 console.log로 확인하기

function sendMessage() {
    // 1. 입력창에서 사용자가 입력한 텍스트 가져오기
    const inputElement = document.getElementById("user-input");
    const userMessage = inputElement.value;

    // 빈 메시지이면 실행 안 함
    if (userMessage === "") {
        console.log("메시지를 입력해주세요!");
        return;
    }

    const sendButton = document.getElementById("send-btn");

    // 1. 엔터키 감지
    inputField.addEventListener("keydown", function (event) {
        // keypress 대신 keydown이 더 정확하며, IME(한글 입력) 중복 방지를 위해 확인이 필요할 수 있습니다.
        if (event.key === "Enter" && !event.isComposing) {
            event.preventDefault(); // 엔터의 기본 동작 방지
            sendMessage();
        }
    });

    // 2. 버튼 클릭 감지
    sendButton.addEventListener("click", function () {
        sendMessage();
    });

    // console.log("=== 채팅 시작 ===");
    // console.log("내가 보낸 메시지:", userMessage);

    addMessage(userMessage, "user");

    // 2. 서버로 메시지 보내기 (fetch API 사용)
    fetch("http://localhost:8000/integrated-chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
    })
        .then(function (response) {
            // 3. 서버 응답을 JSON으로 변환
            return response.json();
        })
        .then(function (data) {
            // 4. 콘솔에 결과 출력
            console.log("GPT의 답변:", data.answer);
            console.log("=== 채팅 끝 ===");
            addMessage(data.answer, "bot", data.source);

            console.log(data.score);
            console.log(data.source);

            // 입력창 비우기
            inputElement.value = "";
        })
        .catch(function (error) {
            console.error("오류 발생:", error);
            console.log("서버가 켜져 있는지 확인해주세요!");
        });

    inputElement.value = "";
}

// // 새 메세지가 도달하였을 때, 새로운 UI를 챗 윈도우에 추가하는 함수
// function addMessage(message, type, source) {
//     if (!message) return;

//     const chatWindow = document.querySelector("#chat-window");
//     const divTag = document.createElement("div");
//     divTag.classList.add("message", type); // [📍 수정된 부분 시작]
//     // 1. 답변 텍스트를 담을 요소 생성

//     const textContentDiv = document.createElement("div");
//     textContentDiv.classList.add("text-content"); // 2. marked 라이브러리를 이용해 마크다운을 HTML로 변환하여 주입
//     // innerHTML을 사용해야 변환된 HTML 태그들이 실제로 렌더링됩니다.
//     // 중요: 신뢰할 수 없는 입력을 다룰 때는 보안(XSS)에 주의해야 하지만,
//     // 지금처럼 백엔드 GPT 답변만 보여주는 경우는 괜찮습니다.
//     // CSS에서 마크다운 요소(p, ul, li 등) 스타일링을 위해 클래스 추가

//     textContentDiv.innerHTML = marked.parse(message);

//     divTag.appendChild(textContentDiv);

//     // 새로운 스타일과 내부에 들어갈 텍스트(컨텐츠) 요소를 준비하기
//     // 만약에 스타일이 봇이라면
//     if (type === "bot") {
//         divTag.classList.add("bot");
//         // 만약에 이러한 응답에 새로운 소스가 존재한다면 소스표기
//         if (source) {
//             const sourceDivTag = document.createElement("div");
//             sourceDivTag.classList.add("sorce-tag");
//             sourceDivTag.textContent = "출처: " + source;
//             divTag.appendChild(sourceDivTag);
//         }
//     } else if (type === "user") {
//         divTag.classList.add("user");
//     }

//     divTag.classList.add("message");

//     divTag.textContent = message; // 텍스트 주입하기

//     // 챗 윈도우에 우리가 준비한 div 태그를 자식 요소로 넣기
//     chatWindow.appendChild(divTag);

//     // 자동 스크롤
//     chatWindow.scrollTo({
//         top: chatWindow.scrollHeight,
//         behavior: "smooth",
//     });
// }

function addMessage(message, type, source) {
    const chatWindow = document.querySelector("#chat-window");
    const divTag = document.createElement("div");
    divTag.classList.add("message", type);

    if (type === "bot") {
        // 📍 textContent 대신 innerHTML을 사용하고 marked.parse를 거쳐야 합니다.
        divTag.innerHTML = marked.parse(message);

        if (source) {
            const sourceDiv = document.createElement("div");
            sourceDiv.className = "source-tag"; // CSS에서 .source-tag 스타일링 필요
            sourceDiv.textContent = "출처: " + source;
            divTag.appendChild(sourceDiv);
        }
    } else {
        divTag.textContent = message;
    }

    chatWindow.appendChild(divTag);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function toggleUpload() {
    const panel = document.getElementById("upload-panel");
    // 버튼 클릭 시 패널을 껐다 켰다 하는 로직
    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }
}

// 입력창 요소 가져오기
const inputField = document.getElementById("user-input");

// 입력창에서 키보드가 눌렸을 때 발생하는 이벤트 감시
inputField.addEventListener("keypress", function (event) {
    // 눌린 키가 'Enter' 인지 확인 (Enter 키의 고유 이름은 "Enter"입니다)
    if (event.key === "Enter") {
        // 기본 동작(페이지 새로고침 등) 방지
        event.preventDefault();

        // 전송 함수 호출
        sendMessage();
    }
});
