/* 后端开发 大类内容 */
window.KB = window.KB || {};

window.KB.backend = {
  id: "backend",
  title: "后端开发",
  summary: "负责「用户看不到但很重要的部分」：处理数据、算业务逻辑、存数据、给前端提供数据。",
  tags: ["后端", "backend", "服务器", "接口", "API", "服务端"],
  what: "后端是「幕后大脑」。前端负责界面好看，后端负责干活：收到前端发来的请求 → 做计算、查数据库、调其他服务 → 把结果返回给前端。用户看不到后端代码，但登录、下单、查数据这些功能都靠后端完成。",
  children: [
    // ================= 后端语言 =================
    {
      id: "backend.lang",
      title: "后端语言",
      summary: "写后端代码用的编程语言。",
      tags: ["语言", "language", "node", "python", "java"],
      what: "后端语言是写服务器代码用的语言。选语言主要看：生态（现成的库多不多）、性能、招人难度、AI 生成质量。没有绝对最好的语言，只有最适合你项目的。",
      children: [
        {
          id: "backend.lang.node",
          title: "Node.js",
          summary: "用 JavaScript 写后端，和前端同一种语言。",
          tags: ["node", "nodejs", "javascript", "js", "同构"],
          what: "Node.js 让 JavaScript 也能在服务器上跑。最大好处是前后端用同一种语言，一套思维、代码可复用，适合前端背景的人或 solo 开发者。",
          useWhen: ["个人项目 / 快速开发", "想前后端同一种语言", "AI 生成代码质量高、生态大"],
          avoidWhen: ["CPU 密集计算（视频处理、大量数学运算）不是它强项"],
          examples: ["网站后端", "API 服务", "实时应用（聊天）", "配合 Next.js 做全栈"],
          code: `// Node.js 最简单的一个服务
const http = require("http");
const server = http.createServer((req, res) => {
  res.end("你好，世界");
});
server.listen(3000);`,
          codeLang: "javascript",
        },
        {
          id: "backend.lang.python",
          title: "Python",
          summary: "语法简单、AI/数据领域最强的语言。",
          tags: ["python", "ai", "数据", "django", "flask"],
          what: "Python 语法接近自然语言、上手快，而且在 AI、数据分析、自动化领域是绝对主流。做普通网站也完全够用（Django、FastAPI 等框架很成熟）。",
          useWhen: ["想碰 AI / 数据处理", "快速写后端脚本、工具", "团队熟悉 Python"],
          avoidWhen: ["对极致性能有要求时，Python 偏慢（可用 Go/Rust）"],
          examples: ["AI 应用后端", "数据分析服务", "网站后端", "自动化脚本"],
          code: `# Python 最简单的一个服务（FastAPI）
from fastapi import FastAPI
app = FastAPI()

@app.get("/")
def home():
    return {"message": "你好，世界"}`,
          codeLang: "python",
        },
        {
          id: "backend.lang.java",
          title: "Java",
          summary: "企业级后端的主力语言，稳定、生态成熟。",
          tags: ["java", "spring", "企业级", "jvm"],
          what: "Java 是老牌企业级语言，性能好、稳定、生态极其成熟（Spring 全家桶），银行、电商、大厂后台大量使用。",
          useWhen: ["大型企业系统", "需要强稳定性和长期维护"],
          avoidWhen: ["个人小项目用 Java 会偏重、开发速度慢", "快速原型"],
          examples: ["银行系统", "电商后台", "企业内部系统"],
          code: `// Java 最简单的一个服务（Spring Boot）
@RestController
public class HomeController {
    @GetMapping("/")
    public String home() {
        return "你好，世界";
    }
}`,
          codeLang: "java",
        },
        {
          id: "backend.lang.go",
          title: "Go",
          summary: "性能好、部署简单，适合高并发服务。",
          tags: ["go", "golang", "性能", "并发", "微服务"],
          what: "Go（Golang）是 Google 出的语言，编译成单个可执行文件、部署极简单，性能强、天然支持高并发，是云原生和微服务的首选。",
          useWhen: ["高并发服务、API 网关", "微服务、云原生", "想部署简单（一个文件就能跑）"],
          avoidWhen: ["快速原型开发时 Go 写起来比 Python/Node 略啰嗦"],
          examples: ["API 服务", "微服务", "中间件", "CLI 工具"],
          code: `// Go 最简单的一个服务
package main

import (
    "net/http"
    "fmt"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprint(w, "你好，世界")
    })
    http.ListenAndServe(":3000", nil)
}`,
          codeLang: "go",
        },
        {
          id: "backend.lang.php",
          title: "PHP",
          summary: "网站时代的老牌语言，WordPress 用它。",
          tags: ["php", "wordpress", "laravel", "网站"],
          what: "PHP 是互联网早期最流行的网站语言，至今仍有大量网站（尤其 WordPress）在用，部署简单、资料多。",
          useWhen: ["做 WordPress 相关", "老项目维护", "简单网站快速上线"],
          avoidWhen: ["新项目一般有更现代的选择（Node/Python/Go）"],
          examples: ["WordPress 插件/主题", "中小网站", "老系统维护"],
          code: `<?php
// PHP 最简单的一个响应
echo "你好，世界";
?>`,
          codeLang: "php",
        },
        {
          id: "backend.lang.ruby",
          title: "Ruby",
          summary: "优雅的语法 + Rails 框架，适合快速开发。",
          tags: ["ruby", "rails", "ruby on rails"],
          what: "Ruby 语法优雅，配合 Rails 框架能极快地搭出完整应用，曾是创业公司最爱。现在热度下降但仍有稳定生态。",
          useWhen: ["快速搭 MVP、创业项目", "维护 Rails 老项目"],
          avoidWhen: ["生态和招聘池在缩小，新项目需权衡"],
          examples: ["创业 MVP", "Rails 老项目", "内容型网站"],
          code: `# Ruby 最简单的一个响应（Rails）
class HomeController < ApplicationController
  def index
    render plain: "你好，世界"
  end
end`,
          codeLang: "ruby",
        },
        {
          id: "backend.lang.csharp",
          title: "C# / .NET",
          summary: "微软系语言，企业 Windows 生态主力。",
          tags: ["csharp", "c#", ".net", "dotnet", "微软"],
          what: "C# 是微软的主力语言，配合 .NET 框架，在 Windows 企业环境、游戏（Unity）等领域很强。",
          useWhen: ["Windows 企业环境", "游戏开发（Unity）", "团队有 .NET 背景"],
          examples: ["企业内部系统", "游戏后端", "桌面应用"],
          code: `// C# 最简单的一个响应（ASP.NET Core）
[ApiController]
[Route("/")]
public class HomeController : ControllerBase
{
    [HttpGet]
    public string Home() => "你好，世界";
}`,
          codeLang: "csharp",
        },
      ],
    },

    // ================= Web 框架 =================
    {
      id: "backend.framework",
      title: "Web 框架",
      summary: "帮你快速搭后端服务的脚手架。",
      tags: ["框架", "framework", "express", "spring", "django"],
      what: "Web 框架提供「路由（哪个地址执行哪段代码）、处理请求、返回响应」这些基础设施，让你不用从零写服务器。每种语言都有对应的主流框架。",
      children: [
        {
          id: "backend.framework.express",
          title: "Express（Node）",
          summary: "Node 最流行的 Web 框架，简单灵活。",
          tags: ["express", "node", "javascript", "api"],
          what: "Express 是 Node 生态最经典、最常用的 Web 框架，极简灵活，写 API 很快。",
          useWhen: ["Node 项目的默认选择", "快速写 REST API"],
          examples: ["API 服务", "网站后端", "配合 React/Vue 前端"],
          code: `const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("你好，世界");
});

app.listen(3000);`,
          codeLang: "javascript",
        },
        {
          id: "backend.framework.nestjs",
          title: "Nest.js（Node）",
          summary: "Node 里结构严谨、适合大项目的框架。",
          tags: ["nestjs", "node", "typescript", "企业级"],
          what: "Nest.js 是 Node 生态里偏「企业级」的框架，强制分层、用 TypeScript，结构清晰，适合大型团队协作。",
          useWhen: ["Node 技术栈的大中型项目", "想要清晰的分层架构"],
          avoidWhen: ["小项目用 Nest 偏重，Express 更快"],
          examples: ["企业后端", "微服务", "中大型 API"],
          codeLang: "typescript",
        },
        {
          id: "backend.framework.spring",
          title: "Spring Boot（Java）",
          summary: "Java 生态事实标准，企业级首选。",
          tags: ["spring", "spring boot", "java", "企业级"],
          what: "Spring Boot 是 Java 后端的事实标准框架，功能全、生态成熟，是大型企业系统的首选。",
          useWhen: ["大型企业系统", "需要事务、安全等企业级能力"],
          avoidWhen: ["个人小项目偏重"],
          examples: ["银行、电商后台", "企业内部系统", "微服务"],
          codeLang: "java",
        },
        {
          id: "backend.framework.django",
          title: "Django（Python）",
          summary: "Python 里「全家桶」框架，自带后台管理。",
          tags: ["django", "python", "全家桶", "后台管理"],
          what: "Django 是 Python 的「全家桶」框架，自带后台管理、用户系统、ORM，开箱即用，适合快速做出完整网站。",
          useWhen: ["快速做完整网站（含后台管理）", "内容型网站、管理系统"],
          avoidWhen: ["只想要轻量 API 时用 FastAPI 更轻"],
          examples: ["内容管理系统", "电商网站", "内部系统", "新闻网站"],
          code: `from django.http import HttpResponse

def home(request):
    return HttpResponse("你好，世界")`,
          codeLang: "python",
        },
        {
          id: "backend.framework.fastapi",
          title: "FastAPI（Python）",
          summary: "Python 里现代、高性能的 API 框架。",
          tags: ["fastapi", "python", "api", "异步"],
          what: "FastAPI 是 Python 里较新的 API 框架，性能好、自动生成接口文档、用类型标注写起来清晰，近年非常火。",
          useWhen: ["写 API 服务", "AI 应用后端（大量 AI 项目用它）"],
          examples: ["API 服务", "AI 后端", "数据接口"],
          code: `from fastapi import FastAPI
app = FastAPI()

@app.get("/")
def home():
    return {"message": "你好，世界"}`,
          codeLang: "python",
        },
        {
          id: "backend.framework.gin",
          title: "Gin（Go）",
          summary: "Go 生态最流行的 Web 框架。",
          tags: ["gin", "go", "golang", "api"],
          what: "Gin 是 Go 生态最流行的 Web 框架，高性能、轻量，是写 Go API 服务的标配。",
          useWhen: ["Go 项目的默认选择", "高性能 API 服务"],
          examples: ["API 服务", "微服务", "中间件"],
          code: `package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()
    r.GET("/", func(c *gin.Context) {
        c.String(200, "你好，世界")
    })
    r.Run(":3000")
}`,
          codeLang: "go",
        },
        {
          id: "backend.framework.laravel",
          title: "Laravel（PHP）",
          summary: "PHP 生态最优雅的框架。",
          tags: ["laravel", "php", "优雅", "全栈"],
          what: "Laravel 是 PHP 生态最优雅、功能最全的框架，语法漂亮、开发体验好。",
          useWhen: ["PHP 项目", "想用 PHP 快速开发"],
          examples: ["中小网站", "SaaS 应用", "管理后台"],
          code: `Route::get("/", function () {
    return "你好，世界";
});`,
          codeLang: "php",
        },
      ],
    },

    // ================= API 设计 =================
    {
      id: "backend.api",
      title: "API 设计",
      summary: "前后端之间「怎么传数据、传什么格式」。",
      tags: ["api", "接口", "rest", "graphql", "grpc"],
      what: "API（接口）是前后端之间约定的「数据交流方式」：前端按约定发请求，后端按约定返回数据。设计好 API，前后端才能顺畅配合。",
      children: [
        {
          id: "backend.api.rest",
          title: "REST API",
          summary: "最主流、最常见的接口风格。",
          tags: ["rest", "restful", "api", "http", "接口"],
          what: "REST 用「HTTP 方法 + 网址」来描述操作：GET 查数据、POST 新增、PUT 更新、DELETE 删除。是最通用、最普及的接口风格。",
          useWhen: ["绝大多数应用默认用 REST", "前后端分离的常规接口"],
          examples: ["GET /users 查用户列表", "POST /users 新增用户", "DELETE /users/123 删除用户"],
          code: `// 一个 REST 接口示例
GET    /articles        查看文章列表
POST   /articles        新建文章
GET    /articles/123    查看第 123 篇
PUT    /articles/123    更新第 123 篇
DELETE /articles/123    删除第 123 篇`,
          codeLang: "text",
        },
        {
          id: "backend.api.graphql",
          title: "GraphQL",
          summary: "前端想要什么数据，就精确返回什么。",
          tags: ["graphql", "查询", "api", "facebook"],
          what: "GraphQL 让前端自己「点菜」：一次请求精确指定要哪些字段，后端只返回这些字段，不多不少。避免了 REST 常见的「要的没给、给的没用」。",
          useWhen: ["数据关系复杂、前端需要灵活组合", "移动端想减少请求次数和流量"],
          avoidWhen: ["简单接口用 REST 更省事（GraphQL 有学习成本）"],
          examples: ["复杂后台", "移动 App 数据层", "需要精确控制返回字段的场景"],
          code: `# 前端发这样一个查询，后端只返回这两个字段
query {
  user(id: 1) {
    name
    email
  }
}`,
          codeLang: "graphql",
        },
        {
          id: "backend.api.grpc",
          title: "gRPC",
          summary: "服务之间通信的高性能协议。",
          tags: ["grpc", "rpc", "微服务", "高性能"],
          what: "gRPC 是 Google 出的高性能通信协议，二进制传输、速度快，主要用于「后端服务之间」互相调用（微服务内部通信），一般不直接给浏览器用。",
          useWhen: ["微服务之间通信", "高性能内部调用"],
          avoidWhen: ["浏览器直连接口用 REST/GraphQL 更合适"],
          examples: ["微服务内部通信", "低延迟后端调用"],
          codeLang: "protobuf",
        },
        {
          id: "backend.api.websocket",
          title: "WebSocket",
          summary: "前后端保持长连接，实时双向通信。",
          tags: ["websocket", "实时", "长连接", "聊天", "推送"],
          what: "普通请求是「问一次答一次」。WebSocket 建立后前后端保持一条常开的连接，可以随时互相推送消息，用于实时场景。",
          useWhen: ["实时聊天", "实时推送（通知、行情）", "在线协作、多人游戏"],
          avoidWhen: ["普通「请求-响应」场景用 HTTP 就行"],
          examples: ["在线聊天", "股票行情", "协同编辑", "游戏实时同步"],
          codeLang: "javascript",
        },
      ],
    },

    // ================= 核心机制 =================
    {
      id: "backend.core",
      title: "核心机制",
      summary: "后端几乎都要用到的通用能力。",
      tags: ["鉴权", "缓存", "消息队列", "日志", "数据库"],
      what: "不管做什么后端，都会反复遇到这几件事：怎么验证用户身份（鉴权）、怎么跟数据库打交道（ORM）、怎么加速（缓存）、怎么处理耗时任务（消息队列）、怎么记录问题（日志）、怎么定时跑任务（调度）。",
      children: [
        {
          id: "backend.core.auth",
          title: "鉴权认证（Auth）",
          summary: "确认「你是谁、你有没有权限」。",
          tags: ["鉴权", "认证", "jwt", "oauth", "session", "登录", "权限"],
          what: "鉴权解决「你是谁」（认证）和「你能干什么」（授权）两个问题。常见方式：Session（服务器记状态）、JWT（发一个令牌给用户）、OAuth（用微信/Google 登录）。",
          useWhen: ["任何有用户登录的系统都需要"],
          avoidWhen: ["密码要加密存储（绝不能明文）", "敏感接口一定要校验权限"],
          examples: ["登录/注册", "JWT 令牌", "微信/Google 第三方登录（OAuth）", "角色权限（管理员/普通用户）"],
          code: `// JWT：登录后发令牌，之后请求带上令牌
// 1. 登录成功，签发令牌（里面含用户信息）
const token = jwt.sign({ userId: 123 }, "密钥");

// 2. 之后请求头带上令牌，后端验证
Authorization: Bearer <token>`,
          codeLang: "text",
        },
        {
          id: "backend.core.orm",
          title: "数据库操作（ORM）",
          summary: "用写代码的方式操作数据库，不用手写 SQL。",
          tags: ["orm", "数据库", "sql", "模型", "migration"],
          what: "ORM 把「数据库表」映射成「代码里的对象」，让你用写代码的方式增删改查，不用手写 SQL 语句，还能自动处理数据库结构变更（迁移）。",
          useWhen: ["大多数项目都用 ORM 操作数据库", "需要管理数据库结构变更"],
          avoidWhen: ["复杂查询、性能敏感场景可能需要手写 SQL"],
          examples: ["Prisma（Node）", "SQLAlchemy（Python）", "GORM（Go）", "Hibernate（Java）"],
          code: `// 用 ORM 查所有用户（不用写 SQL）
const users = await db.user.findMany();
// 等价于 SQL: SELECT * FROM user`,
          codeLang: "javascript",
        },
        {
          id: "backend.core.cache",
          title: "缓存（Cache）",
          summary: "把常用数据存内存里，加速访问。",
          tags: ["缓存", "cache", "redis", "加速", "性能"],
          what: "缓存把「查起来慢、但经常用」的数据临时存在快速的内存里（如 Redis），下次直接拿，不用再算一遍或查数据库，大幅提速。",
          useWhen: ["热点数据（首页、热门商品）", "减轻数据库压力", "存登录状态、验证码等临时数据"],
          avoidWhen: ["要注意缓存过期和一致性问题（数据更新了缓存要同步）"],
          examples: ["Redis 存热门数据", "首页缓存", "验证码/限流"],
          code: `# 用 Redis 缓存数据（Python 示例）
import redis
r = redis.Redis()
r.set("首页", "首页内容...", ex=60)   # 缓存 60 秒
r.get("首页")                          # 直接取缓存`,
          codeLang: "python",
        },
        {
          id: "backend.core.queue",
          title: "消息队列（Message Queue）",
          summary: "把耗时任务排队，后台慢慢处理。",
          tags: ["消息队列", "queue", "异步", "rabbitmq", "kafka"],
          what: "消息队列像一个「任务排队系统」：把耗时任务（发邮件、生成报表）丢进队列，后台慢慢处理，让用户不用干等。也用于多个服务之间解耦。",
          useWhen: ["耗时任务异步处理（发邮件、生成文件）", "服务之间解耦", "削峰（流量高峰时排队）"],
          avoidWhen: ["简单同步操作不必上队列（增加复杂度）"],
          examples: ["下单后异步发邮件", "生成报表", "日志收集", "服务间通信（Kafka/RabbitMQ）"],
          codeLang: "text",
        },
        {
          id: "backend.core.logging",
          title: "日志（Logging）",
          summary: "记录系统运行时发生了什么，出问题好排查。",
          tags: ["日志", "log", "日志", "排查", "监控"],
          what: "日志记录系统运行时的关键信息（谁在什么时候做了什么、有没有报错）。出问题时靠日志排查，是后端必备能力。",
          useWhen: ["每个后端系统都要有日志", "记录错误、关键操作、请求信息"],
          avoidWhen: ["敏感信息（密码、手机号）不能写进日志"],
          examples: ["错误日志", "请求日志", "操作审计日志", "性能日志"],
          code: `// 记录不同级别的日志（Python）
import logging
logging.info("用户 123 登录成功")   # 普通信息
logging.warning("缓存未命中")        # 警告
logging.error("数据库连接失败")      # 错误`,
          codeLang: "python",
        },
        {
          id: "backend.core.task",
          title: "任务调度（定时任务）",
          summary: "让程序定时自动执行任务。",
          tags: ["定时任务", "调度", "cron", "任务", "自动化"],
          what: "任务调度让程序按计划自动执行任务，比如每天凌晨备份数据、每小时发一次汇总。",
          useWhen: ["定时备份", "定时发通知/报表", "定时清理过期数据"],
          examples: ["每天备份数据库", "定时发邮件", "定时同步数据", "定时清理日志"],
          code: `# 每天凌晨 2 点备份数据库（cron 表达式）
0 2 * * *  backup.sh`,
          codeLang: "bash",
        },
      ],
    },
  ],
};

