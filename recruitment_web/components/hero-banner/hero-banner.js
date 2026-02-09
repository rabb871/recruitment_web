// ==================== 横幅组件（完整版）====================

class HeroBannerComponent {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.options = {
            imagePath: options.imagePath || '../assets/home/banner.png',
            imageAlt: options.imageAlt || '韶关学院',
            enableWaterDrops: options.enableWaterDrops !== false, // 默认启用水滴效果
            ...options
        };
        this.init();
    }

    // 初始化组件
    init() {
        this.render();
        if (this.options.enableWaterDrops) {
            this.initWaterDrops();
        }
    }

    // 渲染HTML结构
    render() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`容器未找到: #${this.containerId}`);
            return;
        }

        container.innerHTML = `
            <div class="hero-section">
                <img src="${this.options.imagePath}"
                     alt="${this.options.imageAlt}"
                     class="campus-image">
            </div>
        `;
    }

    // 水滴动画
    initWaterDrops() {
        const heroSection = document.querySelector(`#${this.containerId} .hero-section`);
        if (!heroSection) return;

        const waterDropsContainer = document.createElement('div');
        waterDropsContainer.className = 'water-drops';
        heroSection.appendChild(waterDropsContainer);

        const createWaterDrop = () => {
            const drop = document.createElement('div');
            drop.className = 'water-drop';

            const leftPosition = Math.random() * 100;
            drop.style.left = leftPosition + '%';

            const size = Math.random() * 5 + 3;
            drop.style.width = size + 'px';
            drop.style.height = size * 1.2 + 'px';

            const duration = Math.random() * 3 + 2;
            drop.style.animationDuration = duration + 's';

            const delay = Math.random() * 2;
            drop.style.animationDelay = delay + 's';

            waterDropsContainer.appendChild(drop);

            drop.addEventListener('animationend', function() {
                drop.remove();
            });
        };

        const generateDrops = () => {
            const dropCount = Math.floor(Math.random() * 3) + 1;
            for (let i = 0; i < dropCount; i++) {
                createWaterDrop();
            }
        };

        const scheduleNextDrop = () => {
            const interval = Math.random() * 1000 + 500;
            setTimeout(() => {
                generateDrops();
                scheduleNextDrop();
            }, interval);
        };

        scheduleNextDrop();

        for (let i = 0; i < 3; i++) {
            createWaterDrop();
        }
    }

    // 销毁组件
    destroy() {
        const container = document.getElementById(this.containerId);
        if (container) {
            container.innerHTML = '';
        }
    }
}
