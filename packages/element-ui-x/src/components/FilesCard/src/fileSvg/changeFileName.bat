@echo off
chcp 65001 >nul
rem 开启延迟环境变量扩展
setlocal enabledelayedexpansion

rem 设置旧的文件扩展名
set "old_ext=.svg"
rem 设置新的文件扩展名
set "new_ext=.vue"

rem 遍历当前目录下所有文件
for %%f in (*%old_ext%) do (
    set "filename=%%~nf"
    ren "%%f" "!filename!!new_ext!"
    echo 已将 %%f 重命名为 !filename!!new_ext!
)
endlocal
pause    