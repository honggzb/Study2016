## React Flux

### Flux介绍

- Flux 是一种架构思想，专门解决软件的结构问题。它跟MVC 架构是同一类东西，但是更加[简单和清晰](https://www.infoq.com/news/2014/05/facebook-mvc-flux)。
- Flux存在多种实现（[至少15种](https://github.com/voronianski/flux-comparison)），本文采用的是Facebook官方实现

Flux将一个应用分成四个部分

- View： 视图层
- Action（动作）：视图层发出的消息（比如mouseClick）
- Dispatcher（派发器）：用来接收Actions、执行回调函数
- Store（数据层）：用来存放应用的状态，一旦发生变动，就提醒Views要更新页面

![](http://i.imgur.com/UvwpYTc.png)
![](http://i.imgur.com/JAZr29t.png)
![](http://i.imgur.com/KoGMnLA.png)

Flux 的最大特点，就是数据的**"单向流动"** , 任何相邻的部分都不会发生数据的"双向流动"。这保证了流程的清晰。

1. 用户访问 View
2. View 发出用户的 Action
3. Dispatcher 收到 Action，要求 Store 进行相应的更新
4. Store 更新后，发出一个"change"事件
5. View 收到"change"事件后，更新页面

├── app
│   ├──  actions
│   │    └── ButtonActions.jsx
│   ├──  components
│   │    ├── MyButton.jsx
│   │    └── MyButtonController.jsx
│   ├──  dispatcher
│   │    └── AppDispatcher.jsx
│   └──  stores
│        └── ListStore.jsx
├── index.html
└── index.jsx

![](http://i.imgur.com/lxDIHcu.png)



