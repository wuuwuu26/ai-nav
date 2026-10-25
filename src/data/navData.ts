import type { Category, NavItem, SearchEngine } from '../types';

export const SEARCH_ENGINES: SearchEngine[] = [
  {
    id: 'internal',
    name: '本站站内',
    url: '',
    placeholder: '搜索站内收录的 100+ AI与开发工具... (快捷键 /)',
    icon: 'Sparkles',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    url: 'https://chat.deepseek.com/?q=',
    placeholder: '使用 DeepSeek 智能搜索...',
    icon: 'Bot',
  },
  {
    id: 'google',
    name: 'Google',
    url: 'https://www.google.com/search?q=',
    placeholder: '在 Google 中搜索...',
    icon: 'Search',
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/search?q=',
    placeholder: '在 GitHub 开源仓库中搜索...',
    icon: 'Code2',
  },
];

export const CATEGORIES: Category[] = [
  {
    id: 'featured',
    name: '热门精选',
    description: '当前最火爆、最受开发者欢迎的 AI 工具与平台',
    icon: 'Flame',
  },
  {
    id: 'llm-chat',
    name: '大模型与对话',
    description: '国内外顶尖主流大语言模型、智能搜索与对话助手',
    icon: 'Bot',
  },
  {
    id: 'ai-coding',
    name: 'AI 编程助手',
    description: '代码生成、自动补全、全栈智能 IDE 与智能体',
    icon: 'Terminal',
  },
  {
    id: 'ai-media',
    name: 'AI 绘图与音视频',
    description: '图像生成、视频制作、AI 音乐与多媒体创作神器',
    icon: 'Palette',
  },
  {
    id: 'ai-frameworks',
    name: '开源框架与社区',
    description: 'AI 框架、本地模型运行、模型托管与开发者社区',
    icon: 'Boxes',
  },
  {
    id: 'dev-infra',
    name: '云服务与开发基础设施',
    description: 'Serverless、数据库、一键部署、云平台与运维',
    icon: 'Server',
  },
  {
    id: 'dev-tools',
    name: '开发者效率神器',
    description: '架构画图、API 调试、技术搜索与常用开发辅助',
    icon: 'Wrench',
  },
];

