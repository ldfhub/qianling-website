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
})

// 服务流程部分js
