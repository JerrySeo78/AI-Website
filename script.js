// 샘플 트렌드 데이터 (나중에 GAS에서 가져올 데이터)
const trendsData = [
    {
        rank: 1,
        keyword: "K-POP",
        summary: "K-POP이 글로벌 음악 시장에서 급격한 성장을 보이고 있습니다. BTS, 블랙핑크 등 주요 아티스트들의 활약으로 한국 대중음악이 전 세계적으로 주목받고 있으며, 팬 문화와 소셜 미디어의 영향으로 지속적인 인기를 얻고 있습니다.",
        links: [
            { title: "Latest K-POP News", url: "#" },
            { title: "Top K-POP Music Videos", url: "#" },
            { title: "K-POP Idol Profiles", url: "#" }
        ]
    },
    {
        rank: 2,
        keyword: "Beauty Tech",
        summary: "뷰티 테크 산업이 AI와 AR 기술을 활용한 혁신적인 제품들로 급성장하고 있습니다. 가상 메이크업 시뮬레이션과 피부 분석 기술이 소비자들에게 큰 관심을 받고 있습니다.",
        links: [
            { title: "Latest Beauty Tech Innovations", url: "#" },
            { title: "AI Makeup Apps", url: "#" },
            { title: "Skin Analysis Technology", url: "#" }
        ]
    },
    {
        rank: 3,
        keyword: "Webssons",
        summary: "웹툰과 웹소설이 결합된 새로운 형태의 콘텐츠가 인기를 끌고 있습니다. 멀티미디어 스토리텔링의 진화로 독자들에게 새로운 경험을 제공하고 있습니다.",
        links: [
            { title: "Popular Webssons", url: "#" },
            { title: "New Release Platform", url: "#" },
            { title: "Creator Interviews", url: "#" }
        ]
    },
    {
        rank: 4,
        keyword: "Gaming Culture",
        summary: "e스포츠와 게임 스트리밍 문화가 주류 문화로 자리잡고 있습니다. 프로게이머들의 활약과 함께 게임 산업이 엔터테인먼트의 중심으로 떠오르고 있습니다.",
        links: [
            { title: "E-Sports News", url: "#" },
            { title: "Top Streamers", url: "#" },
            { title: "Gaming Events", url: "#" }
        ]
    },
    {
        rank: 5,
        keyword: "Sustainable Fashion",
        summary: "환경을 생각하는 지속가능한 패션이 트렌드로 자리잡고 있습니다. 친환경 소재와 업사이클링 제품들이 주목받고 있습니다.",
        links: [
            { title: "Eco-Friendly Brands", url: "#" },
            { title: "Sustainable Materials", url: "#" },
            { title: "Upcycling Fashion", url: "#" }
        ]
    },
    {
        rank: 6,
        keyword: "Food Delivery",
        summary: "배달 문화의 진화와 함께 새로운 음식 배달 서비스들이 등장하고 있습니다. AI 기반 추천 시스템과 빠른 배송이 특징입니다.",
        links: [
            { title: "New Delivery Apps", url: "#" },
            { title: "Restaurant Partnerships", url: "#" },
            { title: "Quick Commerce", url: "#" }
        ]
    },
    {
        rank: 7,
        keyword: "Smart Cities",
        summary: "스마트 시티 기술이 도시 생활을 변화시키고 있습니다. IoT와 빅데이터를 활용한 효율적인 도시 관리가 주목받고 있습니다.",
        links: [
            { title: "Smart City Projects", url: "#" },
            { title: "IoT Infrastructure", url: "#" },
            { title: "Urban Innovation", url: "#" }
        ]
    },
    {
        rank: 8,
        keyword: "Health & Wellness",
        summary: "건강과 웰빙에 대한 관심이 높아지면서 관련 서비스와 제품들이 급증하고 있습니다. 홈 피트니스와 멘탈 헬스케어가 인기입니다.",
        links: [
            { title: "Home Fitness Trends", url: "#" },
            { title: "Mental Health Apps", url: "#" },
            { title: "Wellness Products", url: "#" }
        ]
    },
    {
        rank: 9,
        keyword: "AI Education",
        summary: "AI를 활용한 교육 플랫폼이 학습 방식을 혁신하고 있습니다. 개인 맞춤형 학습과 실시간 피드백이 특징입니다.",
        links: [
            { title: "AI Learning Platforms", url: "#" },
            { title: "EdTech Innovations", url: "#" },
            { title: "Personalized Learning", url: "#" }
        ]
    },
    {
        rank: 10,
        keyword: "Metaverse Trends",
        summary: "메타버스 플랫폼들이 다양한 산업에 접목되고 있습니다. 가상 공간에서의 소셜 활동과 비즈니스가 활발해지고 있습니다.",
        links: [
            { title: "Metaverse Platforms", url: "#" },
            { title: "Virtual Events", url: "#" },
            { title: "Digital Assets", url: "#" }
        ]
    }
];

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    loadKeywordList();
    showTrendDetail(0); // 1위 항목을 기본으로 표시
});

// 키워드 리스트 생성
function loadKeywordList() {
    const keywordList = document.getElementById('keywordList');
    keywordList.innerHTML = '';

    trendsData.forEach((trend, index) => {
        const li = document.createElement('li');
        li.className = index === 0 ? 'active' : '';
        li.innerHTML = `<span class="rank">${trend.rank}.</span> ${trend.keyword}`;
        li.onclick = () => selectKeyword(index);
        keywordList.appendChild(li);
    });
}

// 키워드 선택
function selectKeyword(index) {
    // 모든 항목의 active 클래스 제거
    const items = document.querySelectorAll('.keyword-list li');
    items.forEach(item => item.classList.remove('active'));

    // 선택된 항목에 active 클래스 추가
    items[index].classList.add('active');

    // 상세 내용 표시
    showTrendDetail(index);
}

// 상세 내용 표시
function showTrendDetail(index) {
    const trend = trendsData[index];

    // 제목 업데이트
    const title = document.getElementById('contentTitle');
    title.textContent = `Why is ${trend.keyword} #${trend.rank} Today?`;

    // 요약 업데이트
    const summary = document.getElementById('summaryText');
    summary.textContent = trend.summary;

    // 링크 업데이트
    const linksList = document.getElementById('linksList');
    linksList.innerHTML = '';
    trend.links.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.title;
        a.target = '_blank';
        li.appendChild(a);
        linksList.appendChild(li);
    });
}

// 나중에 GAS에서 데이터를 가져오는 함수 (준비용)
async function fetchTrendsFromGAS() {
    try {
        const response = await fetch('YOUR_GAS_WEB_APP_URL');
        const data = await response.json();
        // trendsData를 실제 데이터로 교체
        return data;
    } catch (error) {
        console.error('Error fetching trends:', error);
        return trendsData; // 에러 시 샘플 데이터 사용
    }
}
