# AutoHotKey脚本

## Typora快捷输入脚本

```ahk
; Typora
; 快捷修改字号、字体颜色、字体
; SendInput {Text} 解决中文输入法问题

#IfWinActive ahk_exe Typora.exe
{
   ; ctrl+1 1号字体
   ^1::addFontSize(1)

   ; ctrl+2 2号字体
   ^2::addFontSize(2)

   ; ctrl+3 3号字体，Typora默认3号 
   ^3::addFontSize(3)

   ; ctrl+4 4号字体
   ^4::addFontSize(4)

   ; ctrl+5 5号字体
   ^5::addFontSize(5)

   ; ctrl+6 6号字体
   ^6::addFontSize(6)

   ; ctrl+7 7号字体
   ^7::addFontSize(7)


    ; alt+0 黑色
    !0::addFontColor("black")
  
    ; alt+1 红色
    !1::addFontColor("red")

    ; alt+2 橙色
    !2::addFontColor("orange") 

    ; alt+3 黄色
    !3::addFontColor("yellow")

    ; alt+4 绿色
    !4::addFontColor("green")

    ; alt+5 浅蓝色
    !5::addFontColor("cornflowerblue")

    ; alt+6 青色
    !6::addFontColor("cyan") 

    ; alt+7 紫色
    !7::addFontColor("purple")

    ; ctrl+shift+1 红色
    ^+1::addMark("#f7c3e1")

    ; ctrl+shift+2 橙色
    ^+2::addMark("#fad4b5") 

    ; ctrl+shift+3 黄色
    ^+3::addMark("#f8e8b2") 

    ; ctrl+shift+4 绿色
    ^+4::addMark("#b6f3d9")     
    
    ; ctrl+shift+5 蓝色
    ^+5::addMark("#b0e9f5")   

    ; ctrl+shift+6 青色
    ^+6::addMark("#def6b5") 

    ; ctrl+shift+7 紫色
    ^+7::addMark("#d7c6f7") 

    ;ctrl+alt+1 默认黑体
   ^!1::addFontFace("黑体")

    ;ctrl+alt+2 宋体
   ^!2::addFontFace("宋体")

    ;ctrl+alt+3 仿宋
   ^!3::addFontFace("仿宋")

    ;ctrl+alt+4 楷体
   ^!4::addFontFace("楷体")

    ;ctrl+alt+5 隶书
   ^!5::addFontFace("隶书")

    ;ctrl+alt+6 微软雅黑
   ^!6::addFontFace("微软雅黑")

    ;ctrl+alt+7 华文彩体
   ^!7::addFontFace("STCAIYUN")

    ;ctrl+shift+i 插入iframe
   ^+i::addIframe()   

    ;alt+l 左对齐
   !l::modifyAlign("left")   

   ;alt+c 居中对齐
   !c::modifyAlign("center")

    ;alt+r 右对齐
    !r::modifyAlign("right")
}

;快捷键修改字号
addFontSize(size){
    clipboard := "" ; 清空剪切板
    Send {ctrl down}c{ctrl up} ; 复制

	clipboard = <font size = '%size%'>%clipboard%</font> ; 剪切板新增内容
	SendInput {ctrl down}v{ctrl up} ; 粘贴
	Send {Left}{Left}{Left}{Left}{Left}{Left}{Left} ; 光标跟随到文本
}

; 快捷增加字体颜色
addFontColor(color){
    clipboard := "" ; 清空剪切板
    Send {ctrl down}c{ctrl up} ; 复制

	clipboard = <font color='%color%'>%clipboard%</font> ; 剪切板新增内容
	SendInput {ctrl down}v{ctrl up} ; 粘贴
	Send {Left}{Left}{Left}{Left}{Left}{Left}{Left}{Left}{Left} ; 光标跟随到文本
}

; 快捷增加字体背景颜色
addMark(color){
    clipboard := "" ; 清空剪切板
    Send {ctrl down}c{ctrl up} ; 复制

    clipboard = <mark style="background-color: %color%">%clipboard%</mark> ; 剪切板新增内容
    SendInput {ctrl down}v{ctrl up} ; 粘贴
    Send {Left}{Left}{Left}{Left}{Left}{Left}{Left}{Left}{Left} ; 光标跟随到文本
}

; 快捷键插入iframe
addIframe(){
    clipboard := "" ; 清空剪切板
    Send {ctrl down}c{ctrl up} ; 复制

    clipboard = <iframe src="%clipboard%" scrolling="no" border="0" height="500" frameborder="no" framespacing="0" allowfullscreen="true"></iframe> ; 剪切板新增内容

    SendInput {ctrl down}v{ctrl up} ; 粘贴
    Send {Left}{Left}{Left}{Left}{Left}{Left}{Left} ; 光标跟随到文本
}

;快捷键修改字体
addFontFace(face){
    clipboard := "" ; 清空剪切板
    Send {ctrl down}c{ctrl up} ; 复制

	clipboard = <font face= "%face%">%clipboard%</font> ; 剪切板新增内容
	SendInput {ctrl down}v{ctrl up} ; 粘贴
	Send {Left}{Left}{Left}{Left}{Left}{Left}{Left} ; 光标跟随到文本
}

;快捷键修改对齐方式
modifyAlign(align){
    clipboard := "" ; 清空剪切板
    Send {ctrl down}c{ctrl up} ; 复制

    clipboard = <p align="%align%">%clipboard%</p> ; 剪切板新增内容
    SendInput {ctrl down}v{ctrl up} ; 粘贴
    Send {Left}{Left}{Left}{Left}{Left}{Left}{Left} ; 光标跟随到文本
}
```

