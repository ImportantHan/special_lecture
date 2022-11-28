( function( $ ) { 
    $('.category ul').hide(); 
    $('.category .menu .subopen').click(function() {
      if($(this).hasClass('active')){
        $(this).parent().next().slideUp('fast');
        $(this).removeClass('active'); 
      }else{
        $('.sidebar').find('.active').parent().next().slideUp('fast'); 
        $('.sidebar').find('.active').removeClass('active');
        $(this).parent().next().slideDown('fast');
        $(this).addClass('active'); 
      } 
    }); 
})( jQuery );

// =========================================================================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const selectBtn = document.getElementById("selectBtn");
const lineWidth = document.getElementById("lineWidth");
const strokeColor = document.getElementById("strokeColor");
const brushBtn = document.getElementById("brushBtn");
const highlighterBtn = document.getElementById("highlighterBtn");
const eraseBtn = document.getElementById("eraseBtn");
const cleanBtn = document.getElementById("cleanBtn");
const fileInput = document.getElementById("fileInput");
const saveBtn = document.getElementById("saveBtn");
const revertBtn = document.getElementById("revertBtn");


const body = document.getElementsByClassName("body")[0];

canvas.addEventListener("mousemove", mouseMove);
canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mouseup", mouseUp);
canvas.addEventListener("mouseleave", mouseLeave);

// 터치하여 캔버스 그림 그리기
canvas.addEventListener("touchmove", touchMove, false);
canvas.addEventListener("touchstart", touchStart, false);
canvas.addEventListener("touchend", touchEnd, false);
selectBtn.addEventListener("click", selectBtnClick);
lineWidth.addEventListener("change", lineWidthChange);
strokeColor.addEventListener("change", strokeColorChange);
brushBtn.addEventListener("click", brushBtnClick);
highlighterBtn.addEventListener("click", highlighterBtnClick);
eraseBtn.addEventListener("click", eraseBtnClick);
cleanBtn.addEventListener("click", cleanBtnClick);
fileInput.addEventListener("change", fileChange);
saveBtn.addEventListener("click", saveBtnClick);
revertBtn.addEventListener("click", revertBtnClick);

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let isPainting = false;
let mode = "brush";

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
ctx.linejoin = "round";

// 이전으로 돌리기 // 빈배열을 만든다.
let restore_array =[];
let index = -1;
index += 1;
restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));

console.log(body.style);
function mouseMove(e){
  if (isPainting) {
    if (mode === "brush" || mode === "highlighter") {
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      return;
    } else if (mode === "erase") {
      ctx.clearRect(e.offsetX, e.offsetY, ctx.lineWidth, ctx.lineWidth);
    }
  }
  ctx.moveTo(e.offsetX, e.offsetY);
}

function mouseDown(e) {
  isPainting = true;
  ctx.moveTo(e.offsetX, e.offsetY);
}

function mouseUp(){
  isPainting = false;
  ctx.beginPath();
  if(mode === "brush" || mode === "erase" || mode === "highlighter") {
    index += 1;
    restore_array.push(ctx.getImageData(0, 0, canvas.width,  canvas.height));
    console.log(index);
  }
}

function mouseLeave() {
  isPainting = false;
  ctx.beginPath();
}

function getTouchPos(e) {
  return {
      x: e.touches[0].clientX - e.target.offsetLeft,
      y: e.touches[0].clientY - e.target.offsetTop + document.documentElement.scrollTop
  }
}

function touchMove(e) {
  const { x, y } = getTouchPos(e);
  if (isPainting) {
    ctx.lineTo(x, y);
    ctx.stroke();
    return;
  }
  ctx.moveTo(x, y);
}

function touchStart(e) {
  e.preventDefault();
  const { x, y } = getTouchPos(e);
  isPainting = true;
  ctx.moveTo(x, y);
  ctx.stroke();
}

function touchEnd() {
  isPainting = false;
  ctx.beginPath();
  index += 1;
  restore_array.push(ctx.getImageData(0, 0, canvas.width,  canvas.height));
  console.log(index);
}

function selectBtnClick(e) {
  mode = "select";
  isPainting = false;
}

function lineWidthChange(e) {
  if(mode === "brush" || mode === "erase") {
    ctx.lineWidth = e.target.value;
  } else if (mode === "highlighter") {
    ctx.lineWidth = e.target.value * 10;
  }
}

function strokeColorChange(e) {
  ctx.strokeStyle = e.target.value;
}

function brushBtnClick(e) {
  mode = "brush";
  ctx.globalAlpha = "1.0"; 
  ctx.lineWidth = lineWidth.value;
}

function highlighterBtnClick(e) {
  mode = "highlighter";
  console.log(strokeColor.value + 80);
  ctx.globalAlpha = "0.015";
  ctx.lineWidth = 30;
}

function eraseBtnClick(){
  mode = "erase";
}

function cleanBtnClick(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  index = 0;
  ctx.beginPath();
}

let fileName = "";

function fileChange(e) {
  const file = e.target.files[0];
  fileName = file.name;
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function() {
    ctx.drawImage(image, 0, 0);
  }
}

function saveBtnClick(e) {
  console.log(fileName);
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName.split(".")[0] + " feedback.png";
  a.click();
}

function revertBtnClick() {
  if(index <= 0){
    alert("마지막");
  } else {
    index -= 1;
    restore_array.pop();
    ctx.putImageData(restore_array[index],0,0);
  }
  console.log(index);
}

// =========================================================================