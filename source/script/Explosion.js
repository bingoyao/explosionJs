/*
 * options = {
 *    selector: ,       //合法的CSS选择器
 *    event: ,          //触发效果的事件类型
 *    particleStyle:    //粒子效果
 * }
 * particleStyle = {
 *      //CSS样式
 * }
 *
 * new Shining(options)
 */
function Explosion(options){
  //默认设置  defauls settings
  var defaults = {
    selector: "body",
    event: "click",
    particleStyle: {
      background: "",
      backgroundSize: "cover",
      backgroundRepeat: "no-reapeat",
      backgroundPosition: "center",
      width: "5px",
      height: "5px",
      position: "absolute",
      borderRadius: "100%",
      rotate: true
    }
  };

  if(typeof(options)==="undefined"){
    var options = defaults;
  }else{  
    for(var pro in defaults){
      if(!options.hasOwnProperty(pro)){
        options[pro] = defaults[pro];
      }
    }
    if(options.particleStyle){     
      for(var style in defaults.particleStyle){
        if(!options.particleStyle.hasOwnProperty(style)){
          options.particleStyle[style] = defaults.particleStyle[style];
        }
      }
    }
  }
  //console.log(options)
  this.eles = document.querySelectorAll(options.selector);
  if(this.eles.length === 0){
    console.error("No element selected! Check your css selector!");
    return null;
  }
  //mousemove事件中设置的粒子数量过多会卡死的 -_-
  switch(options.event){    
    case "mousemove": this.particleNumber = 1;break;
    default: this.particleNumber = 20;
  }
  for(var i=0; i<this.eles.length; i++){
    var _this = this.eles[i],
        _particleNumber = this.particleNumber;
    _this.style.overflow = "hidden";
    _this.addEventListener(options.event, function(ev){
      var posX = ev.clientX,
          posY = ev.clientY;
      var particles = [];
      ev.stopPropagation();
      for(var i=0; i<_particleNumber; i++){
        particles[i] = document.createElement("div");
        for(var value in options.particleStyle){
          particles[i].style[value] = options.particleStyle[value];
        }
        if(particles[i].style.background===""){
          particles[i].style.background = getColor();
        }
        if(particles[i].style.rotate){
          particles[i].style.transition = "rotate 2s";
          particles[i].style.transform = getAngle();
        }
        //console.log(particles[i].style.background);
        particles[i].style.top = posY - _this.offsetTop + "px";
        particles[i].style.left = posX - _this.offsetLeft + "px";
        particles[i].speedX = Math.floor(Math.random()*20) - 10;
        particles[i].speedY = Math.floor(Math.random()*20) - 10;
        _this.appendChild(particles[i]);
      }
      particles.forEach(function(particle){
        var timer = setInterval(function(){
        particle.style.top = particle.offsetTop + particle.speedY + "px";
        particle.style.left = particle.offsetLeft + particle.speedX + "px";
        particle.speedY ++;
        if(particle.offsetTop<=0||particle.offsetTop>=_this.clientHeight||particle.offsetLeft<=0||particle.offsetLeft>=_this.clientWidth){
          clearInterval(timer);
          particle.remove();
          }
        },1000/16);
      });
    },false);
  }
  //获取随机颜色 get random color
  function getColor(){
    var r = Math.floor(Math.random()*255),
        g = Math.floor(Math.random()*255),
        b = Math.floor(Math.random()*255);
    return "rgb("+r+","+g+","+b+")";
  }
  //获取随机角度 get random degree
  function getAngle(){
    return "rotate("+Math.floor(Math.random()*360)+"deg)";
  }
}
