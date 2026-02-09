
// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initRegulationItems();
    initTouchFeedback();
});

// 初始化章程列表项
function initRegulationItems() {
    const regulationItems = document.querySelectorAll('.regulation-item');

    regulationItems.forEach((item, index) => {
        // 添加点击事件
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const title = this.querySelector('.regulation-title').textContent;
            const dateElement = this.querySelector('.regulation-date');
            const date = dateElement ? dateElement.textContent : '';
            handleRegulationClick(title, date, index + 1);
        });

        // 添加触摸反馈
        item.addEventListener('touchstart', function() {
            this.style.background = '#f5f8ff';
        });

        item.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.background = '#ffffff';
            }, 200);
        });

        item.addEventListener('touchcancel', function() {
            this.style.background = '#ffffff';
        });
    });
}

// 处理章程点击事件
function handleRegulationClick(title, date, itemId) {
    console.log(`点击了宣讲: ${title}, 日期: ${date}`);

    // 方式1：显示alert（临时方案）
    const message = date ?
        `查看招生宣讲\n\n标题: ${title}\n日期: ${date}\n\n这里可以跳转到宣讲详情页面` :
        `查看招生宣讲\n\n标题: ${title}\n\n这里可以跳转到宣讲详情页面`;
    alert(message);

    // 方式2：跳转到详情页面（实际使用时取消注释）
    /*
    window.location.href = `regulation_detail.html?id=${itemId}`;
    */

    // 方式3：打开PDF文件（实际使用时取消注释）
    /*
    const pdfURL = getRegulationPDF(itemId);
    window.open(pdfURL, '_blank');
    */
}

// 获取章程PDF链接（示例函数）
function getRegulationPDF(itemId) {
    const pdfURLs = {
        '1': '../../assets/documents/regulation_2025_summer.pdf',
        '2': '../../assets/documents/regulation_2025_spring.pdf',
        '3': '../../assets/documents/regulation_2024_summer.pdf',
        '4': '../../assets/documents/regulation_2024_spring.pdf',
        '5': '../../assets/documents/regulation_2023_summer.pdf'
    };

    return pdfURLs[itemId] || '';
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
        if (e.target.closest('.regulation-item')) {
            e.preventDefault();
        }
    });
}

// 工具函数：平滑滚动
function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 工具函数：检测是否为移动设备
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}