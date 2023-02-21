---
layout: ../../layouts/BlogLayout.astro
title: Auto Registering Functions in C++
time: 2023.2.19
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

So here I would like to share a possible method which can accomplish the second -- auto registration, so that one call for all. Actually the purpose of this artcle is to introduce a way to accomplish auto registering functions, and will take unit testing as an example, but the strategy can be applied to diffenrent situation practically.

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
      failed = failed || testDataList.at(index).GetFailed(); // Collect failure
    }
    return failed;
  }
 private:
  static std::vector<void(Testing&)> funcList;
}
std::vector<void(Testing&)> Registering::funcList(0);
#define TEST(name)                         \
  void name(Testing& testing);             \
  Registering registering_ ## name (name); \
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

## Registering Functions inside Functions (Sub Registration)

We would like to add sub tests. This requires the feature of auto registering functions inside functions instead of in global scope, whose accomplishment is different.

Let's look at our expectations first:

```cpp
TEST(BaseTest) {
  // Define a sub test -- also auto registered
  // Automically called when base test is run
  SUB(SubTest) {
    ASSERT_EQ(1, 1);
  };
}
```

My strategy is to keep a 'registering center' in every test, and more generally also in global scope.

Pick out the list of registered functions to a new class for such a 'center', and only leave `class Registering` for the registration of global functions. Then add the 'center' as an argument of the testing function, which the sub tests register to, and iterate it calling those registered sub tests when the base test is done:

```cpp
#include <function> // Important: to fit both basic functions and lambdas

// New 'center'
class Register {
 public:
   void Add(std::function<void(Testing&, Register&)> func) {
     funcList.push_back(func);
   }
   bool RunAllTests() {
    std::vector<Testing> testDataList(funcList.size());
    unsigned int index = 0;
    bool failed = false;
    for(std::function<void(Testing&, Register&)> func : funcList) {
      Register reg;
      func(testDataList.at(index), reg);
      // Also should run & include the result from sub tests
      failed = failed || testDataList.at(index).GetFailed() || reg.RunAllTests();
    }
    return failed;
  }
 private:
  std::vector<std::function<void(Testing&, Register&)>> funcList;
};
Register globalReg;

// Now this is merely for registering global functions
class Registering {
 public:
  Registering(std::function<void(Testing&, Register&)> func) {
    globalReg.Add(func);
  }
};

// New main:
int main() {
  return globalReg.RunAllTests();
}
```

Then update macro of `TEST` and add the macro for defining sub tests, after definition of `TEST`:

```cpp
#define TEST(name)                            \
  void name(Testing& testing, Register& reg); \
  Registering registering_ ## name (name);    \
  void name(Testing& testing, Register& reg)

#define SUB(name)                                            \
  static std::function<void(Testing&, Register&)> name;      \
  reg.Add([&name](Testing& t, Register& r) { name(t, r); }); \
  name = [=](Testing& testing, Register& reg)
```

Analyzing details:

* Use standard library of `function`, since function poiter is merely for global functions, and for those lambda functions in smaller scope, meanwhile carrying outside context, they are in other types. Use `function<...>` to unify the situations.
* Use lambda funcions for sub tests, since it's the only way to define functions inside functions. Besides, use 'caller stategy' for sub tests, because, as you can see, the functions of sub test is actually set after the registration, so we have to register a 'caller agency' as a middle preson.
* Pay attention to the life cycle problem. The sub test function is called after the base test function returns, so its life cycle should be longer. Make it simpler; let's just declare it as `static` so that it will stay alive in all time.

Now the auto registration of sub test can work well!

## Conclusion

Here I provide a simple way to accomplish auto function registration & auto running. Remove those about unit testing, such as the failure collecting, and you'll meanwhile get a general way to apply this system to various situations.

My unit testing framework, [Lightest](https://github.com/zhangzheheng12345/Lightest), is a practice of this. It also own a more deeply use of 'caller strategy', realizing a unified combination of configuration, testing, data analyzing, and multi-thread testing. Welcome to look at this project, and also think of & remark the design mode inside it!
