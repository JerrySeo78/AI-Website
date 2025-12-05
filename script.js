// GAS Web App URL (Drive 프록시)
const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbwEQkpQNPic-7b87d19QGLNiZlWWmnUu-5OU6Ibm0FHlBsPvpC3lXL5bGAn5c5aThnM/exec';

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', async function() {
    await loadTrendsData();
});

// GAS에서 트렌드 데이터 로드 (GAS가 Drive에서 읽어옴)
async function loadTrendsData() {
    try {
        const response = await fetch(GAS_API_URL);
        const data = await response.json();
        
        if (data && data.length > 0) {
            // JSON 데이터를 trendsData 형식으로 변환
            window.trendsData = data.map(item => ({
                rank: item.rank,
                keyword: item.keyword,
                summary: item.summary,
                links: item.links.map((url, index) => ({
                    title: ['네이버 검색', '네이버 뉴스', '다음 뉴스'][index],
                    url: url
                }))
            }));
            
            loadKeywordList();
            showTrendDetail(0); // 1위 항목을 기본으로 표시
        } else {
            // 데이터가 없으면 샘플 데이터 사용
            useSampleData();
        }
    } catch (error) {
        console.error('트렌드 데이터 로드 실패:', error);
        // 에러 시 샘플 데이터 사용
        useSampleData();
    }
}

// 샘플 데이터 사용 (백업용)
function useSampleData() {
    window.trendsData = [
        {
            rank: 1,
            keyword: "데이터 로딩 중...",
            summary: "실시간 트렌드TOP10 데이터를 불러오는 중입니다. 잠시만 기다려주세요.",
            links: []
        }
    ];
    loadKeywordList();
    showTrendDetail(0);
}

// 키워드 리스트 생성
function loadKeywordList() {
    const keywordList = document.getElementById('keywordList');
    keywordList.innerHTML = '';

    window.trendsData.forEach((trend, index) => {
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
    const trend = window.trendsData[index];

    // 제목 업데이트
    const title = document.getElementById('contentTitle');
    title.textContent = `실시간 검색 순위 No.${trend.rank} ${trend.keyword} AI 요약`;

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

