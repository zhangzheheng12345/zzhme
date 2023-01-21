---
layout: ../../layouts/MainLayout.astro
title: A Guide on Web aninmtion
time: 2023.1.19
inProgress: true
---

## Immediate Libraries for CSS Animation

Some animation libraries provide CSS animation which you can use immediately. They fit most of the occasions.

### Animation.css

- [Official Website](https://animation.style)

A CSS animation libraries, providing various in/out and transition CSS animation. It's quite smoothy and simple to use, and convenient to be integrated to popular Frameworks such as Vue. At its offcial website, you can preview different amimations the library provided.

Here is an example:

```html
<h1 class="animate__animated animate__bounce">To bounce!</h1>
```

### Use Atomic CSS Libraries

If you just want to add style to one or to elements, ~~as a person with OCD,~~ you will certainly feel uncomfortable to specially create a single class or id selector for it (or them). So here I recommend atomic CSS, which enabling you to add styles in the class list 'atmocally', so that the expectation of CSS in HTML will be reached.

Here is an an instance of UnoCSS, and in fact most of the atomic CSS libraries shall be used smimlarly:

```html
<p class="c-red bg-gray-200 text-lg">
  Red, large paragraph with light gray background!
</p>
```

Popular CSS atomic CSS libraries include [Tailwind CSS](https://tailwindcss.com), [Windi CSS](https://windicss.org), and [UnoCSS](https://uno.antfu.me). These libraries themselves contains some atomic CSS class for animation, such as `bounce` etc.

To furtherly speaking, I individually think UnoCSS is the best among three above, and it's used in my personal website. UnoCSS is an open source project created by [Anthony Fu](https://antfu.me). Compared to Tailwind CSS and Windi CSS, it is more flexible, powerful and fast. UnoCSS generates CSS on demand, is highly customizable, and can be integrated to Vite immediately. But the core of UnoCSS is just an engine for atomic CSS, so before use, to load some presets which are offcially provided is required (this is quite simple); meanwhile, since the core of UnoCSS is an engine, interfaces are exposed directly, which makes customizing and extending fairly easy.

Besides its document (link provided above), You can also look into Anthony Fu's blog [Reimagine Atomic CSS](https://antfu.me/posts/reimagine-atomic-css) or visit [GitHub repo of UnoCSS](https://github.com/unocss/unocss) to learn more about UnoCSS.

**STILL IN PROGRESS**