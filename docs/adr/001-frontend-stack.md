# ADR 001：静态前端技术栈

## 决策

使用 Vite、React、TypeScript 和结构化原生 CSS。测试使用 Vitest、React Testing Library、Playwright 和 axe-core。简繁转换使用动态加载的 `opencc-js`。项目输出纯静态 `dist/`，通过 GitHub Actions 部署 GitHub Pages。

## 原因

- APEX 原项目为 React + TypeScript，开户材料来源为 TypeScript 结构数据，格式化是纯前端逻辑。同栈可在不依赖原项目的前提下保留类型与来源映射。
- Vite 能为 GitHub Pages 配置确定的子路径 `base`，构建产物无服务端、数据库、密钥或运行时 API。
- React 只承担语言、展开、示例选择、材料助手和 Toast 等局部状态，不引入路由或全局状态库。
- 原生 CSS 可精确落实编辑排版、响应式网格和降低动效，同时避免重型 UI 组件库的视觉同质化。
- OpenCC 转换包在用户首次选择繁体时才进入页面，不阻塞默认简体首屏。

## 性能与维护成本

项目不引入重型 UI、动画、图标或状态管理依赖。首屏图形使用内联 SVG/CSS，非首屏内容无外部字体、视频或统计脚本。维护者只需更新单一简体内容文件、专业术语字典、APEX 脱敏数据与独立生活数据。

## 未采用方案

- **Astro**：对文本页面非常合适，但本站的全页语言层、复制状态和 APEX 互动会形成一个较大的 React island，反而增加边界和测试成本。
- **Vite 原生 TypeScript**：依赖更少，但手工管理语言与多个可访问交互的 DOM 状态成本更高，与 APEX React 来源的迁移类型也更远。
- **Next.js/服务端渲染**：没有服务端需求，增加部署与运行时复杂度。
- **Ant Design/Material UI/Tailwind 组件套件**：不符合私人编辑手记的视觉边界，并引入不必要的体积或样式抽象。

