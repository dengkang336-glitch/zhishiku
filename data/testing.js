/* 测试 大类内容 */
window.KB = window.KB || {};

window.KB.testing = {
  id: "testing",
  title: "测试与质量",
  summary: "怎么确认改完的代码没搞坏别的——以及 vibe coding 时最该测什么。",
  tags: ["测试", "testing", "质量", "bug", "自动化"],
  what: "测试就是「让机器帮你检查代码还能不能正常跑」。对 vibe coding 来说，测试的重要性比传统开发更高：AI 改代码很快，但可能悄悄改坏别处；有测试，跑一遍就知道有没有坏。不需要追求 100% 覆盖率，抓住「核心逻辑 + 钱相关的」就够。",
  children: [
    // ================= 测试类型 =================
    {
      id: "testing.type",
      title: "测试类型",
      summary: "单元、集成、端到端——测什么、测多细。",
      tags: ["单元测试", "集成测试", "e2e", "测试类型"],
      what: "测试按「范围」分三层：单元测试测一个函数、集成测试测几个模块一起、端到端测试模拟真实用户点页面。越往下越真实但越慢越脆。常见金字塔：单元多、集成中、端到端少。",
      children: [
        {
          id: "testing.type.unit",
          title: "单元测试（Unit Test）",
          summary: "测单个函数的输入输出。",
          tags: ["单元测试", "unit", "函数", "断言"],
          what: "给函数一个输入，断言输出等于预期。跑得飞快、好定位。核心业务逻辑（算价格、算积分、格式化、校验）最值得写。",
          useWhen: ["纯逻辑函数（不含网络、数据库）"],
          avoidWhen: ["别为了覆盖率去测 getter/setter 这类没有逻辑的代码"],
          examples: ["价格计算", "表单校验", "日期格式化", "权限判断"],
          code: `// Vitest / Jest 风格
test("满 100 打九折", () => {
  expect(算价格(100)).toBe(90);
  expect(算价格(50)).toBe(50);
});`,
          codeLang: "javascript",
        },
        {
          id: "testing.type.integration",
          title: "集成测试（Integration Test）",
          summary: "测几个模块连起来对不对。",
          tags: ["集成测试", "integration", "接口测试", "api"],
          what: "测「接口 + 数据库」这类组合：发一个真实请求，看数据有没有正确写进去、返回对不对。能抓到单元测试抓不到的连线问题。",
          useWhen: ["接口逻辑、数据库读写、第三方对接"],
          examples: ["注册接口能不能建出用户", "下单后库存有没有减"],
          code: `// 调真实接口，检查结果
const res = await request(app).post("/api/注册").send({ 名: "小明" });
expect(res.status).toBe(200);
expect(await db.用户.查({ 名: "小明" })).toBeTruthy();`,
          codeLang: "javascript",
        },
        {
          id: "testing.type.e2e",
          title: "端到端测试（E2E）",
          summary: "像真人一样点页面。",
          tags: ["e2e", "端到端", "playwright", "cypress", "浏览器"],
          what: "用工具（Playwright / Cypress）真的打开浏览器，输入、点击、断言页面上出现什么。最接近真实用户，但慢且容易因界面微调而失败，所以只覆盖最关键的几条主流程。",
          useWhen: ["最核心的几条用户流程（注册→登录→下单→支付）"],
          avoidWhen: ["别把所有细节都用 e2e 测，维护成本会失控"],
          examples: ["登录流程", "下单支付流程", "关键页面能否打开"],
          code: `// Playwright：真实点页面
await page.goto("/登录");
await page.fill("#账号", "小明");
await page.click("button:has-text('登录')");
await expect(page.locator(".欢迎")).toHaveText("欢迎，小明");`,
          codeLang: "javascript",
        },
        {
          id: "testing.type.manual",
          title: "手工测试 / 验收清单",
          summary: "上线前人手过一遍。",
          tags: ["手工测试", "验收", "清单", "qa"],
          what: "自动化测试代替不了「人点一遍」。维护一份上线验收清单（核心页面能开、表单能提交、支付能走通、手机上看不乱），每次发布前照着走。",
          useWhen: ["每次正式发布前"],
          examples: ["新功能验收", "版本发布前回归", "换设备/换浏览器验证"],
          codeLang: "text",
        },
      ],
    },

    // ================= 测试工具 =================
    {
      id: "testing.tool",
      title: "测试工具",
      summary: "跑测试用什么。",
      tags: ["测试工具", "vitest", "jest", "pytest", "playwright"],
      what: "工具选择不用纠结：JS 项目用 Vitest（快、配置少）或 Jest；Python 用 pytest；浏览器端到端用 Playwright；App 用各平台自带的（XCTest / Espresso）。关键是「有一套能一键跑的」，不是「用最好的」。",
      children: [
        {
          id: "testing.tool.vitest",
          title: "Vitest / Jest",
          summary: "JS/TS 的测试运行器。",
          tags: ["vitest", "jest", "测试运行器", "断言"],
          what: "写 test() / expect() 就能跑。Vitest 是新项目首选（和 Vite 打通、启动快）；老项目常见 Jest。两者 API 基本一样。",
          useWhen: ["前端或 Node 项目的单元/集成测试"],
          examples: ["组件逻辑测试", "工具函数测试", "接口测试"],
          code: `npm i -D vitest
npx vitest        # 跑一次
npx vitest --watch # 改代码自动重跑`,
          codeLang: "bash",
        },
        {
          id: "testing.tool.playwright",
          title: "Playwright",
          summary: "浏览器端到端测试。",
          tags: ["playwright", "浏览器", "e2e", "截图"],
          what: "自动开真实浏览器跑流程，还能顺手截图。除了测试，也常被用来做「自动截图/爬自己网站检查」。",
          useWhen: ["端到端测试、自动化截图、界面回归"],
          examples: ["登录流程测试", "自动截图", "多浏览器验证"],
          code: `npm i -D playwright
npx playwright test`,
          codeLang: "bash",
        },
        {
          id: "testing.tool.pytest",
          title: "pytest",
          summary: "Python 的测试工具。",
          tags: ["pytest", "python", "测试"],
          what: "Python 生态的标准测试工具，写起来极简：函数名以 test_ 开头、里面用 assert 就行。",
          useWhen: ["Python 项目"],
          examples: ["数据处理逻辑测试", "FastAPI 接口测试"],
          code: `def test_打折():
    assert 算价格(100) == 90`,
          codeLang: "python",
        },
      ],
    },

    // ================= 测试实践 =================
    {
      id: "testing.practice",
      title: "测试实践",
      summary: "该测什么、怎么让它别变成负担。",
      tags: ["测试实践", "覆盖率", "tdd", "回归"],
      what: "测试最大的坑不是「不会写」，而是「写了一堆然后全废掉」。原则：只测核心逻辑、测试要快、失败信息要能一眼看出哪里坏了、别为了覆盖率凑数。",
      children: [
        {
          id: "testing.practice.what",
          title: "什么最值得测",
          summary: "优先级：钱 > 数据 > 主流程 > 其他。",
          tags: ["优先级", "测什么", "核心逻辑"],
          what: "排序：① 跟钱有关的（价格、优惠、退款）② 数据写入/删除（错了会丢数据）③ 主流程能不能走通（登录、下单）④ 复杂计算/校验。其余用不着。",
          useWhen: ["决定先写哪些测试时"],
          examples: ["优惠券叠加计算", "下单库存扣减", "登录鉴权"],
          codeLang: "text",
        },
        {
          id: "testing.practice.coverage",
          title: "覆盖率怎么看",
          summary: "是参考指标，不是目标。",
          tags: ["覆盖率", "coverage", "指标"],
          what: "覆盖率 = 测试跑到的代码行占比。60-80% 的核心逻辑覆盖已经很够；追到 100% 往往是在测没意义的代码。看「关键文件覆盖了吗」比看总数有用。",
          useWhen: ["评估测试是否足够时"],
          avoidWhen: ["别把覆盖率当 KPI，会写出大量假测试"],
          examples: ["核心模块 80%+", "UI 组件不强求"],
          codeLang: "text",
        },
        {
          id: "testing.practice.regression",
          title: "回归测试与 CI",
          summary: "每次提交自动跑一遍。",
          tags: ["回归", "ci", "github actions", "自动"],
          what: "把测试接到 CI 上（GitHub Actions），每次 push/PR 自动跑。坏了立刻知道，而不是等用户投诉。这是测试真正发挥价值的地方。",
          useWhen: ["项目有多人协作或频繁发布"],
          examples: ["PR 自动跑测试", "合并前必须通过"],
          code: `# .github/workflows/test.yml
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22 }
      - run: npm ci
      - run: npm test`,
          codeLang: "yaml",
        },
        {
          id: "testing.practice.vibe",
          title: "vibe coding 时怎么用测试",
          summary: "让 AI 先写测试，再改代码。",
          tags: ["vibe coding", "ai", "测试", "prompt"],
          what: "最有效的用法：让 AI 先把核心逻辑写成测试（把「应该是什么结果」固定下来），再让它改代码。如果它改坏了，测试立刻红。反过来，让 AI 改完自己写测试常常是「测试代码本身去迁就错误实现」。",
          useWhen: ["用 AI 重构或改核心逻辑前"],
          examples: ["先写测试再让 AI 重写", "每次改完跑一遍", "把测试失败信息贴回给 AI"],
          code: `提示词示例：
「先为 算价格() 写完整测试，覆盖满减/折扣/边界，
 跑通后再重构实现，不许改测试。」`,
          codeLang: "text",
        },
      ],
    },
  ],
};
