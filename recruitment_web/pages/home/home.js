// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化
    initPlayButton();
    initGridItems();
    initTouchFeedback();
    initCollegeAccordion();
    initCollegeBackgrounds();
    initWaterDrops();

    // 添加窗口大小改变监听
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            console.log('窗口大小已调整');
        }, 250);
    });
});

// 初始化播放按钮
function initPlayButton() {
    const playButton = document.querySelector('.play-button');

    if (playButton) {
        playButton.addEventListener('click', function(e) {
            e.preventDefault();
            playVideo();
        });
    }
}

// 播放视频功能
function playVideo() {
    const videoPlaceholder = document.querySelector('.video-placeholder');

    // 添加点击动画
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.style.transform = 'scale(0.9)';
        setTimeout(() => {
            playButton.style.transform = 'scale(1)';
        }, 150);
    }

    // 这里可以添加实际的视频播放逻辑
    console.log('播放视频');
    alert('视频播放功能 - 请在这里添加实际的视频 URL');

    // 实际使用时可以替换为：
    // videoPlaceholder.innerHTML = `
    //     <video controls autoplay style="width: 100%; height: 100%; border-radius: 12px;">
    //         <source src="your-video-url.mp4" type="video/mp4">
    //     </video>
    // `;
}

// 初始化功能卡片
function initGridItems() {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach((item, index) => {
        // 添加点击事件
        item.addEventListener('click', function(e) {
            e.preventDefault();
            handleCardClick(this, index);
        });

        // 添加触摸反馈
        item.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });

        item.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });

        item.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// 处理卡片点击事件
function handleCardClick(element, index) {
    // 查找卡片标题，支持 .card-title 和 .card-title1
    const cardTitleElement = element.querySelector('.card-title') || element.querySelector('.card-title1');
    if (!cardTitleElement) {
        console.error('未找到卡片标题');
        return;
    }
    const cardTitle = cardTitleElement.textContent.trim().replace(/<br>/g, '').replace(/\s+/g, '');

    console.log(`点击了: ${cardTitle}`);

    // 根据不同的卡片执行不同的操作
    const actions = {
        '视频韶院': function() {
            window.location.href = '../school_video/school_video.html';
        },
        '招生简章': function() {
            window.location.href = '../admission_regulations/admission_regulations.html';
        },
        '报考指南': function() {
            window.location.href = '../admission_guide/admission_guide.html';
        },
        '招生计划': function() {
            window.location.href = '../admission_plan/admission_plan.html';
        },
        '历年分数': function() {
            window.location.href = '../historical_scores/historical_scores.html';
        },
        '学校概况': function() {
            window.location.href = '../school_profile/school_profile.html';
        },
        '招生宣讲及咨询会': function() {
            window.location.href = '../admission_presentation/admission_presentation.html';
        },
        '联系我们': function() {
            window.location.href = '../contact_us/contact_us.html';
        }
    };

    // 查找匹配的操作
    for (let key in actions) {
        if (cardTitle.includes(key) || key.includes(cardTitle)) {
            actions[key]();
            return;
        }
    }

    // 默认操作
    alert(`功能开发中: ${cardTitle}`);
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
        if (e.target.closest('.grid-item') || e.target.closest('.play-button')) {
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

// 工具函数：获取视口尺寸
function getViewportSize() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight
    };
}

// 页面可见性变化处理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('页面已隐藏');
        // 暂停视频等操作
    } else {
        console.log('页面已显示');
        // 恢复操作
    }
});

// 网络状态监听
window.addEventListener('online', function() {
    console.log('网络已连接');
});

window.addEventListener('offline', function() {
    console.log('网络已断开');
    alert('网络连接已断开，请检查您的网络设置');
});

// ==================== 学院展开/折叠功能 ====================

function initCollegeAccordion() {
    const collegeItems = document.querySelectorAll('.college-item');

    collegeItems.forEach(item => {
        const header = item.querySelector('.college-header');
        const content = item.querySelector('.college-content');
        const expandBtn = item.querySelector('.expand-btn');
        const expandText = expandBtn.querySelector('.expand-text');
        const expandIcon = expandBtn.querySelector('.expand-icon');

        // 切换展开/折叠的函数
        const toggleCollapse = function() {
            // 判断当前状态
            const isExpanded = content.classList.contains('expanded');

            if (isExpanded) {
                // 折叠
                content.classList.remove('expanded');
                item.classList.add('collapsed');
                expandText.textContent = '展开';
                expandIcon.classList.add('collapsed-icon');  // 添加旋转class
            } else {
                // 展开
                content.classList.add('expanded');
                item.classList.remove('collapsed');
                expandText.textContent = '折叠';
                expandIcon.classList.remove('collapsed-icon');  // 移除旋转class

                // 如果内容为空,动态加载功能网格
                if (!content.innerHTML.trim()) {
                    loadCollegeContent(content);
                }
            }
        };

        // 点击整个header区域触发
        header.addEventListener('click', function(e) {
            e.preventDefault();
            toggleCollapse();
        });
    });
}

