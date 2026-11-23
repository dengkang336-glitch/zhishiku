# 部署与更新

纯静态站点，没有构建步骤：仓库里的文件就是线上文件。所有平台都只是「把仓库里的文件发出去」。

## 现在部署在哪

| 平台 | 地址 | 状态 |
|---|---|---|
| GitHub Pages（主用） | https://dengkang336-glitch.github.io/zhishiku/ | 已上线，分支 main 的根目录 |
| Cloudflare Workers（静态资源） | https://zhishiku.dengkang336.workers.dev | 已部署，国内网络可能打不开 |

GitHub Pages 在国内一般能访问（速度一般，偶尔需要多刷一次）。Cloudflare 的 `*.workers.dev` 域名在国内基本不可达，所以它只当海外备份。

## 改完内容怎么更新（最常用）

```bash
cd /Users/kd/Documents/PI/zhishiku
git add -A
git commit -m "补充了 Redis 的踩坑"
git push
```

推上去之后 GitHub Pages 会自动重新发布，通常 30 秒到 1 分钟生效。地址不变。

想确认是否发布成功：仓库页面 → Actions 旁边的 **Deployments**，或直接刷新线上地址（必要时强制刷新 Cmd+Shift+R）。

## 回滚一次改动

```bash
git log --oneline          # 找到要退回的那次提交
git revert <提交号>         # 生成一次「反向提交」，安全，不改历史
git push
```

## 换 / 加部署平台

### Cloudflare（已配好 `wrangler.jsonc`）

```bash
cd /Users/kd/Documents/PI/zhishiku
npx wrangler deploy        # 需要先 npx wrangler login
```

或者在 Cloudflare 控制台 → Workers & Pages → 连 Git 仓库：
- Framework preset：`None`
- Build command：留空
- Build output directory：`/`（或 `.`）

### Vercel（已配好 `vercel.json`）

1. vercel.com → Add New → Project → 导入这个 GitHub 仓库
2. Framework Preset 选 **Other**，Build Command 留空，Output Directory 填 `.`
3. Deploy。之后每次 push 自动发布，PR 还会生成预览地址

命令行也行：`npx vercel --prod`

### Netlify（已配好 `netlify.toml`）

连仓库即可，Publish directory 是 `.`，无需构建命令。

### 自己的服务器（国内访问最快）

```bash
# 本地打包（排除不需要上传的）
rsync -av --exclude .git --exclude docs ./ user@your-server:/var/www/zhishiku/
```

nginx 配一段：

```nginx
server {
  listen 80;
  server_name kb.example.com;
  root /var/www/zhishiku;
  index index.html;
  location / { try_files $uri $uri/ /index.html; }
}
```

再配 HTTPS（`certbot --nginx -d kb.example.com`）。
**注意**：服务器在中国大陆境内需要域名备案，没备案 80/443 会被阻断。

## 自定义域名

1. 域名的 DNS 加一条 CNAME 指向 `dengkang336-glitch.github.io`（GitHub Pages）
2. 仓库 Settings → Pages → Custom domain 填域名，勾上 Enforce HTTPS
3. 等证书签发（几分钟到几小时）

配了自定义域名后，仓库根目录需要一个 `CNAME` 文件，里面只写域名（GitHub 会自动创建）。

## 国内访问与合规

- `*.github.io`、`*.workers.dev`、`*.vercel.app` 这些免费域名在国内都不稳定，正式对外用建议自有域名。
- 服务器在大陆境内 → 必须 ICP 备案；不备案用香港/海外服务器可以免备案，但国内访问延迟高。
- 只放纯静态笔记不会涉及经营性内容，但仍建议首页写明用途，避免被误判。

## 关于 SEO（现在的限制）

站点用 `#/xxx` 片段路由：所有内容都在同一个 `index.html` 里、靠 JS 切换。搜索引擎只会收录首页，**每个知识点不会有独立搜索结果**。

如果以后想让「Redis 是什么」这种词能搜到你：

1. **预渲染**：给每个知识点生成一份真实 HTML（`/frontend/ui/button/index.html`），用脚本批量生成最简单——本项目数据已经是结构化的，写个 Node 脚本读 `data/*.js` 套模板输出即可。
2. **改路由为真实路径**：`#/frontend/ui/button` → `/frontend/ui/button`，需要服务端把所有路径回落到 `index.html`（nginx 的 `try_files`、Pages 的 SPA 回落已经配了）。
3. 自动生成 `sitemap.xml`，提交到 Google Search Console / Bing。

这三步可以分开做，先做 1 就能被收录，2 是体验优化。

## 备份

仓库本身就是备份（GitHub 有一份，本地有一份）。想再保险一层：

```bash
git clone --mirror https://github.com/dengkang336-glitch/zhishiku.git ~/Backups/zhishiku.git
```

内容都在 `data/*.js` 纯文本里，就算网站代码坏了，笔记也不会丢。
