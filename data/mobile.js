/* 移动端 大类内容 */
window.KB = window.KB || {};

window.KB.mobile = {
  id: "mobile",
  title: "移动端开发",
  summary: "做手机 App：iOS、Android，或用网页技术做跨平台 App。",
  tags: ["移动端", "app", "ios", "android", "手机", "跨平台"],
  what: "移动端就是做手机上的 App。三条主要路线：原生 iOS（Swift）、原生 Android（Kotlin）、跨平台（一套代码同时出 iOS 和 Android）。选哪条主要看：要几个平台、性能要求、团队会什么。",
  children: [
    // ================= 原生开发 =================
    {
      id: "mobile.native",
      title: "原生开发",
      summary: "用苹果/谷歌官方语言，为一个平台专门开发。",
      tags: ["原生", "native", "swift", "kotlin", "性能"],
      what: "原生开发用平台官方语言和工具（iOS 用 Swift + Xcode，Android 用 Kotlin + Android Studio），性能和体验最好，能用上所有系统能力，但两个平台要各写一套。",
      children: [
        {
          id: "mobile.native.ios",
          title: "iOS（Swift / SwiftUI）",
          summary: "苹果官方语言，只做 iPhone/iPad。",
          tags: ["ios", "swift", "swiftui", "苹果", "iphone"],
          what: "iOS 开发用 Swift 语言 + SwiftUI（新式声明式界面）或 UIKit（老式）。只能在 Mac 上用 Xcode 开发，需要每年 99 美元开发者账号才能上架 App Store。",
          useWhen: ["只做 iOS、追求最佳体验", "需要深度用系统能力（健康数据、蓝牙、相机）"],
          avoidWhen: ["要做 Android 就要再写一套", "没有 Mac 没法开发"],
          examples: ["iPhone/iPad App", "需要上架 App Store 的产品", "Apple Watch 配套 App"],
          code: `// SwiftUI：一个简单的界面
import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("你好，世界")
            .font(.title)
    }
}`,
          codeLang: "swift",
        },
        {
          id: "mobile.native.android",
          title: "Android（Kotlin / Compose）",
          summary: "谷歌官方语言，只做安卓手机。",
          tags: ["android", "kotlin", "compose", "安卓", "谷歌"],
          what: "Android 开发用 Kotlin + Jetpack Compose（新式界面）。开发工具免费，上架 Google Play 一次性 25 美元。Windows/Mac/Linux 都能开发。",
          useWhen: ["只做 Android、追求原生体验", "国内安卓用户占比高的产品"],
          avoidWhen: ["要做 iOS 就要再写一套"],
          examples: ["安卓 App", "需要上架 Google Play 的产品", "国内安卓渠道分发"],
          code: `// Jetpack Compose：一个简单的界面
@Composable
fun Greeting() {
    Text(text = "你好，世界")
}`,
          codeLang: "kotlin",
        },
      ],
    },

    // ================= 跨平台 =================
    {
      id: "mobile.cross",
      title: "跨平台方案",
      summary: "一套代码，同时出 iOS 和 Android。",
      tags: ["跨平台", "flutter", "react native", "一套代码"],
      what: "跨平台方案让你写一套代码，编译出 iOS 和 Android 两个 App（有时还能出网页/桌面版）。省一半工作量，代价是极端性能场景或深度系统能力可能受限。",
      children: [
        {
          id: "mobile.cross.rn",
          title: "React Native",
          summary: "用 React 写手机 App，前端背景最容易上手。",
          tags: ["react native", "rn", "react", "javascript", "跨平台"],
          what: "React Native 用 React 的写法写 App，界面渲染成真正的原生控件。会 React 的人几乎可以无缝转过来，生态大、社区活跃。",
          useWhen: ["团队会 React", "需要同时出 iOS + Android", "想复用前端技能"],
          avoidWhen: ["极复杂的动画/性能敏感场景可能需要写原生代码"],
          examples: ["中型 App", "MVP 快速验证", "前端团队转型做 App"],
          code: `// React Native：一个简单界面
import { View, Text } from "react-native";

export default function App() {
  return (
    <View>
      <Text>你好，世界</Text>
    </View>
  );
}`,
          codeLang: "jsx",
        },
        {
          id: "mobile.cross.flutter",
          title: "Flutter",
          summary: "Google 出品，自己画界面，两个平台一模一样。",
          tags: ["flutter", "dart", "google", "跨平台", "ui 一致"],
          what: "Flutter 用 Dart 语言，自己绘制界面（不转成原生控件），所以在 iOS 和 Android 上长得完全一样，动画流畅。近年非常流行。",
          useWhen: ["要求两个平台 UI 完全一致", "复杂动画、自定义界面"],
          avoidWhen: ["要学新语言 Dart", "需要极小的包体积"],
          examples: ["设计感强的 App", "需要高度定制 UI", "同时上 iOS/Android/Web"],
          code: `// Flutter：一个简单界面
import 'package:flutter/material.dart';

void main() => runApp(
  MaterialApp(
    home: Center(child: Text('你好，世界')),
  ),
);`,
          codeLang: "dart",
        },
        {
          id: "mobile.cross.webview",
          title: "混合开发（WebView）",
          summary: "把网页包成 App，门槛最低但体验一般。",
          tags: ["混合", "webview", "h5", "cordova", "套壳"],
          what: "混合开发就是把做好的网页装进一个 App 壳里（WebView）。会用前端技术就能出 App，但流畅度和原生差距明显，现在多用在中后台、内容展示类 App。",
          useWhen: ["已有网页版、想快速出个 App", "内容展示为主、交互不复杂"],
          avoidWhen: ["对流畅度、复杂交互有要求的 C 端产品体验会明显吃亏"],
          examples: ["把官网包成 App", "企业内部工具", "内容类 App"],
          codeLang: "text",
        },
      ],
    },

    // ================= App 相关能力 =================
    {
      id: "mobile.capability",
      title: "App 常见能力",
      summary: "做 App 绕不开的这些事：上架、推送、内购、本地存储。",
      tags: ["上架", "推送", "内购", "本地存储", "app store"],
      what: "做一个能真正上线的 App，除了写界面，还要处理：怎么发布到应用商店、怎么给用户发推送、怎么收钱（内购）、数据存哪（本地）。",
      children: [
        {
          id: "mobile.capability.store",
          title: "应用商店上架",
          summary: "把 App 提交审核，通过后用户才能下载。",
          tags: ["上架", "app store", "google play", "审核", "发布"],
          what: "App 不能直接给别人装，要走应用商店审核。iOS 只能走 App Store（需 99 美元/年开发者账号），Android 可以走 Google Play 或国内各应用商店（华为、小米、OPPO、vivo 等，国内通常要软著或备案）。",
          useWhen: ["任何要发给用户用的 App"],
          avoidWhen: ["测试阶段可以用 TestFlight（iOS）、内测分发代替"],
          examples: ["App Store 审核（通常 1-3 天）", "Google Play 审核", "国内应用商店（要软著）", "TestFlight 内测"],
          codeLang: "text",
        },
        {
          id: "mobile.capability.push",
          title: "消息推送（Push）",
          summary: "App 不在前台也能给用户发通知。",
          tags: ["推送", "push", "通知", "apns", "fcm"],
          what: "推送让 App 即使没打开也能给用户弹通知。iOS 走 APNs（苹果推送服务），Android 走 FCM（谷歌）或国内厂商通道（小米/华为/OPPO/vivo 各自一套，很麻烦）。",
          useWhen: ["需要提醒用户（消息、订单、活动）"],
          avoidWhen: ["别滥用推送，用户会关掉甚至卸载"],
          examples: ["聊天消息通知", "订单状态提醒", "营销活动推送"],
          codeLang: "text",
        },
        {
          id: "mobile.capability.iap",
          title: "应用内购买（IAP）",
          summary: "在 App 里卖东西收钱。",
          tags: ["内购", "iap", "支付", "订阅", "app store"],
          what: "如果卖的是「App 内的虚拟内容」（解锁功能、会员、道具），苹果/谷歌强制要求走他们的内购（抽成 15-30%）。卖实体商品可以用微信/支付宝等其他支付。",
          useWhen: ["App 内卖虚拟内容/订阅"],
          avoidWhen: ["卖实体商品不要用 IAP（抽成高），用第三方支付"],
          examples: ["解锁高级功能", "订阅会员", "买虚拟币/道具"],
          codeLang: "text",
        },
        {
          id: "mobile.capability.storage",
          title: "本地存储",
          summary: "App 在手机上存数据。",
          tags: ["本地存储", "数据库", "sqlite", "偏好", "缓存"],
          what: "App 需要在本机存一些数据：用户设置（偏好）、离线内容、缓存。常用方式：键值存储（存少量配置）、SQLite（结构化数据）、文件。",
          useWhen: ["App 需要离线可用、记住设置、缓存数据"],
          examples: ["记住登录状态", "离线缓存文章", "用户偏好设置", "本地草稿"],
          codeLang: "text",
        },
        {
          id: "mobile.capability.permission",
          title: "权限申请",
          summary: "用相机、定位、通讯录前要问用户同意。",
          tags: ["权限", "permission", "相机", "定位", "隐私"],
          what: "App 要访问相机、相册、定位、麦克风、健康数据等，必须先弹窗申请用户授权。用户拒绝就不能用，所以要想清楚「什么时候问、为什么问」。",
          useWhen: ["任何需要系统敏感能力的 App"],
          avoidWhen: ["别一打开 App 就一次性要一堆权限（用户会拒绝甚至卸载），用到时再问"],
          examples: ["拍照要相机权限", "导航要定位权限", "录音要麦克风权限"],
          codeLang: "text",
        },
      ],
    },
  ],
};
