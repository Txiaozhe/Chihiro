---
title: ShadowNode 源码解析之 module
date: 2018-12-20 20:03:15
abstract: ShadowNode 源码解析以及我个人的一些理解
categories:
- JavaScript
tags:
- ShadowNode
- Nodejs
---
> ShadowNode 是一款可以运行于嵌入式设备的js运行时，基于Samsung的[iotjs](https://github.com/Samsung/iotjs)项目开发，和node相比，其具有更小的内存占用和更快的启动速度，不过作为contributor之一，给我很直观的感受就是ShadowNode具有极快的编译速度，开发起来也更加顺畅。我从2018年10月开始利用业余时间参与ShadowNode的开发和维护，为其提交了数个补丁和特性，因此也逐渐对其有了一定的了解，在此我将对ShadowNode从源码的角度对其进行解析以及我个人对ShadowNode的一些疑惑和思考。因为大部分实现与node一致，而且团队也一直希望将ShadowNode做到与node兼容，因此此解析也适用于理解node源码。在此也希望ShadowNode能越来越普及，并为node社区开拓一片新的领域。

本文主要讲述ShadowNode中`module`模块的实现。`module`是node中最重要的模块之一，在ShadowNode中也是如此。和node一样，ShadowNode也支持`CommonJS`的模块形式，实现方式略有不同，但使用方式与node基本一致。

`module`模块在node和ShadowNode中的重要性不言而喻，从启动时便要用于加载脚本。废话不多说，接下来先解析一波源码，我们从入口文件`ShadowNode/src/js/iotjs.js`（为什么还要叫iotjs呢？其实我一直想向团队建议改个名字，比如snode啥的@yorkie:) ）开始，这里面包含了一个IIFE的函数，`ShadowNode/src/js/iotjs.js` line: 23

```javascript
function Module(id) {
    this.id = id;
    this.exports = {};
}

Module.cache = {};
Module.require = function(id) {
    if (id === 'native') {
      return Module;
    }

    if (Module.cache[id]) {
      return Module.cache[id].exports;
    }

    var module = new Module(id);

    Module.cache[id] = module;
    module.compile();

    return module.exports;
};
```

可以看到这里定义了一个`Module`类，但这还不是我们日常使用的那个`module`模块，这里进行了`if (id === 'native')`的判断，后面会用到，然后从缓存中获取模块，我们可以看到不管是node还是ShadowNode，缓存的概念都是一以贯之的，这极大地提升了模块加载的性能，最后将模块返回。而后移到`ShadowNode/src/js/iotjs.js` line: 51

```javascript
var module = Module.require('module');
```

这里调用了上述`Module`类的`require`静态方法来加载真正的`module`模块所在地：`ShadowNode/src/js/module.js`，并运行`compile`成员方法，里面会调用`process.compileModule()`方法，这是用c代码实现的内置`process`模块，在此我不详细讲述`process`的内容，之后会用专门的篇幅进行解析。`compileModule()` 用于将模块载入内存，成为运行时的一部分，也就可以用于运行与调用了。简单来说，这入口文件主要执行了诸如：`ShadowNode/src/js/iotjs.js` line: 384

```javascript
global.console = Module.require('console');
global.Buffer = Module.require('buffer');
global.Promise = Module.require('promise');
```

以及：`ShadowNode/src/js/iotjs.js` line: 496

```javascript
process.exit = function(code) {
    ...
```

等我们熟悉的全局模块、方法以及常量的定义与加载操作，为系统启动做足准备工作，但这不是我们现在所关心的，因此移步至

`ShadowNode/src/js/iotjs.js` line: 603

```javascript
var m = Module.require('module');
m.runMain();
```

这里再次加载了一个上述真正的`module`模块实现文件并执行了其静态的`runMain`方法，因此我们移步至`ShadowNode/src/js/module.js`：line: 335

```javascript
iotjs_module_t.runMain = function() {
  if (process.debuggerWaitSource) {
    var fn = process.debuggerSourceCompile();
    fn.call();
  } else {
    var filename = mainModule.filename = process.argv[1];
    mainModule.exports = iotjs_module_t.load(filename, null);
  }
  while (process._onNextTick());
};
```

我们现在着重关注以下代码：

```javascript
var filename = mainModule.filename = process.argv[1];
mainModule.exports = iotjs_module_t.load(filename, null);
```

这里将`process.argv[1]`所指代的变量作为文件名，也就是当执行`$ iotjs xxx.js`时需要加载的文件，也就是说这里会加载用户指定的文件进行解析并运行，紧接着调用`iotjs_module_t.load(filename, null);`来执行加载操作，看一下`load`方法的实现：