// ================= 语言生态（补充：Python / Node 后端真正天天用的库） =================
window.KB.backend.children.push({
  id: "backend.python-stack",
  title: "Python 后端常用件",
  summary: "用 Python 写后端时，绕不开的四个东西：校验、ORM 与迁移、任务队列、服务器。",
  tags: ["python", "celery", "pydantic", "sqlalchemy", "gunicorn", "uvicorn"],
  what: "Python 做后端通常的技术组合是：FastAPI/Django 写接口 → Pydantic 做数据校验 → SQLAlchemy 操作数据库、Alembic 管表结构变更 → Celery 把慢活挪到后台 → Gunicorn/Uvicorn 把服务跑起来。知道每一件负责什么，才能在 AI 给出的代码里看懂它在干嘛。",
  children: [
    {
      id: "backend.python-stack.pydantic",
      title: "Pydantic（数据校验）",
      summary: "进门先检查：进来的数据字段对不对、类型对不对、有没有超范围。",
      tags: ["pydantic", "校验", "schema", "validation", "fastapi"],
      what: "Pydantic 用 Python 类型标注定义「一条数据应该长什么样」，收到的请求会自动校验、转换类型、报出清晰的错误。它同时是 FastAPI 的底层，接口的入参出参本质上都是 Pydantic 模型。",
      useWhen: ["接口收参数（几乎必用）", "要保证「年龄是数字、邮箱格式对、必填项没漏」", "需要把模型转成 JSON 返回"],
      avoidWhen: ["内部函数之间传已经校验过的对象，不必层层再建模型", "极小的脚本用 dataclass 就够"],
      examples: ["注册接口参数校验", "AI 输出的结构化结果校验", "配置文件加载校验"],
      code: `from pydantic import BaseModel, EmailStr, Field

class UserIn(BaseModel):
    email: EmailStr
    age: int = Field(ge=18, le=120)
    nickname: str | None = None

# 自动校验，不合格直接返回 422 和具体原因
user = UserIn(**request_body)`,
      codeLang: "python",
    },
    {
      id: "backend.python-stack.sqlalchemy",
      title: "SQLAlchemy + Alembic（ORM 与表结构迁移）",
      summary: "用 Python 类操作数据库；改表结构靠迁移脚本，而不是手改线上库。",
      tags: ["sqlalchemy", "alembic", "orm", "迁移", "migration"],
      what: "SQLAlchemy 把数据库表映射成 Python 类（User 类 → users 表），你写 user.name 而不是拼 SQL。Alembic 管「表结构版本」：你改了模型，它生成一份迁移脚本，按顺序升级/回滚，所有环境（开发、测试、线上）表结构保持一致。",
      useWhen: ["Python 项目操作关系型数据库", "表结构会随需求变化（几乎必然）", "多人 / 多环境需要表结构一致"],
      avoidWhen: ["复杂报表统计，手写 SQL 更清楚（SQLAlchemy 也支持直接执行 SQL）", "只读一次的小脚本，用 sqlite3 原生模块更快"],
      examples: ["用户、订单、商品表", "加字段 / 建索引 / 数据回填", "多环境同步表结构"],
      code: `class User(Base):
    __tablename__ = "users"
    id = mapped_column(Integer, primary_key=True)
    email = mapped_column(String(255), unique=True)

# 改完模型后生成迁移
# alembic revision --autogenerate -m "add nickname"
# alembic upgrade head`,
      codeLang: "python",
    },
    {
      id: "backend.python-stack.celery",
      title: "Celery（后台任务队列）",
      summary: "把慢活（发邮件、生图、跑 AI）丢到后台，接口立刻返回。",
      tags: ["celery", "异步任务", "队列", "worker", "redis", "rabbitmq"],
      what: "Celery 让接口只负责「收下任务、放进队列、立刻返回」，再由独立的 worker 进程慢慢执行。需要一个消息中间件（Redis 或 RabbitMQ）当队列。适合几十秒到几十分钟的任务，比如生图、批量导入、调用大模型、发邮件。",
      useWhen: ["任务耗时超过一两秒，用户等不了", "要做失败重试、定时任务（celery beat）", "突然的流量高峰需要削峰"],
      avoidWhen: ["任务只需几十毫秒（直接做完更简单）", "需要任务结果实时反馈给前端，应该用流式响应而不是队列"],
      examples: ["上传 CSV 批量导入用户", "调用 AI 生成图片后通知", "每晚统计报表", "群发邮件 / 短信"],
      code: `from celery import Celery

app = Celery("tasks", broker="redis://localhost:6379/0")

@app.task(bind=True, max_retries=3)
def make_image(self, prompt: str):
    return call_model(prompt)

# 接口里只丢任务，不等结果
task = make_image.delay("一只橘猫")`,
      codeLang: "python",
    },
    {
      id: "backend.python-stack.server",
      title: "Gunicorn / Uvicorn（把服务跑起来）",
      summary: "开发用 flask run，上线要用正经的服务器进程。",
      tags: ["gunicorn", "uvicorn", "wsgi", "asgi", "部署", "worker"],
      what: "Uvicorn 是 ASGI 服务器，跑 FastAPI 这类异步框架；Gunicorn 是进程管理器，负责开多个 worker、崩了自动重启（也可以托管 Uvicorn worker）。开发时的自动重载服务器性能很差，绝不能直接上线。",
      useWhen: ["上线部署 Python 服务", "需要多进程利用多核 CPU", "需要进程崩溃后自动重启"],
      avoidWhen: ["本地开发用 --reload 就行", "Serverless 平台（如 Vercel / Lambda）已经替你处理了，不需要自己起"],
      examples: ["FastAPI + Uvicorn 部署", "Gunicorn 多 worker 跑 Django", "容器里的启动命令"],
      code: `# 单进程（适合容器里 1 容器 1 进程）
uvicorn main:app --host 0.0.0.0 --port 8000

# 多进程（传统服务器；worker 数 ≈ CPU 核数 * 2 + 1）
gunicorn main:app -k uvicorn.workers.UvicornWorker -w 4 -b 0.0.0.0:8000`,
      codeLang: "bash",
    },
  ],
});

