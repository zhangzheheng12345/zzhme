---
layout: ../../layouts/MainLayout.astro
title: Web动画指南
time: 2023.1.19
---

动画可以提高网站逼格并且让网站异常丝滑，但显然使用Web动画没那么简单。由于想要在个人网站的主页上加一些炫酷的动画来提高一点点逼格，于是我开始了漫长的探索Web动画的旅程……Let's go！

## 开箱即用的用于HTML元素的CSS动画

一些动画库提供了开箱即用的CSS动画，它们能应付大部分的的情况。

### Animation.css

* [官网](https://animation.style)

一个CSS预设动画库，提供了丰富的in/out以及过渡CSS动画，非常丝滑且易用，并且可以和Vue等框架方便地组合。在官网可以选择不同的动画样式预览。

下面是一个实例：

```html
<h1 class="animate__animated animate__bounce">To bounce!</h1>
```

### 使用原子化CSS库

如果你只是希望给一两个元素添加样式，有强迫症的你肯定不想给它（们）专门写一个class或者id选择器然后加样式，并且还要在不同的文件或者同一文件的不同位置切来切去。那么向你推荐原子化CSS，你可以在class列表里面直接“原子化地”添加样式，从而达到CSS in HTML。

这是一个UnoCSS实例，大多数原子化CSS库用起来都长这样：

```html
<p class="c-red bg-gray-200 text-lg">
  Red, large paragraph with light gray background!
</p>
```

成熟的、流行的原子化CSS库有[Tailwind CSS](https://tailwindcss.com)（[中文官网](https://www.tailwind.cn)），[Windi CSS](https://windicss.org)，还有[UnoCSS](https://uno.antfu.me)。它们本身都自带一些原子化CSS动画类，例如`bounce`等等。

进一步地，上三者中个人认为UnoCSS最为好用，它是Anthony Fu大佬的开源项目。它相较于Tailwin CSS 和Windi CSS，更加灵活、强大、高性能，能做到按需生成、高度定制，同时可以和Vite立刻集成。但UnoCSS的核心本身只是一个原子化CSS引擎，所以需要配合官方给出的一些预设（presets）来达到快速上手、开箱即用（这个过程相当简单）；同时既然UnoCSS的核心是一个引擎，接口就会直接暴露，定制和扩展就会非常容易。

### Animista.net

* [网站](https://animista.net)

一个CSS动画playground，有大量的预设CSS动画，非常丝滑，并且可以直接自定义各种参数。你可以直接拷贝源代码，或者选择多个动画动画下载CSS整个文件。但使用它会存在项目中CSS代码量疯狂膨胀的情况，同时直接把这些机器生成的CSS塞进项目里、不利用NPM等的生态集成，显然不算很优雅的解决方案。

我的一个项目：生日倒数器，就是用了Animista.net添加了异常丝滑的动画。你可以访问[生日倒数器网站](https://birthday-count-downer.netlify.app)来看看Animista.net提供的动画的实例。

## 直接手写CSS动画？你需要CSS预处理器的帮助！

你可以使用`@keyframes`直接手写CSS动画，参见[MDN](https://developer.mozilla.org)提供的详细文档。另外HTML元素直接变换样式时，也可以用`transition`来实现样式过渡，详见MDN。

但众所周知，CSS`@keyframes`是用关键帧实现动画的，而关键帧之间是粗暴生硬地直接由浏览器完成线性过渡，所以漂亮的动画就必须要daliang关键帧才能看上去丝滑。这就劝退了我在内的一些人直接手写丝滑的CSS，各种尝试之后我终于发现借助CSS预处理器似乎才是最佳方案。

利用循环、计算、套上自己的动画曲线函数，你就可以让CSS预处理器自动生成符合你想要的速度变化的一长串关键帧，进而无比丝滑，同时源代码量不膨胀。成熟而流行的CSS预处理器有[SASS](https://sass-lang.com)（[中文官网](https://www.sass.hk)），[LESS](https://lesscss.org)（[中文官网](https://less.bootcss.com)），以及[Stylus](https://stylus-lang.com)（[中文官网](https://www.stylus-lang.cn)）。其中LESS不内置循环，需要用递归写法来代替。（上三者个人更推荐Stylus，因为非常简洁、灵活、强大）

以下是一个基于Stylus的实例，div将会匀加速向右移动：

```html
<div class="box lengthen"></div>
```

```stylus
.box
  width: 10px
  height: 10px
  animation: lengthen 5s
 
@keyframes lengthen
  for i in 0..10
    {10% * i}
      transform: translate(i*i, 0)
```

**STILL IN PROGRESS**