`ShadowNode/src/js/module.js`：line: 220

```javascript
iotjs_module_t.load = function(id, parent) {
  if (process.builtin_modules[id]) {
    iotjs_module_t.curr = id;
    return Native.require(id);
  }
  var module = new iotjs_module_t(id, parent);
  var modPath = iotjs_module_t.resolveModPath(module.id, module.parent);

  var cachedModule = iotjs_module_t.cache[modPath];
  if (cachedModule) {
    iotjs_module_t.curr = modPath;
    return cachedModule.exports;
  }

  if (!modPath) {
    throw new Error('Module not found: ' + id);
  }

  var stat = process._loadstat();
  var startedAt;
  if (stat) {
    startedAt = Date.now();
  }

  module.filename = modPath;
  module.dirs = [modPath.substring(0, modPath.lastIndexOf('/') + 1)];
  iotjs_module_t.cache[modPath] = module;
  iotjs_module_t.curr = modPath;

  var ext = modPath.substr(modPath.lastIndexOf('.') + 1);
  if (ext === 'jsc') {
    module.compile(true);
  } else if (ext === 'json') {
    var source = process.readSource(modPath);
    module.exports = JSON.parse(source);
  } else if (ext === 'node') {
    var native = process.openNativeModule(module.filename);
    module.exports = native;
  } else {
    /** Treat any other file as js file */
    module.compile();
  }

  if (stat) {
    var relPath = modPath.replace(cwd, '');
    var consume = Math.floor(Date.now() - startedAt);
    console.log(`load "${relPath}" ${consume}ms`);
  }
  return module.exports;
};
```

这个方法也是全局`require`方法所执行的模块加载操作，其中的加载流程和node相同，首先查询是否是内置模块，如果是，则直接返回内置模块，如果不是，则解析模块名，并对缓存进行查询，这里使用绝对路径作为缓存存储的键以避免重复缓存，如果缓存中存在，则直接返回，否则解析模块文件并加载，这里会识别`jsc`、`json`、`node`的文件以使用对应方式进行解析，否则，其他文件都将作为`js`文件进行解析。最终将`module.exports`返回。至此，模块就被加载了。

那么问题来了，全局的`require`函数是怎么就能直接使用了呢？这也是我刚开始看源代码时心中所带的问题。到现在好像也没有看到有相关的操作，那接下就可以分析一下上述代码的`compile`方法了！以下是`compile`成员方法的实现：`ShadowNode/src/js/module.js`：line: 272

```js
function _makeRequireFunction(mod) {
  var Module = mod.constructor;
  function require(id) {
    return mod.require(id);
  }

  function _resolve(request) {
    if (!request || typeof request !== 'string') {
      throw new TypeError('module must be a non-null string');
    }

    if (process.builtin_modules[request]) {
      return request;
    }

    var path = Module.resolveModPath(request, mod);
    if (!path) {
      throw new Error('Module not found: ' + request);
    }
    return path;
  }
  require.resolve = _resolve;
  require.main = mainModule;
  require.cache = Module.cache;

  return require;
}


iotjs_module_t.prototype.compile = function(snapshot) {
  var __filename = this.filename;
  var __dirname = path.dirname(__filename);
  var fn;
  if (!snapshot) {
    fn = process.compile(__filename);
  } else {
    fn = process.compileSnapshot(__filename);
    if (typeof fn !== 'function')
      throw new TypeError('Invalid snapshot file.');
  }

  var _require = _makeRequireFunction(this);

  fn.apply(this.exports, [
    this.exports,             // exports
    _require,                 // require
    this,                     // module
    undefined,                // native
    __filename,               // __filename
    __dirname                 // __dirname
  ]);
};
```

这里并没有很复杂的实现，通过`process.compile(__filename)`和`process.compileSnapshot(__filename)`创建运行的事例，并组装好`require`等参数，通过`fn.apply(...)`将`exports`、`require`、`module`、`__filename`等我们熟悉的全局函数和对象传入，至此，我们最熟悉的那些模块函数也就可以用了。不过到此为止，好像还缺了点什么，对，还没说ShadowNode模块是怎么寻址的呢！这里我们从`iotjs_module_t.resolveModPath(...)`方法开始，这个方法在`iotjs_module_t.load(...)`和`require.resolve(...)`方法中用于模块寻址：

`ShadowNode/src/js/module.js`：line: 166