// 动态加载学院功能内容
function loadCollegeContent(contentElement) {
    const functionGrid = `
        <div class="college-grid">
            <div class="college-function">
                <img src="../../assets/home/学院简介.png" alt="学院简介" class="function-icon">
                <span class="function-name">学院简介</span>
            </div>
            <div class="college-function">
                <img src="../../assets/home/专业介绍.png" alt="专业介绍" class="function-icon">
                <span class="function-name">专业介绍</span>
            </div>
            <div class="college-function">
                <img src="../../assets/home/学院宣传片.png" alt="学院宣传片" class="function-icon">
                <span class="function-name">学院宣传片</span>
            </div>
            <div class="college-function">
                <img src="../../assets/home/历年分数.png" alt="历年分数" class="function-icon">
                <span class="function-name">历年分数</span>
            </div>
            <div class="college-function">
                <img src="../../assets/home/就业渠道.png" alt="就业渠道" class="function-icon">
                <span class="function-name">就业渠道</span>
            </div>
            <div class="college-function">
                <img src="../../assets/home/校友风采.png" alt="校友风采" class="function-icon">
                <span class="function-name">校友风采</span>
            </div>
            <div class="college-function">
                <img src="../../assets/home/学子说专业.png" alt="学子说专业" class="function-icon">
                <span class="function-name">学子说专业</span>
            </div>
        </div>
    `;

    contentElement.innerHTML = functionGrid;

    // 添加功能项点击事件
    const functions = contentElement.querySelectorAll('.college-function');
    functions.forEach(func => {
        func.addEventListener('click', function() {
            const functionName = this.querySelector('.function-name').textContent;
            alert(`跳转到: ${functionName}`);
        });
    });
}

// ==================== 初始化学院背景图片 ====================

function initCollegeBackgrounds() {
    const collegeItems = document.querySelectorAll('.college-item');

    collegeItems.forEach(item => {
        const collegeName = item.querySelector('.college-name');
        const collegeBackground = item.querySelector('.college-background');

        if (collegeName && collegeBackground) {
            const name = collegeName.textContent.trim();
            // 设置背景图片路径，例如：马克思主义学院logo.png
            const imagePath = `../../assets/home/${name}logo.png`;

            // 设置背景图片
            collegeBackground.style.backgroundImage = `url('${imagePath}')`;

            // 可选：添加图片加载失败时的处理
            const img = new Image();
            img.src = imagePath;
            img.onerror = function() {
                // 如果图片加载失败，保留原来的渐变背景
                console.warn(`学院logo图片未找到: ${imagePath}`);
                collegeBackground.style.backgroundImage = 'none';
            };
        }
    });
}

// ==================== 水滴动画效果 ====================

function initWaterDrops() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    // 创建水滴容器
    const waterDropsContainer = document.createElement('div');
    waterDropsContainer.className = 'water-drops';
    heroSection.appendChild(waterDropsContainer);

    // 创建单个水滴
    function createWaterDrop() {
        const drop = document.createElement('div');
        drop.className = 'water-drop';

        // 随机位置
        const leftPosition = Math.random() * 100;
        drop.style.left = leftPosition + '%';

        // 随机大小 (3-8px)
        const size = Math.random() * 5 + 3;
        drop.style.width = size + 'px';
        drop.style.height = size * 1.2 + 'px';

        // 随机下落速度 (2-5秒)
        const duration = Math.random() * 3 + 2;
        drop.style.animationDuration = duration + 's';

        // 随机延迟
        const delay = Math.random() * 2;
        drop.style.animationDelay = delay + 's';

        waterDropsContainer.appendChild(drop);

        // 动画结束后移除元素
        drop.addEventListener('animationend', function() {
            drop.remove();
        });
    }

    // 定期生成水滴
    function generateDrops() {
        // 每次生成1-3个水滴
        const dropCount = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < dropCount; i++) {
            createWaterDrop();
        }
    }

    // 每隔500-1500ms生成一批水滴
    function scheduleNextDrop() {
        const interval = Math.random() * 1000 + 500;
        setTimeout(function() {
            generateDrops();
            scheduleNextDrop();
        }, interval);
    }

    // 开始生成水滴
    scheduleNextDrop();

    // 初始生成一些水滴
    for (let i = 0; i < 3; i++) {
        createWaterDrop();
    }
}

