#!/bin/bash

# Element-UI-X 文档部署脚本

set -e

echo "🚀 开始部署 Element-UI-X 文档..."

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI 未安装，正在安装..."
    npm install -g vercel
fi

# 安装依赖
echo "📦 安装依赖..."
npm ci

# 构建文档
echo "🔨 构建文档..."
npm run build

# 检查构建结果
if [ ! -d "src/.vuepress/dist" ]; then
    echo "❌ 构建失败，输出目录不存在"
    exit 1
fi

echo "✅ 构建完成"

# 部署到 Vercel
echo "🌐 部署到 Vercel..."

if [ "$1" = "prod" ] || [ "$1" = "production" ]; then
    echo "🚀 部署到生产环境..."
    vercel --prod --yes
else
    echo "🔍 部署到预览环境..."
    vercel --yes
fi

echo "✅ 部署完成！" 