```javascript
iotjs_module_t.resolveModPath = function(id, parent) {
  if (parent != null && id === parent.id) {
    return false;
  }

  var filepath = false;
  if (id[0] === '/') {
    filepath = iotjs_module_t._resolveFilepath(id, false);
  } else if (parent === null) {
    filepath = iotjs_module_t._resolveFilepath(id, cwd);
  } else if (id[0] === '.') {
    var root = path.dirname(parent.filename);
    filepath = iotjs_module_t._resolveFilepath(id, root);
  } else {
    var dirs = iotjs_module_t.resolveDirectories(id, parent);
    filepath = iotjs_module_t.resolveFilepath(id, dirs);
  }

  if (filepath &&
    (filepath.indexOf('./') > 0 || filepath.indexOf('../') > 0)) {
    return iotjs_module_t.normalizePath(filepath);
  }
  return filepath;
};
```

`parent`是指调用目标模块的模块，也属于`module`的实例，而后根据模块路径的形式和传入的`parent`值指定模块寻址的起点，比如当`parent === null`时传入`cwd`作为寻址起点，也就是脚本运行的当前目录。接下来是`iotjs_module_t._resolveFilepath(...)`：`ShadowNode/src/js/module.js`：line: 129

```javascript
iotjs_module_t._resolveFilepath = function(id, root, ext_index) {
  var modulePath = root ? path.join(root, id) : id;
  var filepath;
  var exts = ['.js', '.json', '.node'];
  if (ext_index === undefined) {
    ext_index = 0;
  }

  // id[.ext]
  if (filepath = tryPath(modulePath, exts[ext_index])) {
    return filepath;
  }

  // id/index[.ext]
  if (filepath = tryPath(modulePath + '/index', exts[ext_index])) {
    return filepath;
  }

  // 3. package path id/
  var jsonpath = modulePath + '/package.json';
  filepath = iotjs_module_t.tryPath(jsonpath);
  if (filepath) {
    var pkgSrc = process.readSource(jsonpath);
    var pkgMainFile = JSON.parse(pkgSrc).main;

    // pkgmain[.ext]
    if (filepath = tryPath(modulePath + '/' + pkgMainFile, exts[ext_index])) {
      return filepath;
    }
  }
  ext_index++;
  if (ext_index < exts.length) {
    return iotjs_module_t._resolveFilepath(id, root, ext_index);
  }
};
```

此函数将目标模块的路径进行组合并尝试读取模块文件，在这里会识别`js`、`json`、`node` 三种格式的文件以及`index.*`默认文件，若读取失败，则尝试读取`package.json`中依赖的模块，最终返回完整的模块路径。后续对模块地址进行整理即返回，模块的寻址也就结束了。

以上内容描述了ShadowNode中`module`模块的实现过程，包括全局对象的构建、模块寻址、缓存优化等，但其中有一些细节比如`process.compile(...)`如何对模块文件进行编译以及`snapshot`构建等问题没有深入论述，后续随着我参与项目构建的深入我还会继续详解。

作为一个开源爱好者，也是一名noder，我对ShadowNode的关注由来已久，但真正参与构建也就近两个月的事情，一直以来我对这个项目保留了一些疑问和不解，对此我也特地和ShadowNode作者@yorkie有过一次详谈，一方面从性能角度来看，js并不优良的性能以及它的运行环境对系统资源的巨大消耗决定了其绝对不是构建嵌入式设备应用的绝佳选择，开源社区对类似运行时的diss也基本集中在这方面；另一方面从生态的角度来看，虽然js的生态非常完备，尤其是在node和npm崛起之后，但嵌入式设备应用开发本身也并不是一个巨大的需求，因此对于构建这样一个类node且运行于嵌入式设备的运行时是否具有现实意义，我一直是存疑的。对此，yorkie也给了解答，构建ShadowNode的动机很简单，其实就是看中js本身所具有的巨大生态支撑，而其他并没有太多考虑（事实上也不值得考虑太多），yorkie还用了Android的例子，选择Java作为其开发语言并不是看中Java的性能，而是其强大的生态。确实，这没毛病，而且最终Android也反过去助长了Java生态的增长。尽管这一点也并没有绝对说服我，但ShadowNode的最终目标在于社区建设和生态构建，且对未来发展有更多的憧憬与期待而非该技术本身这一点，也还是令我信服的。

以上是我对ShadowNode实现的简单阐述及我个人粗浅的看法与理解，有错误或遗漏的部分欢迎指正 : )

2018-12-20

