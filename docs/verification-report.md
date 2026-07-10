# 发布验证报告

状态：本地发布门槛通过，等待线上部署确认。

验证范围包括内容安全、ESLint、TypeScript、Vitest、Vite 生产构建、桌面与移动端 Playwright、五种宽度溢出、简繁切换、APEX 临时状态、内部锚点和线上 HTTPS 可用性。

## 2026-07-11 本地结果

- 内容安全审计：通过，公开内容未命中受限数据规则。
- ESLint：通过。
- TypeScript：通过。
- Vitest：8 个测试文件、27 项测试通过。
- Playwright：桌面 Chromium 与移动 Chromium 共 14 项测试通过。
- 响应式：375、390、430、768、1440 像素无横向溢出。
- 交互：课程阶段、简繁切换、APEX 临时材料与繁体结果、内部锚点、键盘跳转通过。
- 生产构建：HTML 0.61 KB；CSS 17.71 KB（gzip 4.22 KB）；默认 JavaScript 224.70 KB（gzip 72.48 KB）。
- OpenCC：保持为按需独立资源，不进入默认简体首屏包。

线上地址与 HTTP 验证在 Pages 部署成功后补记。
