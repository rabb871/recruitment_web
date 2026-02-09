// ==================== 组件加载器 ====================
// 用于在页面中动态加载可复用的HTML组件

/**
 * 加载HTML组件到指定位置
 * @param {string} componentPath - 组件文件的路径
 * @param {string} targetSelector - 目标容器的CSS选择器
 * @param {Function} callback - 加载完成后的回调函数（可选）
 */
function loadComponent(componentPath, targetSelector, callback) {
    fetch(componentPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            const targetElement = document.querySelector(targetSelector);
            if (targetElement) {
                targetElement.innerHTML = html;

                // 如果有回调函数，执行它
                if (typeof callback === 'function') {
                    callback();
                }
            } else {
                console.error(`目标元素未找到: ${targetSelector}`);
            }
        })
        .catch(error => {
            console.error('加载组件失败:', error);
        });
}

/**
 * 批量加载多个组件
 * @param {Array} components - 组件配置数组 [{path: '...', target: '...'}, ...]
 * @param {Function} callback - 所有组件加载完成后的回调函数（可选）
 */
function loadComponents(components, callback) {
    const promises = components.map(component => {
        return fetch(component.path)
            .then(response => response.text())
            .then(html => {
                const targetElement = document.querySelector(component.target);
                if (targetElement) {
                    targetElement.innerHTML = html;
                }
            });
    });

    Promise.all(promises)
        .then(() => {
            if (typeof callback === 'function') {
                callback();
            }
        })
        .catch(error => {
            console.error('批量加载组件失败:', error);
        });
}
