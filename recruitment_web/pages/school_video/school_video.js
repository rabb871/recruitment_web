// 视频韶院页面 JavaScript

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initVideoPlayers();
    initTouchFeedback();
});

// 初始化所有视频播放器
function initVideoPlayers() {
    const playButtons = document.querySelectorAll('.play-button');

    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const videoId = this.getAttribute('data-video-id');
            playVideo(this, videoId);
        });

        // 添加触摸反馈
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.9)';
        });

        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });

        button.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// 播放视频功能
function playVideo(buttonElement, videoId) {
    const videoPlaceholder = buttonElement.closest('.video-placeholder');

    // 添加点击动画
    buttonElement.style.transform = 'scale(0.9)';
    setTimeout(() => {
        buttonElement.style.transform = 'scale(1)';
    }, 150);

    // 这里可以添加实际的视频播放逻辑
    console.log(`播放视频 ${videoId}`);

    // 示例：可以替换为实际的视频播放
    // 方式1：使用alert提示（临时方案）
    alert(`即将播放视频 ${videoId}\n\n请在这里添加实际的视频 URL`);

    // 方式2：嵌入实际视频（实际使用时取消注释）
    /*
    const videoURL = getVideoURL(videoId); // 根据videoId获取视频URL
    videoPlaceholder.innerHTML = `
        <video controls autoplay style="width: 100%; height: 100%; border-radius: 12px;">
            <source src="${videoURL}" type="video/mp4">
            您的浏览器不支持视频播放。
        </video>
    `;
    */
}

// 根据视频ID获取视频URL（示例函数）
function getVideoURL(videoId) {
    // 这里可以配置每个视频的URL
    const videoURLs = {
        '1': '../../assets/videos/video1.mp4',
        '2': '../../assets/videos/video2.mp4',
        '3': '../../assets/videos/video3.mp4',
        '4': '../../assets/videos/video4.mp4',
        '5': '../../assets/videos/video5.mp4',
        '6': '../../assets/videos/video6.mp4',
        '7': '../../assets/videos/video7.mp4'
    };

    return videoURLs[videoId] || '';
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
        if (e.target.closest('.play-button')) {
            e.preventDefault();
        }
    });
}

// 工具函数：检测是否为移动设备
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
