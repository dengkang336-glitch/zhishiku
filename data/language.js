/* 编程语言与基础 大类内容 */
window.KB = window.KB || {};

window.KB.language = {
  id: "language",
  title: "编程语言与基础",
  summary: "编程语言的种类、以及不管学哪门语言都绕不开的基础概念。",
  tags: ["语言", "编程", "基础", "javascript", "python", "git"],
  what: "编程语言是你跟电脑说话的方式。这里先列主流语言各自适合干什么，再讲一遍「变量、函数、类型、面向对象」这些所有语言共通的底层概念，最后是版本控制（Git）——现代开发必须会的东西。",
  children: [
    // ================= 主流语言 =================
    {
      id: "language.major",
      title: "主流编程语言",
      summary: "各门语言分别擅长什么。",
      tags: ["语言", "javascript", "python", "java", "go", "rust"],
      what: "语言没有高下之分，只有适用场景之分。选语言主要看：你的目标（网站/App/AI/系统）、生态好不好、招人容易不容易。",
      children: [
        {
          id: "language.major.js",
          title: "JavaScript / TypeScript",
          summary: "唯一能在浏览器里跑的语言，前后端通吃。",
          tags: ["javascript", "typescript", "js", "ts", "浏览器"],
          what: "JavaScript 是网页的母语，浏览器只认它。加上 Node.js 后前后端都能写，是覆盖面最广的语言。TypeScript 是给它加了类型检查的版本，正式项目几乎都用 TS。",
          useWhen: ["任何网页前端（必须）", "Node.js 后端", "全栈项目", "跨平台 App（React Native）"],
          examples: ["网页前端", "Node 后端", "小程序", "React Native App"],
          code: `// JavaScript：浏览器里就能跑
const 名字 = "小明";
console.log(\`你好，\${名字}\`);

// TypeScript：加类型更安全
const 年龄: number = 20;`,
          codeLang: "javascript",
        },
        {
          id: "language.major.python",
          title: "Python",
          summary: "语法最接近人话，AI 和数据领域霸主。",
          tags: ["python", "ai", "数据", "脚本", "简单"],
          what: "Python 语法极简、可读性高，是入门最友好的语言。在 AI、机器学习、数据分析、自动化脚本领域是绝对老大，做网站后端也完全够用。",
          useWhen: ["学编程第一门语言", "AI / 数据相关", "写自动化脚本", "后端服务"],
          examples: ["AI 应用", "数据分析", "爬虫", "自动化脚本", "后端 API"],
          code: `# Python：读起来像英文
名字 = "小明"
print(f"你好，{名字}")

for i in range(3):
    print(i)`,
          codeLang: "python",
        },
        {
          id: "language.major.java",
          title: "Java",
          summary: "企业级后端的老大哥，稳定成熟。",
          tags: ["java", "企业级", "后端", "jvm", "android"],
          what: "Java 是运行在 JVM 上的老牌语言，性能稳定、生态极大，企业后台和 Android 开发（历史）大量使用。",
          useWhen: ["大型企业系统", "需要长期稳定维护的项目"],
          examples: ["银行/电商后台", "企业系统", "大数据（Hadoop/Spark）"],
          code: `// Java：强类型、结构严谨
public class Main {
    public static void main(String[] args) {
        String 名字 = "小明";
        System.out.println("你好，" + 名字);
    }
}`,
          codeLang: "java",
        },
        {
          id: "language.major.go",
          title: "Go",
          summary: "简洁、高性能、部署简单，云原生首选。",
          tags: ["go", "golang", "并发", "云原生", "微服务"],
          what: "Go 语法简单（只有 25 个关键字左右）、编译成单文件、天生并发强，是云原生（Docker、K8s 本身都是 Go 写的）和微服务的首选。",
          useWhen: ["高并发服务", "微服务 / 云原生工具", "想要部署简单"],
          examples: ["API 服务", "中间件、CLI 工具", "区块链", "云原生基础设施"],
          code: `// Go：简洁、编译成单个可执行文件
package main

import "fmt"

func main() {
    名字 := "小明"
    fmt.Println("你好，", 名字)
}`,
          codeLang: "go",
        },
        {
          id: "language.major.rust",
          title: "Rust",
          summary: "极致性能 + 内存安全，学习曲线陡。",
          tags: ["rust", "性能", "内存安全", "系统编程"],
          what: "Rust 性能接近 C/C++ 但能在编译期避免内存错误，适合系统底层、性能敏感场景。学习曲线很陡，一般不是第一门语言。",
          useWhen: ["极致性能要求", "系统底层开发", "需要内存安全的场景"],
          avoidWhen: ["日常业务开发用 Rust 开发效率偏低"],
          examples: ["系统工具", "高性能服务", "WebAssembly", "部分 AI 基础设施"],
          code: `// Rust：编译器帮你保证内存安全
fn main() {
    let 名字 = "小明";
    println!("你好，{}", 名字);
}`,
          codeLang: "rust",
        },
        {
          id: "language.major.c",
          title: "C / C++",
          summary: "最底层、最快的语言，操作系统和游戏引擎用它。",
          tags: ["c", "c++", "性能", "底层", "系统"],
          what: "C/C++ 直接操作内存，性能最强，操作系统、数据库内核、游戏引擎这些底层都靠它。写业务不用它。",
          useWhen: ["操作系统、驱动、嵌入式", "游戏引擎", "性能极致的底层库"],
          avoidWhen: ["业务开发用 C++ 效率低、易出内存 bug"],
          examples: ["操作系统", "游戏引擎（Unreal）", "嵌入式", "数据库内核"],
          code: `// C：最接近机器
#include <stdio.h>

int main() {
    printf("你好，世界\\n");
    return 0;
}`,
          codeLang: "c",
        },
        {
          id: "language.major.swift",
          title: "Swift",
          summary: "苹果平台的官方语言。",
          tags: ["swift", "ios", "macos", "苹果"],
          what: "Swift 是苹果主推的语言，写 iOS/iPadOS/macOS/watchOS App。语法现代、安全，配 SwiftUI 写界面很舒服。",
          useWhen: ["做 iOS / macOS App"],
          examples: ["iPhone App", "Mac App", "Apple Watch App"],
          code: `// Swift：苹果平台语言
let 名字 = "小明"
print("你好，\\(名字)")`,
          codeLang: "swift",
        },
        {
          id: "language.major.kotlin",
          title: "Kotlin",
          summary: "安卓官方语言，也能写后端。",
          tags: ["kotlin", "android", "安卓", "jvm"],
          what: "Kotlin 是 Android 官方推荐语言，语法比 Java 简洁，和 Java 完全互通，也能写后端（Ktor/Spring）。",
          useWhen: ["做 Android App", "JVM 后端"],
          examples: ["安卓 App", "后端服务"],
          code: `// Kotlin：比 Java 简洁
fun main() {
    val 名字 = "小明"
    println("你好，$名字")
}`,
          codeLang: "kotlin",
        },
        {
          id: "language.major.sql",
          title: "SQL",
          summary: "跟数据库说话的语言，不是编程语言但必须会。",
          tags: ["sql", "数据库", "查询"],
          what: "SQL 专门用来查询和操作数据库，语法像英文：SELECT 名字 FROM 用户 WHERE 年龄 > 18。它不算通用编程语言，但凡是碰数据的开发都必须会。",
          useWhen: ["操作任何关系型数据库", "数据分析"],
          examples: ["查数据", "做报表", "数据清洗"],
          code: `SELECT 名字, 年龄
FROM 用户
WHERE 年龄 > 18
ORDER BY 年龄 DESC;`,
          codeLang: "sql",
        },
        {
          id: "language.major.bash",
          title: "Shell / Bash",
          summary: "命令行脚本，自动化运维必备。",
          tags: ["shell", "bash", "命令行", "脚本", "linux"],
          what: "Bash 是 Linux/Mac 的命令行脚本语言，用来做文件操作、批量处理、自动化部署。AI 帮你生成的部署命令也都是这种。",
          useWhen: ["服务器操作", "自动化脚本", "部署流程"],
          examples: ["批量重命名文件", "自动备份", "部署脚本", "日志分析"],
          code: `# Bash：一串命令就是程序
for f in *.png; do
  echo "处理 $f"
done`,
          codeLang: "bash",
        },
      ],
    },

    // ================= 通用基础概念 =================
    {
      id: "language.concept",
      title: "通用基础概念",
      summary: "不管学哪门语言都必须懂的东西。",
      tags: ["变量", "函数", "类型", "面向对象", "异步"],
      what: "这些概念在所有语言里都存在，只是写法不同。理解了它们，换语言就只是换语法。",
      children: [
        {
          id: "language.concept.variable",
          title: "变量与数据类型",
          summary: "给数据起名字存起来，并区分类型。",
          tags: ["变量", "类型", "数据类型", "字符串", "数字"],
          what: "变量就是给一个值起名字（如 名字 = \"小明\"）。数据类型区分这是数字、文字、真假、列表还是对象。分清类型能避免很多 bug。",
          useWhen: ["所有编程的起点"],
          examples: ["字符串（文字）", "数字", "布尔（真/假）", "数组/列表", "对象/字典"],
          code: `// 常见数据类型
const 名字 = "小明";        // 字符串
const 年龄 = 20;            // 数字
const 是否成年 = true;      // 布尔
const 爱好 = ["读书", "跑步"]; // 数组
const 用户 = { 名字, 年龄 };  // 对象`,
          codeLang: "javascript",
        },
        {
          id: "language.concept.function",
          title: "函数（Function）",
          summary: "把一段逻辑打包，起个名字反复用。",
          tags: ["函数", "function", "方法", "参数", "返回值"],
          what: "函数是「一段可以反复调用的代码」：给它输入（参数），它处理，给你输出（返回值）。把重复逻辑抽成函数，代码才不至于乱成一团。",
          useWhen: ["任何有重复逻辑的地方"],
          examples: ["计算总价", "格式化日期", "发送请求"],
          code: `// 定义函数：输入两个数，返回和
function 相加(a, b) {
  return a + b;
}

相加(2, 3);   // 返回 5`,
          codeLang: "javascript",
        },
        {
          id: "language.concept.control",
          title: "条件与循环",
          summary: "让程序会「判断」和「重复」。",
          tags: ["if", "循环", "for", "while", "判断"],
          what: "条件（if）让程序根据情况走不同分支；循环（for/while）让程序重复做同一件事。这两个是一切逻辑的基础。",
          useWhen: ["任何逻辑处理"],
          examples: ["根据年龄判断是否成年", "遍历列表每一项", "重试直到成功"],
          code: `// 条件
if (年龄 >= 18) {
  console.log("成年");
} else {
  console.log("未成年");
}

// 循环：遍历列表
for (const 爱好 of ["读书", "跑步"]) {
  console.log(爱好);
}`,
          codeLang: "javascript",
        },
        {
          id: "language.concept.oop",
          title: "面向对象（OOP）",
          summary: "把「数据 + 操作」打包成对象/类。",
          tags: ["面向对象", "oop", "类", "class", "对象", "继承"],
          what: "面向对象把相关的「数据」和「操作数据的方法」打包成一个「类」，用时创建「对象」。好处是结构清晰、可复用。Java/C# 是重度 OOP，JS/Python 更灵活。",
          useWhen: ["建模现实实体（用户、订单、商品）"],
          avoidWhen: ["别为了 OOP 而 OOP，小脚本用函数就够"],
          examples: ["用户类（有名字 + 能登录）", "订单类（有商品 + 能算总价）"],
          code: `class 用户 {
  constructor(名字) {
    this.名字 = 名字;
  }
  打招呼() {
    return \`你好，我是\${this.名字}\`;
  }
}

const u = new 用户("小明");
u.打招呼();   // "你好，我是小明"`,
          codeLang: "javascript",
        },
        {
          id: "language.concept.async",
          title: "异步（Async）",
          summary: "等结果的活儿别卡住，先干别的。",
          tags: ["异步", "async", "await", "promise", "回调"],
          what: "请求网络、读文件都要等。异步让你「发起请求后先去干别的，结果回来再处理」，不阻塞。JS 用 Promise / async-await，Python 用 asyncio。",
          useWhen: ["网络请求、文件读写、数据库查询"],
          examples: ["调 API", "查数据库", "读文件"],
          code: `// async/await：等结果的写法像同步代码一样直观
async function 拿用户() {
  const res = await fetch("/api/user");
  const data = await res.json();
  return data;
}`,
          codeLang: "javascript",
        },
        {
          id: "language.concept.error",
          title: "错误处理",
          summary: "出错了怎么办，别让程序整个崩掉。",
          tags: ["错误", "异常", "try catch", "error"],
          what: "程序会出错（网络断了、文件不存在）。错误处理让你捕获错误、做补救（重试、提示用户），而不是整个程序崩溃。",
          useWhen: ["任何可能失败的操作（网络、文件、解析）"],
          examples: ["网络请求失败重试", "输入格式错误提示", "记录错误日志"],
          code: `try {
  const data = await 请求接口();
} catch (e) {
  console.error("请求失败：", e.message);
  // 做补救：重试 / 提示用户
}`,
          codeLang: "javascript",
        },
        {
          id: "language.concept.complexity",
          title: "复杂度（性能直觉）",
          summary: "为什么有的代码慢得离谱。",
          tags: ["复杂度", "性能", "大 o", "算法"],
          what: "复杂度描述「数据量变大时，耗时怎么增长」。O(1) 秒回、O(n) 线性增长、O(n²) 数据翻倍耗时翻四倍。不懂这个容易写出「1000 条数据秒开，10 万条卡死」的代码。",
          useWhen: ["处理大量数据、性能优化时"],
          examples: ["循环嵌套循环 = O(n²)，数据大了会爆炸", "用哈希表查找 = O(1)"],
          code: `// O(n²)：嵌套循环，数据翻倍耗时翻 4 倍
for (const a of 列表) {
  for (const b of 列表) { /* ... */ }
}

// O(n)：一次遍历
for (const a of 列表) { /* ... */ }`,
          codeLang: "javascript",
        },
      ],
    },

    // ================= 版本控制 =================
    {
      id: "language.git",
      title: "版本控制（Git）",
      summary: "记录代码的每一次修改，能回退、能协作。",
      tags: ["git", "github", "版本控制", "提交", "分支"],
      what: "Git 记录代码的每一次改动，随时能回到任何历史版本。配合 GitHub 还能多人协作、备份、自动部署。是现代开发的必备工具，vibe coding 也离不开（AI 改坏了可以回退）。",
      children: [
        {
          id: "language.git.git",
          title: "Git 基础操作",
          summary: "提交、回退、查看历史。",
          tags: ["git", "commit", "回退", "历史", "版本"],
          what: "最常用的几个操作：git status 看改了什么、git add 选中要提交的改动、git commit 存一个版本、git log 看历史、git checkout 回退到某个版本。",
          useWhen: ["所有代码项目"],
          examples: ["保存一个版本", "回退到昨天的代码", "查看谁改了什么"],
          code: `git status              # 看看改了什么
git add .               # 把改动加入暂存
git commit -m "修好了登录 bug"   # 存一个版本
git log --oneline       # 看历史版本
git checkout <版本号>    # 回到某个版本`,
          codeLang: "bash",
        },
        {
          id: "language.git.github",
          title: "GitHub / 远程仓库",
          summary: "把代码存到云端，多人协作。",
          tags: ["github", "gitlab", "gitee", "远程", "协作"],
          what: "GitHub 是代码托管平台，把本地 Git 仓库推上去就能备份、分享、多人协作。国内可用 Gitee，企业可用 GitLab。也是 AI 工具接入代码库的基础。",
          useWhen: ["需要备份、协作、开源", "接入 CI/CD 自动部署"],
          examples: ["代码备份", "多人协作", "开源项目", "触发自动部署"],
          code: `git clone <仓库地址>     # 克隆别人的项目
git push                # 把本地提交推到 GitHub
git pull                # 拉取别人的最新改动`,
          codeLang: "bash",
        },
        {
          id: "language.git.branch",
          title: "分支（Branch）",
          summary: "并行开发互不干扰。",
          tags: ["分支", "branch", "合并", "merge", "pull request"],
          what: "分支让你从主线分出一条岔路开发新功能，不影响主线；做完再合并回去。团队协作的标准做法：每人一个分支，做完提 PR（Pull Request）让别人 review 再合并。",
          useWhen: ["开发新功能、修 bug、团队协作"],
          examples: ["功能分支开发", "PR 代码评审", "发布分支"],
          code: `git checkout -b feature-login   # 新建并切换到功能分支
# ... 开发 ...
git checkout main                # 回到主线
git merge feature-login          # 把功能合并进来`,
          codeLang: "bash",
        },
        {
          id: "language.git.gitignore",
          title: ".gitignore 与密钥安全",
          summary: "哪些文件不该提交到仓库。",
          tags: ["gitignore", "密钥", "安全", "node_modules", "env"],
          what: "有些文件不该进 Git：依赖包（node_modules，太大）、构建产物、以及最关键的——存放密码/密钥的 .env 文件。一旦提交上去，密钥就泄露了（Git 历史里永久留痕）。",
          useWhen: ["任何项目一开始就要配"],
          avoidWhen: ["千万别在仓库里提交 .env、密钥、私钥文件"],
          examples: ["忽略 node_modules", "忽略 .env", "忽略构建产物 dist/"],
          code: `# .gitignore 示例
node_modules/     # 依赖包（太大，可重装）
dist/             # 构建产物
.env              # 密钥配置（绝对不能提交！）
.DS_Store         # Mac 系统文件`,
          codeLang: "bash",
        },
      ],
    },
  ],
};
