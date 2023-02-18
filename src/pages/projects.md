---
layout: ../layouts/BlogLayout.astro
title: My Projects
---

## Lightest

- [Github Repo](https://github.com/zhangzheheng12345/Lightest)

An extremely light, header-only but meanwhile strong, flexible and customizable C++ unit test library. (C++11 required)

The library includes all the basic features of a unit test library, such as automatic test registration, assertions, and pretty output formatting.

Here is an instance of a test file using Lightest:

```cpp
#include "lightest/lightest.h"

TEST(Test) {
  REQ(1, ==, 1); // Pass
  REQ(1, ==, 2); // Fail
  SUB(SubTest) {
    SUB(SubSubTest) {
      REQ(1, ==, 1);
    }; // Semicolon required while defining sub tests
  };
}
```

Outputs go thus:

```
 BEGIN  Test
   FAIL  test.cpp:5: REQ [1 == 2] failed
      + ACTUAL: 1
      + EXPECTED: == 2
   BEGIN  SubTest
     BEGIN  SubSubTest
     PASS   SubSubTest 1ms
   PASS   SubTest 2ms
 FAIL   Test 3ms
Done. 5ms used.
```

Outputs should be colorful if your platform is Windows, Linux, or MacOS.

## FlowScript

- [Github Repo](https://github.com/zhangzheheng12345/flowscript)

An Go embeded interpreter of a functional programming language of **FlowScript** (created by myself).

This is my largest project (still it's small and simple).
I started it for learning interpreter & compiler technology, practising Go, and for fun.

Here I put a short FlowScript program:

<!-- highlight FlowScript as Ruby -->

```ruby
def fibonacci a b begin # Output the fibonacci sequence between 1 and 10000
    add a b > echoln -
    add a b > smlr - 10000 > if - begin
        add a b > fibonacci b -
    end
end
echoln "fibonacci begins ..."
fibonacci 1 1
```

## Visual Brainfuck Web

- [GitHub Repo](https://github.com/zhangzheheng12345/visual-brainfuck-web)
- Website at [visual-brainfuck-web.netlify.app](https://visual-brainfuck-web.netlify.app)

An online brainfuck interpreter with a limitless real-time visual memory.

I am a lover of Brainfuck, so I started this project to debug Brainfuck easier.

This project is written in Vue3.

## Birthday Count Downer

- [GitHub Repo](https://github.com/zhangzheheng12345/birthday-count-downer)
- Website at [birthday-count-downer.netlify.app](https://birthday-count-downer.netlify.app)

A simple birthday-counting-down machine written in Vue3.

## Sites List

- [GitHub Repo](https://github.com/zhangzheheng12345/sites-list)
- Website at [sites-list.netlify.app](https://sites-list.netlify.app)

A website with a list of useful websites for developers.

Different from awesome lists, it mainly provide a shortcut to the correct website when you're looking for an official website or document for a framework or library.
