//获取头部实例
const headerEl = document.querySelector("header")
//获取返回顶部实例
const scrollTop = document.querySelector(".scrollTop")
//定义页面滚动事件
window.addEventListener("scroll",() => {
  //返回元素大小，及相对于视口的位置
  let height = headerEl.getBoundingClientRect().height
  if(window.pageYOffset - height >800){
    //contains判断是否包含字符串“sticky”
    if(!headerEl.classList.contains("sticky")){
      headerEl.classList.add("sticky")
    }
  }else{
    headerEl.classList.remove("sticky")
  }
  //判断返回顶部位置
  if(window.pageYOffset > 2000){
    scrollTop.style.display = "block";
  }else{
    scrollTop.style.display = "none";
  }
})
// 轮播部分js
const glide = new Glide(".glide");
const captionsEl = document.querySelectorAll(".slide-caption");
// 加载后，轮播后
glide.on(["mount.after","run.after"],()=>{
  // 获取当前的轮播index
  const caption = captionsEl[glide.index];
  anime({
    targets: caption.children,
    opacity: [0,1],
    duration: 400,
    easing: "linear",
    delay:anime.stagger(400,{start:300}),//给子元素依次设置动画样式
    translateY: [anime([40,10]),0]  //在Y轴方向上依次移动的动画样式
  })
})
glide.on("run.before",()=>{
  document.querySelectorAll(".slide-caption > *").forEach(el=>{
    el.style.opacity = 0;
  })
})
glide.mount()

// 成功案例部分js

const isotope = new Isotope(".cases",{
  layoutMode: "fitRows",      //根据行布局，元素默认占满整行，然后到下一行
  itemSelector:".case-item"   //指定每个案例元素是哪个？
});
// 获取删选按钮实例,通过js事件冒泡给父容器设置
const filterBtns = document.querySelector(".filter-btns")

filterBtns.addEventListener("click",e => {
  // target属性，哪个按钮被点击
  let { target } = e
  console.log(e)
  console.log(target)
  // 获取点击时的筛选类别
  const filterOptions = target.getAttribute("data-filter");
  if (filterOptions){
    // 先取消具有active的样式
    document.querySelectorAll(".filter-btn.active").forEach(btn => btn.classList.remove("active"));
    // 点击按钮添加active
    target.classList.add("active");

    isotope.arrange({filter:filterOptions})
  }
});

// 定义通用的配置项
const staggeringOption = {
  delay: 300,
  // 从下到上有50px的移动
  distance: "50px",
  // 动画执行500毫秒
  duration: 500,
  easing :"ease-in-out",
  // 方向从下到上走
  origin :"bottom"

}
// js文件暴露出来的对象
//     ...就是匹配staggeringOption中的所有项，给后面拼接interval
// 关于我们
ScrollReveal().reveal(".feature",{...staggeringOption,interval:350});
// 服务流程
ScrollReveal().reveal(".service-item",{...staggeringOption,interval:350});
// 团队介绍数据部分
const dataSectionEl = document.querySelector(".data-section")
ScrollReveal().reveal(".data-section",{
  // 出现之前有一个回调函数
  beforeReveal:() => {
    anime({
      targets:".data-piece .num",
      // 将当前元素传递进去
      innerHTML:el =>{
        // 例如：返回0~156的值
        return [0,el.innerHTML]
        // console.log(el)
      },
      duration: 2000,
      // 数字按照1增长，否则会按照小数增长
      round :1,
      // 越来越快的动画效果
      easing :"easeInExpo"
    })
    dataSectionEl.style.backgroundPosition = 'center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom / 5}px)';
  }
});
// 设置背景视差效果
// 监听window滚动事件
window.addEventListener("scroll",() => {
  // 获取元素距离上下边的位置
  const bottom = dataSectionEl.getBoundingClientRect().bottom;
  const top = dataSectionEl.getBoundingClientRect().top;
  if(bottom >= 0 && top <= window.innerHeight){
    dataSectionEl.style.backgroundPosition = 'center calc(50% - ${bottom / 5}px)';
  }
})































