一个 `react-navigation` 4.x 版本封装使用的demo

实现了
1. `navigate`,`back`,`reset`,`replace`,`push`,`pop`,`popTo`,`PopToTop`各种路由跳转/替换/重置;  
2. `setParams`, `getParams`页面跳转时参数传递/导航栏信息动态变换; 
3. `backHandle`, `backAction`安卓物理返回键与左上角箭头返回按钮的统一处理;
4. 转场动画普通页面水平切换, 特殊页面垂直切换, 如demo里的`login`登录页;