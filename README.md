# sushine.xyz 站点源码

个人品牌内容站的纯静态源码，零依赖、零构建，可直接部署到 Cloudflare Pages。

## 目录结构

| 文件 | 作用 |
|---|---|
| `index.html` | 单页首页：首屏 / 内容矩阵 / 专栏社群 / 出版与项目 / 业务 / 联系 |
| `style.css` | 全站样式，含响应式断点（900px / 600px） |
| `main.js` | 注入配置文案、按配置启用卡片链接、填充页脚年份 |
| `site.config.js` | **唯一需要手工维护的文件**：姓名、简介、邮箱、各平台外链 |
| `404.html` | 自定义 404 页 |
| `.gitignore` | 忽略系统垃圾文件 |

## 本地预览

直接双击 `index.html` 即可；或启动本地服务（更接近线上环境）：

```bash
cd sushine-site
python -m http.server 8080
# 浏览器打开 http://localhost:8080
```

## 待填写清单（上线前必做）

所有链接集中在 `site.config.js` 的 `links` 中。留空（`""`）的条目，页面上会自动显示为「链接待补充」且不可点击，不会出现死链。

| 配置键 | 对应平台 | 到哪里取链接 |
|---|---|---|
| `accounts.bianju` | 变局下老杨说 | 抖音 / 视频号主页 → 分享 → 复制链接 |
| `accounts.law` | 老杨聊法 | 同上 |
| `accounts.cognition` | 老杨说认知 | 同上 |
| `accounts.english` | 每日英语一练 | 同上 |
| `column.xiaobaotong` | 小报童认知专栏 | 小报童专栏页公开链接 |
| `community.zhishixingqiu` | 知识星球 | 星球主页 / 邀请链接 |
| `book.ai7` | 《我把 AI 戒了七天》 | 有落地页后再填 |
| `book.digital` | 《企业数字化转型落地》 | 有落地页后再填 |

> `works` 区块中有两行没有配置键：目前仅为文字展示。若后续需要挂链接，在 `index.html` 的对应 `.row` 上加 `data-link-key`，并在配置里补一条即可。

同时建议核对 `owner` 中的 `tagline` 与 `intro` 是否符合当前口径。

## 部署到 Cloudflare Pages

前提：域名 `sushine.xyz` 已接入 Cloudflare（NS 已改为 Cloudflare 分配的两个 nameserver，站点状态为 Active）。

1. GitHub → `https://github.com/new` → 新建仓库 `sushine-site`，设为 Public 或 Private 均可，不要勾选初始化文件。
2. 本地推送：
   ```bash
   cd sushine-site
   git init
   git add .
   git commit -m "init: sushine.xyz personal site"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/sushine-site.git
   git push -u origin main
   ```
3. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → 授权 GitHub 并选择该仓库。
4. 构建配置（**关键，不要填错**）：

   | 字段 | 值 |
   |---|---|
   | Production branch | `main` |
   | Framework preset | `None` |
   | Build command | 留空 |
   | Build output directory | `/` |
   | Root directory | 留空 |

5. 保存并部署，得到 `sushine-site.pages.dev` 预览地址，先确认预览站正常。
6. Pages 项目 → **Custom domains** → **Set up a custom domain** → 依次添加：
   - `sushine.xyz`（apex / 根域）
   - `www.sushine.xyz`

   Cloudflare 会自动下发所需 DNS 记录并签发免费 SSL 证书，无需在阿里云购买证书。
7. 建议在 **Rules → Redirect Rules** 里把 `www` 与 apex 统一 301 到其中一个（避免两个地址分散权重）。若做不到，至少保证两者都能正常访问。
8. 验证：
   ```bash
   curl -I https://sushine.xyz
   curl -I https://www.sushine.xyz
   nslookup -type=NS sushine.xyz 8.8.8.8
   ```

## 后续更新

改 `site.config.js` 或任意文件 → `git push` → Cloudflare Pages 自动重新部署，通常 1 分钟内生效。无需重建、无需手动上传。

## 合规提示

- 站点托管在 Cloudflare Pages（境外节点），使用自定义域名**不需要**国内 ICP 备案；若未来迁回阿里云等国内服务器并提供公开访问，则需按规备案。
- 页面底部已声明「内容与观点仅代表个人，不构成投资或法律建议」，涉及法律、投资类内容时建议保留。
- `site.config.js` 中**不要**写入任何密码、API Token 或密钥，该文件会随源码公开。
