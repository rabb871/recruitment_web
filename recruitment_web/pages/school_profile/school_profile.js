// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initPlayButton();
    initTouchFeedback();
});

// 初始化播放按钮
function initPlayButton() {
    const playButton = document.querySelector('.play-button');

    if (playButton) {
        playButton.addEventListener('click', function() {
            playVideo();
        });

        // 添加触摸反馈
        playButton.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });

        playButton.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// 播放视频
function playVideo() {
    console.log('播放学校概况视频');

    // 方式1：显示alert（临时方案）
    alert('播放学校概况视频\n\n这里可以嵌入实际的视频播放器');

    // 方式2：嵌入视频播放器（实际使用时取消注释）
    /*
    const videoContainer = document.querySelector('.video-placeholder');
    const videoURL = '../../assets/videos/school_profile.mp4';

    videoContainer.innerHTML = `
        <video controls autoplay style="width: 100%; height: 100%; object-fit: cover;">
            <source src="${videoURL}" type="video/mp4">
            您的浏览器不支持视频播放
        </video>
    `;
    */

    // 方式3：跳转到外部视频链接（实际使用时取消注释）
    /*
    const videoURL = 'https://example.com/school_profile_video';
    window.open(videoURL, '_blank');
    */
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
        if (e.target.closest('.video-section')) {
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
