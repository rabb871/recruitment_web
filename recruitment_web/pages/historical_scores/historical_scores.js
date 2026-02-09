// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initProvinceButtons();
    initTouchFeedback();
});

// 初始化省份按钮
function initProvinceButtons() {
    const provinceButtons = document.querySelectorAll('.province-btn');

    provinceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const province = this.getAttribute('data-province');
            handleProvinceClick(province);
        });

        // 添加触摸反馈
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.97)';
        });

        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// 处理省份点击事件
function handleProvinceClick(province) {
    console.log('选择省份:', province);

    // 方式1：显示alert（临时方案）
    alert(`查看${province}历年分数\n\n这里将显示${province}的历年录取分数线数据`);

    // 方式2：跳转到省份详情页（实际使用时取消注释）
    /*
    window.location.href = `province_detail.html?province=${encodeURIComponent(province)}`;
    */

    // 方式3：显示弹窗内容（实际使用时取消注释）
    /*
    showProvinceScores(province);
    */
}

// 显示省份分数详情（示例）
function showProvinceScores(province) {
    // 这里可以创建一个模态框显示详细的分数数据
    const modal = document.createElement('div');
    modal.className = 'score-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${province}历年录取分数线</h2>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <table class="score-table">
                    <thead>
                        <tr>
                            <th>年份</th>
                            <th>批次</th>
                            <th>最低分</th>
                            <th>最高分</th>
                            <th>平均分</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2025</td>
                            <td>本科批</td>
                            <td>510</td>
                            <td>580</td>
                            <td>545</td>
                        </tr>
                        <tr>
                            <td>2024</td>
                            <td>本科批</td>
                            <td>505</td>
                            <td>575</td>
                            <td>540</td>
                        </tr>
                        <tr>
                            <td>2023</td>
                            <td>本科批</td>
                            <td>500</td>
                            <td>570</td>
                            <td>535</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // 关闭按钮事件
    modal.querySelector('.close-btn').addEventListener('click', function() {
        modal.remove();
    });

    // 点击背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
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
        if (e.target.closest('.province-btn')) {
            e.preventDefault();
        }
    });
}

// 工具函数：按省份加载历史数据
function loadProvinceData(province) {
    // 这里可以通过API获取实际数据
    // 示例数据结构
    const mockData = {
        province: province,
        years: [
            { year: 2025, batch: '本科批', min: 510, max: 580, avg: 545 },
            { year: 2024, batch: '本科批', min: 505, max: 575, avg: 540 },
            { year: 2023, batch: '本科批', min: 500, max: 570, avg: 535 }
        ]
    };

    return mockData;
}

// 工具函数：检测是否为移动设备
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
