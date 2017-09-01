# explosionJs
### 介绍：这是一个简单的js插件，它可以在你的网页中产生粒子爆炸的效果
### 实现的原理是：动态的生成和删除dom节点，定时器改变节点位置产生动画效果
### 调用方法：
1. 首先下载Explosion.js文件放到项目中并在页面中引入；
2. 实例化Explosion对象，构造函数Explosion接受一个对象作为参数，该对象可包含的属性有：    
2.1. selector: 该属性的值应为合法的CSS选择器，并且请对传入的元素设置CSS定位属性，如果不传入该参数则默认为body     
2.2. event: 该属性为触发效果的事件，如果不传入则默认为click     
2.3. particleStyle: 该属性为粒子的样式，粒子实际上是块级元素，可设置的属性有width,height,background,rotate(该属性为true表示对应元素会产生旋转)等. 
3. 调用实例: 下面代码为id为content这个元素绑定了一个事件mousemove，当鼠标在其上滑过时将会在滑过处产生粒子，同时指定了粒子的样式      
<pre>
new Explosion({    
    selector: "#content",    
    event: "mousemove",    
    particleStyle: {     
      background: "url('./source/images/star.png')",    
      width: "10px",    
      height: "10px"    
      }    
    });    
</pre>
### [demo](https://bingoyao.cn/explosionJs)
