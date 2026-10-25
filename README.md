# DevAI Hub - 极客 AI & 开发者精选高能导航站

> 基于 **React 19 + TypeScript + Vite 6 + Tailwind CSS v4** 构建的现代、轻量、高颜值的 AI 工具与全栈开发者导航与实用工作台。

---

## ✨ 核心特性

- 🚀 **丰富全面的 AI 资源生态**：
  - **热门精选**：DeepSeek、Claude 3.7、Cursor、v0、Ollama、Hugging Face 等顶尖神级工具；
  - **大模型与智能对话**：DeepSeek R1、ChatGPT、Claude、Kimi、通义千问、Perplexity、GLM-4 等；
  - **AI 编程与 Agent 辅助**：Cursor、GitHub Copilot、v0.dev、Bolt.new、Windsurf、Trae、Replit Agent 等；
  - **AI 绘图与多媒体创作**：Midjourney、FLUX.1、快手可灵 AI、Suno、Stable Diffusion、Runway 等；
  - **开源大模型框架与模型库**：Hugging Face、Ollama、Dify.ai、LangChain、vLLM、ModelScope 等；
  - **云服务与开发基础设施**：Vercel、Cloudflare、Supabase、Neon Serverless Postgres、Railway、Upstash 等；
  - **开发者高频效率工具**：GitHub、Excalidraw、Postman / Hoppscotch、Raycast、Bundlephobia、Transform Tools 等。

- 🔍 **多引擎聚合与即时全库搜索**：
  - **站内实时筛选**：键入即刻匹配名称、描述、标签、链接；
  - **全局快捷键**：按 `/` 键秒级聚焦搜索框；
  - **外链引擎快速跳转**：无缝切换 DeepSeek 搜索、Google 搜索、GitHub 开源仓库搜索；
  - **分类标签与资费过滤**：支持“免费”、“开源”、“免费体验”、“AI IDE”、“国产顶尖”等一键过滤。

- ⭐ **个性化收藏与自定义收录 (LocalStorage)**：
  - **一键收藏**：点击卡片右上角星标即可加入“我的收藏”；
  - **自定义站点添加**：支持自行登记私有服务、内网 Wiki 或日常网站，浏览器本地持久化保存。

- 🛠️ **内置开发者实用小工具箱 (离线运行，保护隐私)**：
  - **Prompt 提示词模板库**：精选架构重构、RESTful API 规范设计、SQL 性能调优、Git Commit 规范等模板，支持在线修改与一键复制；
  - **JSON 格式化 & 校验**：支持 2 空格/4 空格美化、单行压缩、语法校验错误高亮；
  - **时间戳与编解码转换**：实时 Unix 时间戳互转、Base64 编解码、URL Encode/Decode。

- 🎨 **现代化 UI / UX**：
  - 完美支持 **深色模式 (Dark Mode)** 与 **浅色模式 (Light Mode)** 自由切换；
  - 自动加载高清 Favicon，并具备渐变首字母徽标容错保护；
  - 响应式侧边栏（移动端智能抽屉展开），回到顶部悬浮按钮。

---

## 🛠️ 技术栈

- **框架**：React 19 + TypeScript
- **构建工具**：Vite 6
- **样式**：Tailwind CSS v4
- **图标**：Lucide React
- **持久化**：浏览器 LocalStorage

---

## 🚀 快速启动

### 1. 进入项目目录
```bash
cd ai-nav
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动本地开发服务
```bash
npm run dev
```
启动后在浏览器打开 `http://127.0.0.1:5173/` 即可访问。

### 4. 生产构建打包
```bash
npm run build
```
构建产物将输出在 `dist/` 目录下，可直接部署在 **Vercel**、**Cloudflare Pages**、**GitHub Pages** 或任何静态 Web 服务器（Nginx / Caddy）上。

---

## 📁 目录结构

```text
ai-nav/
├── src/
│   ├── components/
│   │   ├── AddSiteModal.tsx     # 自定义站点添加模态框
│   │   ├── CategorySection.tsx  # 分类区块与卡片栅格
│   │   ├── DevToolsModal.tsx    # 内置轻量开发工具箱 (Prompt/JSON/时间戳)
│   │   ├── Header.tsx           # 顶部导航栏 (主题切换、工具入口)
│   │   ├── NavCard.tsx          # 网站卡片 (Favicon/徽章/收藏/外链)
│   │   ├── SearchBar.tsx        # 搜索与快速过滤栏
│   │   ├── Sidebar.tsx          # 响应式分类侧边栏
│   │   └── Toast.tsx            # 全局 Toast 提示通知
│   ├── data/
│   │   └── navData.ts           # 精选 AI 与开发者工具完整数据集
│   ├── types/
│   │   └── index.ts             # TypeScript 类型定义
│   ├── App.tsx                  # 主页面与全局状态协调
│   ├── index.css                # Tailwind CSS 样式
│   └── main.tsx                 # React 入口
├── index.html                   # HTML 模板与站点元数据
├── vite.config.ts               # Vite 构建配置
└── package.json                 # 项目依赖与脚本配置
```