export const NAV_ITEMS: NavItem[] = [
  // 热门精选
  {
    id: 'deepseek-f',
    name: 'DeepSeek 深度求索',
    description: '全球瞩目的顶尖开源推理大模型，R1 推理性能比肩 o1，完全免费且支持极速联网搜索',
    url: 'https://chat.deepseek.com',
    category: 'featured',
    tags: ['开源', '国产顶尖', '免费', '推理模型'],
    pricing: 'open-source',
    isHot: true,
    featured: true,
  },
  {
    id: 'cursor-f',
    name: 'Cursor',
    description: '专为 AI 时代设计的智能代码编辑器，基于 VS Code，全库代码理解与全自动多文件修改',
    url: 'https://www.cursor.com',
    category: 'featured',
    tags: ['AI IDE', '神级工具', '代码生成'],
    pricing: 'freemium',
    isHot: true,
    featured: true,
  },
  {
    id: 'claude-f',
    name: 'Claude 3.7 Sonnet',
    description: 'Anthropic 出品，业内公认编码与长上下文最强的模型之一，支持深度思考混合模式',
    url: 'https://claude.ai',
    category: 'featured',
    tags: ['大模型', '编程最强', '长上下文'],
    pricing: 'freemium',
    isHot: true,
    featured: true,
  },
  {
    id: 'v0-f',
    name: 'v0 by Vercel',
    description: '输入自然语言即刻生成现代漂亮的 React + Tailwind CSS 响应式 UI 组件与页面',
    url: 'https://v0.dev',
    category: 'featured',
    tags: ['前端神器', 'UI生成', 'React'],
    pricing: 'freemium',
    isHot: true,
    featured: true,
  },
  {
    id: 'ollama-f',
    name: 'Ollama',
    description: '本地运行 Llama 3、DeepSeek、Mistral 等开源大模型的最简方案，一行命令即刻部署',
    url: 'https://ollama.com',
    category: 'featured',
    tags: ['本地大模型', '开源', '轻量跨平台'],
    pricing: 'open-source',
    isHot: true,
    featured: true,
  },
  {
    id: 'huggingface-f',
    name: 'Hugging Face',
    description: '全球最大的开源 AI 模型、数据集与演示应用社区，被誉为 AI 界的 GitHub',
    url: 'https://huggingface.co',
    category: 'featured',
    tags: ['AI社区', '模型库', '开源'],
    pricing: 'free',
    isHot: true,
    featured: true,
  },

  // 大模型与对话
  {
    id: 'deepseek-llm',
    name: 'DeepSeek 深度求索',
    description: '具备极强数学、代码与长逻辑推理能力的国产开源大模型，提供高质量免费网页版及超高性价比 API',
    url: 'https://chat.deepseek.com',
    category: 'llm-chat',
    tags: ['开源', '国产顶流', '高性价比API', '推理强'],
    pricing: 'open-source',
    isHot: true,
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT (OpenAI)',
    description: 'OpenAI 旗舰产品，搭载 GPT-4o、o1/o3-mini 推理模型，支持高级语音模式与视觉分析',
    url: 'https://chatgpt.com',
    category: 'llm-chat',
    tags: ['大模型领航者', '多模态', 'GPT-4o'],
    pricing: 'freemium',
    isHot: true,
  },
  {
    id: 'claude-chat',
    name: 'Claude (Anthropic)',
    description: '逻辑清晰严谨、文风优雅自然的顶尖模型，对复杂代码重构与大型文档分析有绝佳表现',
    url: 'https://claude.ai',
    category: 'llm-chat',
    tags: ['长文本', '编程高手', 'Artifacts'],
    pricing: 'freemium',
    isHot: true,
  },
  {
    id: 'kimi',
    name: 'Kimi 智能助手 (月之暗面)',
    description: '擅长超长文本阅读与深度联网搜索的国产 AI 助手，支持百万字研报阅读与 k0-math 推理',
    url: 'https://kimi.moonshot.cn',
    category: 'llm-chat',
    tags: ['国产优秀', '长文本研报', '免费联网'],
    pricing: 'free',
    isHot: true,
  },
  {
    id: 'qwen',
    name: '通义千问 (Qwen)',
    description: '阿里云出品的开源与商用兼具大模型家族，Qwen 2.5 系列在全球开源大模型榜单名列前茅',
    url: 'https://tongyi.aliyun.com/qianwen',
    category: 'llm-chat',
    tags: ['开源模型', '阿里出品', '多语言强'],
    pricing: 'free',
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    description: '下一代对话式 AI 搜索引擎，实时抓取全网最新数据并附带可信信源引用标注',
    url: 'https://www.perplexity.ai',
    category: 'llm-chat',
    tags: ['AI搜索', '信源引用', '高效调研'],
    pricing: 'freemium',
    isHot: true,
  },
  {
    id: 'zhipu-glm',
    name: '智谱清言 (GLM-4)',
    description: '清华系智谱 AI 推出的大模型，支持智能体生态、超长文本处理与多模态对话',
    url: 'https://chatglm.cn',
    category: 'llm-chat',
    tags: ['国产大模型', '智能体', '清华背景'],
    pricing: 'free',
  },
  {
    id: 'grok',
    name: 'Grok (xAI)',
    description: '马斯克旗下 xAI 推出的具有幽默感与实时 X (Twitter) 动态洞察能力的强劲大模型',
    url: 'https://x.ai',
    category: 'llm-chat',
    tags: ['实时推文', '马斯克', '多模态'],
    pricing: 'paid',
  },

  // AI 编程与代码助手
  {
    id: 'cursor-code',
    name: 'Cursor',
    description: '目前最强大流畅的 AI 增强代码编辑器，Composer 功能支持跨多文件一键生成与修改',
    url: 'https://www.cursor.com',
    category: 'ai-coding',
    tags: ['全栈利器', 'VS Code生态', '重构神器'],
    pricing: 'freemium',
    isHot: true,
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    description: 'GitHub 官方代码智能补全工具，深度融入 VS Code / JetBrains / Visual Studio',
    url: 'https://github.com/features/copilot',
    category: 'ai-coding',
    tags: ['GitHub官方', '生态最广', '实时补全'],
    pricing: 'paid',
  },
  {
    id: 'v0-code',
    name: 'v0.dev',
    description: 'Vercel 出品的自然语言生成前端界面神器，一键导出 React、Tailwind 与 shadcn/ui 组件',
    url: 'https://v0.dev',
    category: 'ai-coding',
    tags: ['前端神器', 'Tailwind', 'shadcn/ui'],
    pricing: 'freemium',
    isHot: true,
  },
  {
    id: 'bolt-new',
    name: 'Bolt.new',
    description: '在浏览器沙箱内通过自然语言直接提示词全栈生成、实时运行与一键部署 Web 应用',
    url: 'https://bolt.new',
    category: 'ai-coding',
    tags: ['全栈开发', '浏览器运行', '秒级原型'],
    pricing: 'freemium',
    isHot: true,
  },
  {
    id: 'windsurf',
    name: 'Windsurf (Codeium)',
    description: 'Codeium 打造的下一代协同智能 Agent IDE，创新 Cascade 流程理解开发意图',
    url: 'https://codeium.com/windsurf',
    category: 'ai-coding',
    tags: ['AI IDE', 'Cascade', '免费额度足'],
    pricing: 'freemium',
  },
  {
    id: 'trae',
    name: 'Trae',
    description: '字节跳动推出的自适应 AI 编程 IDE，集成国内外顶尖模型，原生支持 Claude 3.5 与 GPT-4o 免费调用',
    url: 'https://www.trae.ai',
    category: 'ai-coding',
    tags: ['字节跳动', '免费可用', '双模型自由切'],
    pricing: 'free',
    isHot: true,
  },
  {
    id: 'replit-agent',
    name: 'Replit Agent',
    description: '基于云端全栈运行环境的自主编程智能体，从自然语言描述自动生成完整数据库与后端架构',
    url: 'https://replit.com',
    category: 'ai-coding',
    tags: ['云端IDE', '自主Agent', '多语言全栈'],
    pricing: 'freemium',
  },
  {
    id: 'devv-ai',
    name: 'Devv.ai',
    description: '专为程序员打造的高效精准技术搜索引擎，聚焦 GitHub 开源库、官方文档与 StackOverflow 精华',
    url: 'https://devv.ai',
    category: 'ai-coding',
    tags: ['技术搜索', '文档检索', '程序员必备'],
    pricing: 'free',
  },

  // AI 绘图与多媒体
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: '全球图像美学与艺术质感天花板的 AI 绘画系统，生成光影与真实细节极为出众',
    url: 'https://www.midjourney.com',
    category: 'ai-media',
    tags: ['图像天花板', '艺术创作', '高质量光影'],
    pricing: 'paid',
    isHot: true,
  },
  {
    id: 'flux',
    name: 'FLUX.1 (Black Forest Labs)',
    description: '开源 AI 生图新霸主，支持复杂文本提示词与精准文字排版渲染，质量超越大部分闭源产品',
    url: 'https://blackforestlabs.ai',
    category: 'ai-media',
    tags: ['开源生图', '高质量文字生成', '本地可用'],
    pricing: 'open-source',
    isHot: true,
  },
  {
    id: 'kling-ai',
    name: '快手可灵 AI (Kling)',
    description: '国产顶尖高质量 AI 视频生成大模型，支持大幅度物理运动模拟与长达几分钟的镜头推拉',
    url: 'https://klingai.kuaishou.com',
    category: 'ai-media',
    tags: ['AI视频生成', '国产领先', '物理模拟'],
    pricing: 'freemium',
    isHot: true,
  },
  {
    id: 'runway-gen',
    name: 'Runway Gen-3 Alpha',
    description: '好莱坞级别的专业 AI 视频生成与动态捕捉平台，支持导演视角与运镜控制',
    url: 'https://runwayml.com',
    category: 'ai-media',
    tags: ['专业影视', '运镜控制', '高质量视频'],
    pricing: 'freemium',
  },
  {
    id: 'suno',
    name: 'Suno AI',
    description: '输入一句描述即可生成专业级别词曲、编曲与人声唱腔的颠覆性 AI 音乐平台',
    url: 'https://suno.com',
    category: 'ai-media',
    tags: ['AI编曲', '人声合成', '音乐爆款'],
    pricing: 'freemium',
    isHot: true,
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion WebUI / ComfyUI',
    description: '全球最流行的开源绘图生态，海量 LoRA、ControlNet 节点可实现精准商业级控图',
    url: 'https://github.com/comfyanonymous/ComfyUI',
    category: 'ai-media',
    tags: ['开源生态', 'ComfyUI', '工作流自动化'],
    pricing: 'open-source',
  },

  // 开源框架与模型库
  {
    id: 'huggingface',
    name: 'Hugging Face',
    description: 'AI 领域的开源基础设施，托管数百万模型权重、数据集、模型卡片与 Spaces 在线体验',
    url: 'https://huggingface.co',
    category: 'ai-frameworks',
    tags: ['模型中心', 'Transformers', '数据集'],
    pricing: 'free',
    isHot: true,
  },
  {
    id: 'ollama',
    name: 'Ollama',
    description: '极简且高性能的本地大模型运行工具，支持一键拉取运行各种最新开源量化权重',
    url: 'https://ollama.com',
    category: 'ai-frameworks',
    tags: ['本地运行', '极简CLI', '跨平台'],
    pricing: 'open-source',
    isHot: true,
  },
  {
    id: 'dify',
    name: 'Dify.ai',
    description: '开源 LLM 应用开发平台，可视化编排 Agent、RAG 知识库与工作流，可一键发布为 API 或 Web 应用',
    url: 'https://dify.ai',
    category: 'ai-frameworks',
    tags: ['Agent开发', '工作流编排', 'RAG知识库'],
    pricing: 'open-source',
    isHot: true,
  },
  {
    id: 'langchain',
    name: 'LangChain & LangGraph',
    description: '构建由大语言模型驱动的上下文感知应用与循环复杂 Agent 工作流的黄金标准框架',
    url: 'https://www.langchain.com',
    category: 'ai-frameworks',
    tags: ['Agent框架', 'Python/JS', '企业级开发'],
    pricing: 'open-source',
  },
  {
    id: 'vllm',
    name: 'vLLM',
    description: '伯克利团队开发的极速开源 LLM 推理服务引擎，基于 PagedAttention 技术吞吐量远超传统框架',
    url: 'https://github.com/vllm-project/vllm',
    category: 'ai-frameworks',
    tags: ['模型推理加速', '高吞吐服务', '高并发部署'],
    pricing: 'open-source',
  },
  {
    id: 'modelscope',
    name: '魔搭社区 (ModelScope)',
    description: '阿里推出的国内开源 AI 模型社区，提供免费的 GPU 算力试用与丰富的国产开源模型镜像',
    url: 'https://www.modelscope.cn',
    category: 'ai-frameworks',
    tags: ['国产模型库', '免费算力', '中文生态'],
    pricing: 'free',
  },

  // 云服务与基础设施
  {
    id: 'vercel',
    name: 'Vercel',
    description: '现代前端与全栈应用部署首选平台，无缝集成 Next.js、自动分支预览与全球边缘网络',
    url: 'https://vercel.com',
    category: 'dev-infra',
    tags: ['前端托管', 'Serverless', 'Next.js'],
    pricing: 'freemium',
    isHot: true,
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    description: '全球 CDN、DNS、网络安全与 Workers 边缘计算平台，提供免费版极具诚意的开发服务',
    url: 'https://www.cloudflare.com',
    category: 'dev-infra',
    tags: ['CDN加速', 'Workers边缘计算', '免费防护'],
    pricing: 'freemium',
    isHot: true,
  },
  {
    id: 'supabase',
    name: 'Supabase',
    description: '开源 Firebase 替代方案，提供一整套 Postgres 数据库、身份认证、即时 API 和向量存储',
    url: 'https://supabase.com',
    category: 'dev-infra',
    tags: ['BaaS后台', 'Postgres', 'pgvector向量'],
    pricing: 'freemium',
    isHot: true,
  },
  {
    id: 'neon-tech',
    name: 'Neon Serverless Postgres',
    description: 'Serverless 分布式 Postgres 数据库，支持类似 Git 的分支回滚与秒级冷启动',
    url: 'https://neon.tech',
    category: 'dev-infra',
    tags: ['Serverless DB', '数据库分支', '高可用'],
    pricing: 'freemium',
  },
  {
    id: 'railway',
    name: 'Railway',
    description: '极简云端应用发布平台，支持快速配置 Docker、Postgres、Redis 等复杂全栈微服务',
    url: 'https://railway.app',
    category: 'dev-infra',
    tags: ['一键容器部署', '多微服务', '开箱即用'],
    pricing: 'freemium',
  },
  {
    id: 'upstash',
    name: 'Upstash',
    description: '为 Serverless 与边缘计算设计的无服务器 Redis、Kafka 与向量数据库服务',
    url: 'https://upstash.com',
    category: 'dev-infra',
    tags: ['Serverless Redis', '向量检索', '按量计费'],
    pricing: 'freemium',
  },

  // 开发者效率神器
  {
    id: 'github',
    name: 'GitHub',
    description: '全球开发者最大的代码托管平台，包含 Actions 自动化、Codespaces 云端开发等强大生态',
    url: 'https://github.com',
    category: 'dev-tools',
    tags: ['开源大本营', '代码托管', 'CI/CD'],
    pricing: 'freemium',
    isHot: true,
  },
  {
    id: 'excalidraw',
    name: 'Excalidraw',
    description: '手绘风格的轻量级虚拟白板，非常适合快速勾勒系统架构图、流程逻辑与讨论草稿',
    url: 'https://excalidraw.com',
    category: 'dev-tools',
    tags: ['手绘架构图', '免费无广告', '协同白板'],
    pricing: 'open-source',
    isHot: true,
  },
  {
    id: 'postman',
    name: 'Postman & Hoppscotch',
    description: 'API 设计、调试、测试与自动化协作的标准工具，接口开发调试必备',
    url: 'https://hoppscotch.io',
    category: 'dev-tools',
    tags: ['API调试', '轻量开源', '跨平台'],
    pricing: 'open-source',
  },
  {
    id: 'raycast',
    name: 'Raycast',
    description: '极速可扩展的快捷启动器，支持海量开发者插件生态、剪贴板历史与 AI 窗口助理',
    url: 'https://www.raycast.com',
    category: 'dev-tools',
    tags: ['效率利器', '启动器', '开发者快捷键'],
    pricing: 'freemium',
  },
  {
    id: 'bundlephobia',
    name: 'Bundlephobia',
    description: '查询 npm 包打包体积、依赖树大小以及对构建速度影响的分析工具',
    url: 'https://bundlephobia.com',
    category: 'dev-tools',
    tags: ['前端性能', 'npm体积检测', '依赖优化'],
    pricing: 'free',
  },
  {
    id: 'transform-tools',
    name: 'Transform Tools',
    description: '多种语言代码格式转换器：JSON 转 TS / Go Struct、SVG 转 JSX、CSS 转 JS 等应有尽有',
    url: 'https://transform.tools',
    category: 'dev-tools',
    tags: ['代码转换', 'TS类型生成', '极速实用'],
    pricing: 'free',
  },
];