window.KB.backend.children.push({
  id: "backend.node-stack",
  title: "Node 后端常用件",
  summary: "JS 写后端时的四个标配：数据库访问、参数校验、任务队列、本地数据库。",
  tags: ["node", "prisma", "zod", "bullmq", "sqlite", "express"],
  what: "Node 后端生态比 Python 更碎，但高频组合很固定：Prisma 管数据库、Zod 做校验（还能和前端共享 schema）、BullMQ 跑后台任务、better-sqlite3 应付小项目。再配上 Express/Fastify 或 Next.js 的 API 路由就是一套完整后端。",
  children: [
    {
      id: "backend.node-stack.prisma",
      title: "Prisma（Node 的数据库工具）",
      summary: "写一份 schema，自动生成类型安全的查询代码和表结构。",
      tags: ["prisma", "orm", "schema", "migration", "node"],
      what: "Prisma 用一份 schema.prisma 描述表结构，然后自动生成带类型的客户端：prisma.user.findMany() 有完整补全和类型检查，写错字段名立刻报错。迁移也由它管理（prisma migrate）。",
      useWhen: ["TypeScript 项目访问数据库（类型安全是最大卖点）", "想少写 SQL 又不想失去结构清晰", "需要看数据（prisma studio 自带可视化）"],
      avoidWhen: ["需要极复杂 SQL（窗口函数、CTE）时它不擅长，可以用 $queryRaw", "Serverless 冷启动场景，连接管理需要额外配置（或用 accelerate / 连接池）"],
      examples: ["用户与订单 CRUD", "多环境迁移", "后台看数据"],
      code: `// schema.prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  posts Post[]
}

// 代码里
const users = await prisma.user.findMany({ where: { email: { contains: "a" } } });`,
      codeLang: "javascript",
    },
    {
      id: "backend.node-stack.zod",
      title: "Zod（参数校验 + 类型推导）",
      summary: "一份 schema 同时当运行时校验和 TypeScript 类型用。",
      tags: ["zod", "校验", "validation", "typescript", "schema"],
      what: "Zod 用代码声明数据结构，既能校验运行时收到的真实数据，又能自动推导出 TypeScript 类型（z.infer）。前端表单、后端接口、AI 结构化输出都能共用同一份 schema。",
      useWhen: ["接口入参校验", "前端表单校验（配合 React Hook Form）", "校验 AI 返回的 JSON 是否合规"],
      avoidWhen: ["纯 JavaScript 项目也能用，但类型优势发挥不出来", "性能极端敏感的路径（超高 QPS）要考虑开销"],
      examples: ["POST /api/orders 参数校验", "环境变量校验（启动时快速失败）", "AI 输出解析"],
      code: `const OrderSchema = z.object({
  sku: z.string().min(1),
  qty: z.number().int().positive(),
});

const data = OrderSchema.parse(req.body); // 不合格直接抛错
type Order = z.infer<typeof OrderSchema>; // 自动得到 TS 类型`,
      codeLang: "typescript",
    },
    {
      id: "backend.node-stack.bullmq",
      title: "BullMQ（Node 的后台任务队列）",
      summary: "基于 Redis 的任务队列，用来跑发邮件、生图、爬数据这类慢活。",
      tags: ["bullmq", "队列", "job", "redis", "后台任务", "重试"],
      what: "BullMQ 把任务放进 Redis 队列，worker 进程取出执行，支持重试、延迟执行、定时重复、并发控制和进度上报。接口只负责入队，用户不用等。",
      useWhen: ["Node/Next.js 项目需要后台任务", "需要失败重试和任务进度", "要限制并发（比如同时只跑 2 个 AI 生图）"],
      avoidWhen: ["单机小工具，setTimeout 就够", "任务必须严格顺序且不可丢，要考虑更强的消息中间件（Kafka）"],
      examples: ["发送欢迎邮件", "视频转码进度", "定时抓取数据", "AI 批量生成"],
      code: `const queue = new Queue("images", { connection: redis });

await queue.add("make", { prompt }, {
  attempts: 3,
  backoff: { type: "exponential", delay: 2000 },
});`,
      codeLang: "javascript",
    },
    {
      id: "backend.node-stack.sqlite",
      title: "better-sqlite3 / node:sqlite（小项目直接上 SQLite）",
      summary: "一个文件就是数据库，不用装服务，几十万行以内都很够用。",
      tags: ["sqlite", "better-sqlite3", "node:sqlite", "本地数据库", "轻量"],
      what: "SQLite 把整个数据库存成一个文件，无需安装数据库服务，读写是本地文件操作，非常快。Node 里用 better-sqlite3（同步 API、简单可靠）或 Node 22+ 自带的 node:sqlite。适合内部工具、单人产品、原型、桌面应用。",
      useWhen: ["内部工具、MVP、单机部署", "数据量在百万行以内、并发不高", "想要备份简单（复制一个文件）"],
      avoidWhen: ["多台服务器同时写同一个库（文件锁会打架）", "高并发写入（每秒几百次以上）"],
      examples: ["个人知识库 / 记账", "内部管理后台", "桌面 App 数据存储", "原型验证"],
      code: `const db = new Database("app.db");
db.pragma("journal_mode = WAL");   // 允许多进程读、单写，必开

db.prepare("INSERT INTO notes (title) VALUES (?)").run("第一条");`,
      codeLang: "javascript",
    },
  ],
});
