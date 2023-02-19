---
layout: ../../layouts/BlogLayout.astro
title: Auto Registering Functions to be Run in C++
time: 2023.2.19
inProgress: true
---

Registering functions automically is quite a common-used tech especially in C/C++ unit testing framework. Certainly you won't feel happy to write such code:

```cpp
#include <ugly_unit_testing.hpp>

TEST(Test1) {
  ASSERT_EQ(1, 1);
}
TEST(Test2) {
  ASSERT_EQ(1, 2);
}

int main() {
  Run(Test1);
  Run(Test2);
  return GetFinalResult();
}
```

Instead, what you expect is:

```cpp
#include <pretty_unit_testing.hpp>

TEST(Test1) {
  ASSERT_EQ(1, 1);
}
TEST(Test2) {
  ASSERT_EQ(1, 2);
}

// No main function or just a fixed one
int main() {
  Init();
  return RunAllTests(); // Test functions auto registered -- one call for all
}
```

So here I would like to share a possible method which can accomplish the second -- auto registration, so that one call for all.

I might use lambda function and the template class of `function`, so C++11 is required.

## Basic Auto Registering Method

We will use a macro of `TEST(name)` to define a test. So how will it work inside?

First let's realise the ugly one that is mentioned above. A code block is followed after `TEST(name)`, so the macro should contain a header of the testing function:

```cpp
#define TEST(name) void name()

// Then use it
// Will define a function called 'name' with code blocks followed
TEST(Test) {
  // ...
}
```

However, we need the function to be auto registered to somewhere. So we use the declare-register-define method:

```cpp
#define TEST(name)                                           \
  void name(); /* Make 'name' available before definition */ \
  /* Registering the function of 'name' */                   \
  void name()
```

Because function calling and common sentence running aren't allowed in global field, we cannot run registering code directly. Instead, since global objects are constructed before `main()` is called, we depend on the constructing function of global object to have auto registration:

```cpp
class Registering {
 public:
  Registering(void (*func)()) {
    // Actually do registration here
  }
};

#define TEST(name)                                           \
  void name();                                               \
  /* Define a single regustering object for each function */ \
  Registering registering_ ## name (name);                   \
  void name()
```

Then we define a static list that will hold those functions:

```cpp
#include <vector>

class Registering {
 public:
  Registering(void (*func)()) {
    funcList.push_back(func);
  }
  static bool RunAllTests() {
    for(void (*name)() : funcList)
      funcList();
    return false; // Later change this
  }
 private:
  static std::vector<void()> funcList;
}
std::vector<void()> funcList(0);

// Some tests
// Then in main:
int main() {
  return Registering::RunAllTests();
}
```

We will also define a class to collect test data, so that we can return `false` (`0`) when tests all passed, and return `true` (`1`) when there is failure. Later I will explain why we might need a specific class instead of just make the test function return `true` or `false`. So the final code should be...

```cpp
#include <vector>

class Testing {
 public:
  void Fail() { failed = true; }
  bool GetFailed() const { return failed; }
 private:
  bool failed = false;
}
#define ASSERT_EQ(value1, value2)                     \
  do {                                                \
    if(value1 != value2) {                            \
      /* Some outputs */                              \
      testing.Fail(); /* Set the test to be failed */ \
    }                                                 \
  } while(0)

class Registering {
 public:
  Registering(void (*func)(Testing&)) { // Each test func will hold a testing object for data collecting etc.
    funcList.push_back(func);
  }
  static bool RunAllTests() {
    std::vector<Testing> testDataList(funcList.size());
    unsigned int index = 0;
    bool failed = false;
    for(void (*name)(Testing&) func : funcList) {
      func(testDataList.at(index));
      failed |= testDataList.at(index).GetFailed(); // Collect failure
    }
    return failed;
  }
 private:
  static std::vector<void(Testing&)> funcList;
}
std::vector<void(Testing&)> Registering::funcList(0);
#define TEST(name)                                           \
  void name(Testing& testing);                               \
  Registering registering_ ## name (name);                   \
  void name(Testing& testing)

// Some tests:
TEST(Test1) {
  ASSERT_EQ(1, 1);
}
TEST(Test2) {
  ASSERT_EQ(1, 2);
}

// Then in main:
int main() {
  return Registering::RunAllTests();
}
```