export const PROMPT_TEMPLATES = [
  {
    title: '代码重构与性能优化',
    category: '编程开发',
    prompt: `你是一位资深全栈架构师。请审视以下代码：
1. 找出潜在的内存泄漏、并发隐患或性能瓶颈；
2. 保持对外 API 行为完全一致的前提下，重构为可读性高、遵循 SOLID 原则的简洁代码；
3. 为关键逻辑添加清晰注释并给出 TypeScript 严格类型注解；
4. 附上修改理由说明。

代码如下：
\`\`\`typescript
// 请在此粘贴你的代码
\`\`\``
  },
  {
    title: '生产级 API 接口设计',
    category: '后端架构',
    prompt: `请作为一名资深后端架构师，为 [某业务模块] 设计一套 RESTful API 规范：
1. 包含标准的 CRUD 路径、请求方法、状态码定义；
2. 遵循统一的 JSON 响应格式（code, data, message, timestamp）；
3. 包含合理的分页查询、排序与筛选过滤参数；
4. 给出入参校验规则及常见错误码（如 400 参数异常、401 未授权、404 资源不存在等）示例。`
  },
  {
    title: 'SQL 查询与索引调优',
    category: '数据库',
    prompt: `请扮演数据库性能调优专家，分析以下慢查询 SQL：
1. 分析当前查询可能的执行计划与全表扫描风险；
2. 给出最佳索引创建方案（复合索引最左匹配原则）；
3. 提供改写后的优化 SQL（避免冗余子查询/回表）；
4. 提供防止随数据量增长导致性能雪崩的长期建议。

表结构与查询语句：
\`\`\`sql
-- 请在此输入 DDL 与 SQL
\`\`\``
  },
  {
    title: 'Git 规范 Commit Message 生成器',
    category: '日常效率',
    prompt: `请根据以下代码改动说明，遵循 Conventional Commits 规范生成符合标准的 Git Commit Message：
包含：
- 类型 (feat / fix / docs / refactor / perf / test / chore)
- 影响范围 (scope)
- 简短描述（不超过 50 字符）
- 详细修改动机及 Breaking Changes（若有）

改动内容：
[请在此简要说明你做了哪些改动]`
  },
];
