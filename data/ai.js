/* AI 与大模型 大类内容 */
window.KB = window.KB || {};

window.KB.ai = {
  id: "ai",
  title: "AI 与大模型",
  summary: "把 AI 能力接进你的产品：调模型、做 RAG、写提示词、跑智能体。",
  tags: ["ai", "大模型", "llm", "gpt", "rag", "提示词", "智能体"],
  what: "现在做产品几乎都会用到 AI。作为应用开发者（不是训练模型的研究员），你要做的是：调别人的模型 API、设计好提示词、把资料喂给模型（RAG）、让模型能调工具（Agent），以及把成本、延迟、准确性控制住。",
  children: [
    // ================= 模型与 API =================
    {
      id: "ai.model",
      title: "模型与调用",
      summary: "有哪些模型可以用、怎么调、怎么选。",
      tags: ["模型", "api", "gpt", "claude", "开源模型"],
      what: "你不用自己训练模型，直接用厂商提供的 API 就行。主流有 OpenAI（GPT）、Anthropic（Claude）、Google（Gemini），以及国内的通义、豆包、DeepSeek，还有可以自己部署的开源模型（Llama、Qwen）。",
      children: [
        {
          id: "ai.model.api",
          title: "模型 API 调用",
          summary: "发一段文字给模型，它返回一段文字。",
          tags: ["api", "调用", "sdk", "openai", "接口"],
          what: "调用模型 API 的核心就三件事：把消息发出去、拿到回复、处理流式输出（一个字一个字显示）。几乎所有厂商的接口格式都互相兼容（OpenAI 格式已成事实标准）。",
          useWhen: ["任何要把 AI 接进产品的场景"],
          examples: ["聊天机器人", "文本总结", "翻译", "内容生成", "代码助手"],
          code: `// 调用大模型 API（OpenAI 格式）
const res = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: { Authorization: \`Bearer \${KEY}\` },
  body: JSON.stringify({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: "用一句话解释什么是数据库" }],
  }),
});
const data = await res.json();
console.log(data.choices[0].message.content);`,
          codeLang: "javascript",
        },
        {
          id: "ai.model.choose",
          title: "怎么选模型",
          summary: "按任务难度、成本、速度、隐私来选。",
          tags: ["选型", "模型选择", "成本", "性价比"],
          what: "模型分档：大模型（聪明、贵、慢）和小模型（够用、便宜、快）。原则是「能用小模型解决的就别用大模型」，复杂推理才上大模型。还要考虑：是否需要中文强、是否需要自己部署（隐私/合规）。",
          useWhen: ["决定产品用哪个模型时"],
          examples: ["简单分类/抽取 → 小模型", "复杂推理/写作 → 大模型", "数据敏感 → 私有部署开源模型", "中文场景 → 国内模型或 Claude/GPT"],
          codeLang: "text",
        },
        {
          id: "ai.model.local",
          title: "本地 / 私有部署",
          summary: "把开源模型跑在自己的机器上。",
          tags: ["本地部署", "开源", "ollama", "llama", "隐私"],
          what: "用 Ollama、vLLM 等工具把开源模型（Llama、Qwen、DeepSeek）跑在自己服务器或电脑上。好处：数据不出内网、无按次费用；坏处：需要显卡、效果一般不如顶级闭源模型。",
          useWhen: ["数据敏感不能出内网", "调用量大、按次付费太贵", "需要离线运行"],
          avoidWhen: ["没有 GPU 或追求最强效果时用 API 更省事"],
          examples: ["Ollama 本地跑模型", "vLLM 部署推理服务", "企业内网私有模型"],
          code: `# 用 Ollama 在本地跑一个模型（一条命令）
ollama run qwen2.5
# 然后就能像聊天一样用，也可以调本地 API`,
          codeLang: "bash",
        },
      ],
    },

    // ================= 提示词 =================
    {
      id: "ai.prompt",
      title: "提示词工程（Prompt）",
      summary: "怎么「跟模型说话」才能拿到想要的结果。",
      tags: ["提示词", "prompt", "prompt engineering", "指令"],
      what: "提示词就是你给模型的指令。同样的模型，提示词写得好坏，结果差别巨大。核心技巧：说清角色和任务、给例子、要求分步骤、指定输出格式。",
      children: [
        {
          id: "ai.prompt.basic",
          title: "提示词基础写法",
          summary: "角色 + 任务 + 约束 + 输出格式。",
          tags: ["提示词", "prompt", "写法", "结构"],
          what: "一个好提示词通常包含四部分：① 角色（你是谁）② 任务（做什么）③ 约束（有什么要求/限制）④ 输出格式（要什么形式的结果）。",
          useWhen: ["任何调用模型的地方"],
          examples: ["让模型做客服", "让模型提取结构化数据", "让模型改写文案"],
          code: `你是一位资深前端工程师。（角色）
请把下面这段代码重构得更易读。（任务）
要求：不要改变功能，加上中文注释。（约束）
输出：只输出代码，不要解释。（格式）

代码：
<粘贴代码>`,
          codeLang: "text",
        },
        {
          id: "ai.prompt.fewshot",
          title: "少样本示例（Few-shot）",
          summary: "给几个例子，模型照着做。",
          tags: ["few-shot", "示例", "例子", "提示词"],
          what: "与其费劲描述规则，不如直接给 2-3 个「输入 → 输出」的例子，模型会照着模式做。对格式要求严格的场景特别有效。",
          useWhen: ["输出格式要严格一致", "规则难以用语言描述清楚"],
          examples: ["统一的数据抽取格式", "固定的文案风格", "分类任务"],
          code: `把用户评论分类为「好评/差评」。

评论：东西很好用，物流也快
分类：好评

评论：质量太差了，还发错货
分类：差评

评论：一般般吧，凑合用
分类：`,
          codeLang: "text",
        },
        {
          id: "ai.prompt.cot",
          title: "思维链（Chain of Thought）",
          summary: "让模型先想再答，复杂问题更准。",
          tags: ["思维链", "cot", "推理", "分步"],
          what: "让模型「先一步步分析，再给结论」，能显著提升复杂推理（数学、逻辑、多条件判断）的准确率。就是加一句「请一步步分析」。",
          useWhen: ["复杂推理、多步骤判断", "模型经常算错/判断错的时候"],
          avoidWhen: ["简单任务加了反而变慢变贵"],
          examples: ["数学计算", "多条件业务判断", "复杂决策"],
          code: `请一步步分析下面这个问题，最后再给结论：

问题：一个商品原价 200 元，先打八折，再叠加满 150 减 30 的券，最终多少钱？

分析过程：
1. …
2. …
最终答案：`,
          codeLang: "text",
        },
        {
          id: "ai.prompt.structured",
          title: "结构化输出（JSON）",
          summary: "让模型直接返回能用的 JSON。",
          tags: ["结构化", "json", "输出格式", "schema"],
          what: "程序要用模型的结果，就必须让它返回固定格式（通常是 JSON）。可以明确要求 JSON 结构，或用模型厂商的「结构化输出」功能强制约束。",
          useWhen: ["模型输出要给程序继续处理"],
          avoidWhen: ["别只靠「请返回 JSON」这句话，最好用厂商的 schema 强制约束，否则偶尔会多嘴"],
          examples: ["信息抽取（从文本提字段）", "分类打标", "生成表单数据"],
          code: `请从下面的招聘信息中提取信息，只输出 JSON，不要任何解释：

{
  "company": "公司名",
  "position": "职位名",
  "salary": "薪资范围",
  "city": "城市"
}

招聘信息：<粘贴>`,
          codeLang: "text",
        },
      ],
    },

    // ================= RAG =================
    {
      id: "ai.rag",
      title: "RAG（检索增强生成）",
      summary: "让模型回答「它没学过」的你的私有资料。",
      tags: ["rag", "检索", "向量", "知识库", "embedding"],
      what: "模型只知道训练时的公开知识，不知道你的公司文档、产品手册。RAG 的做法：先把你的资料切成小块存进「向量库」，用户提问时先检索出最相关的几块，再连同问题一起交给模型回答。这样模型就能基于你的资料回答，且不会乱编。",
      children: [
        {
          id: "ai.rag.flow",
          title: "RAG 的完整流程",
          summary: "切块 → 向量化 → 存库 → 检索 → 拼提示词 → 生成。",
          tags: ["rag", "流程", "切块", "检索", "向量化"],
          what: "① 文档切块（chunk）：把长文档切成几百字的小段；② 向量化（embedding）：每段用模型转成一串数字（向量）；③ 存入向量库；④ 用户提问同样转成向量；⑤ 找出最相似的几段；⑥ 把这几段 + 问题一起发给模型生成回答。",
          useWhen: ["要做「基于我的文档的问答」", "企业知识库、客服机器人、文档助手"],
          avoidWhen: ["资料很少（几页）直接塞进提示词就行，不用上 RAG"],
          examples: ["企业知识库问答", "产品文档助手", "客服机器人", "法务/医疗资料问答"],
          codeLang: "text",
        },
        {
          id: "ai.rag.embedding",
          title: "向量与 Embedding",
          summary: "把文字变成数字，才能算「像不像」。",
          tags: ["embedding", "向量", "相似度", "语义"],
          what: "Embedding 把一段文字变成一串数字（向量）。语义相近的文字，向量也相近，这样就能用数学算「哪段资料和问题最相关」。",
          useWhen: ["RAG 检索", "语义搜索", "推荐、去重、聚类"],
          examples: ["找最相关的文档片段", "语义搜索（不只是关键词匹配）", "相似商品推荐"],
          code: `// 把文字转向量，然后算相似度
const v1 = await embed("如何重置密码");
const v2 = await embed("忘记密码怎么办");
// 两句话意思相近 → 向量距离很小 → 检索时能匹配上`,
          codeLang: "javascript",
        },
        {
          id: "ai.rag.vectorstore",
          title: "向量数据库",
          summary: "专门存向量、快速找「最相似」的库。",
          tags: ["向量数据库", "vector db", "pinecone", "pgvector", "milvus"],
          what: "普通数据库不擅长「找最相似的向量」。向量数据库专门做这件事，能在几百万条里毫秒级找出最相近的几条。常见：pgvector（PostgreSQL 插件，最省事）、Pinecone、Qdrant、Milvus、Chroma（本地小项目）。",
          useWhen: ["RAG 需要检索资料时"],
          avoidWhen: ["数据量很小（几千条）用普通数据库算相似度也行"],
          examples: ["pgvector（已有 PG 就直接用）", "Chroma（本地原型）", "Pinecone（托管）", "Milvus（大规模）"],
          codeLang: "text",
        },
        {
          id: "ai.rag.pitfall",
          title: "RAG 常见坑",
          summary: "为什么你的 RAG 答不准。",
          tags: ["rag", "坑", "切块", "准确率", "召回"],
          what: "RAG 效果差通常不是模型问题，而是：切块切得不好（一段话被切断）、检索没找到真正相关的（召回率低）、找到的资料太长塞不进上下文、模型没用资料而是自己编。",
          useWhen: ["RAG 答不准时排查方向"],
          examples: ["按语义切块而不是按字数硬切", "加关键词检索混合（混合检索）", "让模型「只根据给定资料回答，没有就说不知道」"],
          codeLang: "text",
        },
      ],
    },

    // ================= Agent =================
    {
      id: "ai.agent",
      title: "智能体（Agent）",
      summary: "让模型不只说话，还能「动手做事」。",
      tags: ["agent", "智能体", "工具调用", "function calling", "mcp"],
      what: "普通模型只能输出文字。Agent 给模型配上「工具」（查数据库、调 API、读文件、发邮件），模型自己决定什么时候调哪个工具、拿到结果再继续，直到完成任务。",
      children: [
        {
          id: "ai.agent.tools",
          title: "工具调用（Function Calling）",
          summary: "给模型一份「能用哪些函数」的清单。",
          tags: ["工具调用", "function calling", "tools", "函数"],
          what: "你把可用的函数（名字、参数、用途）告诉模型，模型判断需要时就返回「我要调这个函数，参数是这些」，你的代码执行后把结果给它，它再继续。",
          useWhen: ["模型需要查询实时数据、执行操作"],
          examples: ["查天气 API", "查订单数据库", "发邮件", "创建日历事件"],
          code: `// 告诉模型有哪些工具可用（OpenAI 格式）
tools: [{
  type: "function",
  function: {
    name: "get_weather",
    description: "查询某个城市的天气",
    parameters: {
      type: "object",
      properties: { city: { type: "string" } },
    },
  },
}]`,
          codeLang: "javascript",
        },
        {
          id: "ai.agent.loop",
          title: "Agent 循环（ReAct）",
          summary: "思考 → 调工具 → 看结果 → 再思考，直到完成。",
          tags: ["agent", "循环", "react", "多步"],
          what: "Agent 的核心是个循环：模型思考「下一步该做什么」→ 调用工具 → 拿到结果 → 再思考……直到它认为任务完成。复杂任务（比如「帮我调研这家公司并写报告」）就是靠这个循环完成的。",
          useWhen: ["多步骤、需要动态决策的任务"],
          avoidWhen: ["步骤固定的一次性任务不需要 Agent（直接调函数更可控）"],
          examples: ["自动调研写报告", "自动修复代码", "多步数据查询"],
          codeLang: "text",
        },
        {
          id: "ai.agent.mcp",
          title: "MCP（模型上下文协议）",
          summary: "让 AI 用统一方式接入各种工具和数据源。",
          tags: ["mcp", "协议", "工具", "标准化", "anthropic"],
          what: "MCP 是 Anthropic 提出的开放协议，让 AI 应用用统一的方式连接外部工具和数据（数据库、GitHub、文件系统、各种 SaaS）。写一次 MCP server，所有支持 MCP 的 AI 客户端都能用。",
          useWhen: ["想让 AI 接入多种外部系统", "做 AI 工具/插件生态"],
          examples: ["让 AI 读你的数据库", "让 AI 操作 GitHub", "让 AI 访问公司内部系统"],
          codeLang: "text",
        },
      ],
    },

    // ================= 工程与成本 =================
    {
      id: "ai.eng",
      title: "AI 工程实践",
      summary: "把 AI 做稳、做便宜、能评估。",
      tags: ["成本", "token", "流式", "评估", "幻觉"],
      what: "能把 demo 跑通不难，难的是让它稳定、便宜、可信。这块是 AI 应用真正的工程量：控制 token 成本、做流式输出让体验好、处理幻觉、建立评估和回归测试。",
      children: [
        {
          id: "ai.eng.cost",
          title: "成本与 Token",
          summary: "AI 按 token 计费，省 token 就是省钱。",
          tags: ["成本", "token", "计费", "省钱"],
          what: "模型按「token」（大致等于字/词片段）计费，输入输出都算钱。省钱办法：提示词别太长、用便宜的小模型、缓存重复内容（提示词缓存）、限制最大输出长度。",
          useWhen: ["AI 功能上线后账单飙升时", "设计 AI 功能初期就要考虑"],
          examples: ["用 gpt-4o-mini 代替 gpt-4o", "开启提示词缓存", "压缩上下文（只传相关片段）"],
          codeLang: "text",
        },
        {
          id: "ai.eng.stream",
          title: "流式输出（Streaming）",
          summary: "文字一个字一个字蹦出来，用户不用干等。",
          tags: ["流式", "streaming", "sse", "体验"],
          what: "模型生成完整回答可能要十几秒。流式输出让文字像打字一样实时出现，用户体感快很多。技术上常用 SSE（Server-Sent Events）。",
          useWhen: ["所有面向用户的 AI 对话功能"],
          avoidWhen: ["后台批处理任务不需要"],
          examples: ["聊天界面逐字显示", "AI 写作助手"],
          codeLang: "text",
        },
        {
          id: "ai.eng.hallucination",
          title: "幻觉与准确性",
          summary: "模型会一本正经地胡说八道，怎么办。",
          tags: ["幻觉", "hallucination", "准确性", "可信"],
          what: "模型不知道答案时也可能编一个看似合理的答案（幻觉）。缓解手段：用 RAG 提供事实依据、要求「不知道就说不知道」、要求给出引用来源、关键场景加人工审核。",
          useWhen: ["任何对准确性有要求的 AI 功能"],
          examples: ["要求模型标注信息来源", "用 RAG 限定回答范围", "关键结论加人工复核"],
          codeLang: "text",
        },
        {
          id: "ai.eng.eval",
          title: "评估与回归测试",
          summary: "改了提示词，怎么知道变好还是变坏。",
          tags: ["评估", "eval", "回归测试", "质量"],
          what: "AI 输出不确定，改一句提示词可能修好 A 又弄坏 B。做法：准备一批「问题 + 期望答案」的测试集，每次改动都跑一遍对比，避免悄悄变差。这就是 AI 版的单元测试。",
          useWhen: ["提示词/模型/流程有改动时", "上线前验证质量"],
          examples: ["50 条典型问题做回归集", "用 LLM 当裁判打分", "人工抽检"],
          codeLang: "text",
        },
      ],
    },
  ],
};
