/*
 * sushine.xyz 站点配置
 * ------------------------------------------------------------
 * 唯一需要手工填写的文件。把各平台的真实链接填进 url 字段即可，
 * 留空（""）的条目会在页面上自动显示为「链接待补充」且不可点击。
 * 填完后直接 git push，Cloudflare Pages 会自动重新部署。
 *
 * 注意：请勿在此文件中填写任何密码、Token 或密钥。
 */
window.SITE_CONFIG = {
  owner: {
    name: "杨强",
    alias: "老杨 / Sun",
    tagline: "把复杂的事讲清楚",
    intro:
      "跨境电商创业者、企业数字化转型实践者、内容创作者。写认知、聊法律、做业务，也在认真把一件事从头做完整。",
    email: "qiangda68@163.com"
  },

  // 各平台链接：key 与 index.html 中的 data-link-key 一一对应
  links: {
    "accounts.bianju": {
      platform: "变局下老杨说",
      url: ""
    },
    "accounts.law": {
      platform: "老杨聊法",
      url: ""
    },
    "accounts.cognition": {
      platform: "老杨说认知",
      url: ""
    },
    "accounts.english": {
      platform: "每日英语一练",
      url: ""
    },
    "column.xiaobaotong": {
      platform: "小报童 · 认知专栏",
      url: ""
    },
    "community.zhishixingqiu": {
      platform: "知识星球",
      url: ""
    },
    "book.ai7": {
      platform: "《我把 AI 戒了七天》",
      url: ""
    },
    "book.digital": {
      platform: "《企业数字化转型落地》",
      url: ""
    }
  }
};
