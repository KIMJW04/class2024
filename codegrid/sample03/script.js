gsap.registerPlugin(Draggable); // Draggable 플러그인 등록

window.onload = function () { // 페이지 로드 시 실행되는 함수
    const timeline = document.querySelector(".timeline"); // 타임라인 요소 선택
    const scroller = document.querySelector(".scroller"); // 스크롤러 요소 선택
    const container = document.querySelector(".container"); // 컨테이너 요소 선택
    const timelineWidth = timeline.offsetWidth; // 타임라인의 너비
    const scrollerWidth = scroller.offsetWidth; // 스크롤러의 너비
    const gap = parseInt(window.getComputedStyle(document.body).fontSize); // 폰트 크기를 정수로 변환하여 gap 계산

    const maxDragX = timelineWidth - scrollerWidth - 2 * gap; // 최대 드래그 가능 거리 계산

    // 타임라인에 50개의 마커를 생성하여 추가
    for (let i = 0; i < 50; i++) {
        const marker = document.createElement("div"); // 새로운 div 요소 생성
        marker.className = "marker"; // 마커에 클래스 추가 (스타일링 가능)
        timeline.appendChild(marker); // 타임라인에 마커 추가
    }

    // Draggable 객체 생성
    Draggable.create(scroller, {
        type: "x", // 드래그 타입을 x축으로 설정
        bounds: {
            minX: gap, // 최소 드래그 위치
            maxX: timelineWidth - scrollerWidth - gap, // 최대 드래그 위치
        },
        onDrag: function () { // 드래그 시 실행될 함수
            let progress = (this.x - gap) / maxDragX; // 드래그 진행도 계산
            // 진행도에 따라 컨테이너의 x축 이동 거리 계산
            let containerX = -400 * (timelineWidth / 100) * progress;
            // GSAP을 사용하여 컨테이너 이동 애니메이션 실행
            gsap.to(container, {
                x: containerX,
                duration: 1, // 애니메이션 지속 시간
                ease: "power3.out", // 애니메이션 효과 설정
            });
        },
    });
}

/*
로직 설명:

1. 페이지가 로드되면 `window.onload` 함수가 실행됩니다.
2. 타임라인, 스크롤러, 컨테이너 요소를 선택하고, 타임라인과 스크롤러의 너비 및 폰트 크기를 계산하여 최대 드래그 가능 거리를 설정합니다.
3. 타임라인에 50개의 마커를 생성하여 추가합니다.
4. GSAP의 Draggable 플러그인을 사용하여 스크롤러를 x축으로 드래그 가능하게 만듭니다.
   - 드래그 가능한 범위는 `minX`와 `maxX`로 설정됩니다.
   - 드래그 이벤트가 발생하면 `onDrag` 함수가 호출됩니다.
5. `onDrag` 함수는 드래그 진행도를 계산하고, 진행도에 따라 컨테이너의 x축 이동 거리를 계산합니다.
6. GSAP을 사용하여 컨테이너를 계산된 거리만큼 이동시키는 애니메이션을 실행합니다.
*/
