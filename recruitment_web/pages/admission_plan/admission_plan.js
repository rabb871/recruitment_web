// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initProvinceButtons();
    initSearchFunction();
    initYearButtons();
    initTouchFeedback();
});

// 初始化省份按钮
function initProvinceButtons() {
    const provinceButtons = document.querySelectorAll('.province-tag');
    const currentProvinceDisplay = document.getElementById('current-province');

    provinceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const province = this.getAttribute('data-province');

            // 移除所有按钮的 active 类
            provinceButtons.forEach(btn => btn.classList.remove('active'));

            // 添加当前按钮的 active 类
            this.classList.add('active');

            // 更新显示的省份
            currentProvinceDisplay.textContent = province;

            // 处理省份切换
            handleProvinceChange(province);
        });

        // 添加触摸反馈
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });

        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// 处理省份切换
function handleProvinceChange(province) {
    console.log('切换到省份:', province);

    // 方式1：显示alert（临时方案）
    // alert(`查看${province}的招生计划`);

    // 方式2：加载对应省份的招生计划数据（实际使用时取消注释）
    /*
    loadAdmissionPlan(province);
    */

    // 方式3：更新内容展示区域（实际使用时取消注释）
    /*
    updateContentDisplay(province);
    */
}

// 初始化搜索功能
function initSearchFunction() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// 执行搜索
function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput.value.trim();

    if (searchTerm) {
        console.log('搜索:', searchTerm);

        // 方式1：显示alert（临时方案）
        alert(`搜索关键词: ${searchTerm}\n\n这里将显示搜索结果`);

        // 方式2：执行实际搜索（实际使用时取消注释）
        /*
        searchAdmissionPlan(searchTerm);
        */
    } else {
        alert('请输入搜索关键词');
    }
}

// 初始化年份按钮
function initYearButtons() {
    const yearButtons = document.querySelectorAll('.filter-btn[data-year]');

    yearButtons.forEach(button => {
        button.addEventListener('click', function() {
            const year = this.getAttribute('data-year');

            // 移除所有年份按钮的 active 类
            yearButtons.forEach(btn => btn.classList.remove('active'));

            // 添加当前按钮的 active 类
            this.classList.add('active');

            // 处理年份切换
            handleYearChange(year);
        });
    });
}

// 处理年份切换
function handleYearChange(year) {
    console.log('切换到年份:', year);

    // 方式1：显示alert（临时方案）
    // alert(`查看${year}年的招生计划`);

    // 方式2：加载对应年份的数据（实际使用时取消注释）
    /*
    const currentProvince = document.getElementById('current-province').textContent;
    loadAdmissionPlan(currentProvince, year);
    */
}

// 加载招生计划数据（示例）
function loadAdmissionPlan(province, year = '2025') {
    console.log(`加载 ${province} ${year} 年的招生计划数据`);

    // 这里可以通过API获取实际数据
    // 示例数据结构
    const mockData = {
        province: province,
        year: year,
        plans: [
            { major: '计算机科学与技术', planned: 50, type: '理科' },
            { major: '软件工程', planned: 40, type: '理科' },
            { major: '汉语言文学', planned: 30, type: '文科' }
        ]
    };

    return mockData;
}

// 更新内容展示区域
function updateContentDisplay(province) {
    const contentDisplay = document.querySelector('.content-display');

    // 这里可以根据实际需求更新显示内容
    // 例如显示表格、图片等

    // 示例：显示提示文本
    contentDisplay.innerHTML = `
        <div class="placeholder-text">
            ${province}<br>招生计划
        </div>
    `;
}

// 搜索招生计划
function searchAdmissionPlan(keyword) {
    console.log('搜索招生计划:', keyword);

    // 这里可以实现实际的搜索逻辑
    // 可以搜索专业名称、专业代码等
}

// 初始化触摸反馈
function initTouchFeedback() {
    // 禁用双击缩放
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });

    // 防止长按选择文本
    document.addEventListener('contextmenu', function(e) {
        if (e.target.closest('.province-tag') || e.target.closest('.filter-btn')) {
            e.preventDefault();
        }
    });
}

// 工具函数：检测是否为移动设备
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
