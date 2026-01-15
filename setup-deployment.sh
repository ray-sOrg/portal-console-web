#!/bin/bash

# ========================================
# 🚀 自动���部署配置脚本
# ========================================
# 用途：快速复用部署配置到新项目
# 使用方法：
#   1. 复制此脚本到新项目根目录
#   2. 修改下方的配置变量
#   3. 运行：bash setup-deployment.sh
# ========================================

set -e

echo "🚀 开始配置自动化部署..."
echo ""

# ========================================
# 🔧 配置区域（请修改为你的项目配置）
# ========================================

# 项目信息
NEW_PROJECT_NAME="your-project-name"              # 新项目名称
NEW_GITHUB_REPO="username/your-repo-name"         # GitHub 仓库

# 腾讯云配置
NEW_TCR_REGISTRY="ccr.ccs.tencentyun.com"         # TCR 访问域名
NEW_TCR_NAMESPACE="your-namespace"                 # TCR 命名空间
NEW_DOMAIN="your-domain.com"                       # 域名

# 应用配置
NEW_PORT="80"                                     # 应用端口 (nginx 默认 80)
NEW_HEALTH_PATH="/"                               # 健康检查路径

# ========================================
# 原项目配置（通常不需要修改）
# ========================================
OLD_PROJECT_NAME="portal-console-web"
OLD_GITHUB_REPO="tt472625987/portal-console-web"
OLD_TCR_REGISTRY="ccr.ccs.tencentyun.com"
OLD_TCR_NAMESPACE="ray321"
OLD_DOMAIN="console.tt829.cn"
OLD_PORT="80"
OLD_HEALTH_PATH="/"

# ========================================
# 验证配置
# ========================================
echo "📋 配置检查："
echo "  项目名称: $OLD_PROJECT_NAME → $NEW_PROJECT_NAME"
echo "  GitHub 仓库: $OLD_GITHUB_REPO → $NEW_GITHUB_REPO"
echo "  TCR 地址: $OLD_TCR_REGISTRY → $NEW_TCR_REGISTRY"
echo "  TCR 命名空间: $OLD_TCR_NAMESPACE → $NEW_TCR_NAMESPACE"
echo "  域名: $OLD_DOMAIN → $NEW_DOMAIN"
echo "  端口: $OLD_PORT → $NEW_PORT"
echo "  健康检查路径: $OLD_HEALTH_PATH → $NEW_HEALTH_PATH"
echo ""

# 检查是否是默认配置
if [ "$NEW_PROJECT_NAME" = "your-project-name" ]; then
    echo "❌ 错误：请先修改脚本中的配置变量！"
    echo "   打开 setup-deployment.sh 文件，修改 '配置区域' 中的变量"
    exit 1
fi

read -p "⚠️  确认配置正确？这将修改 deploy.yml 和 deployment.yaml 文件。(y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 已取消配置"
    exit 1
fi

# ========================================
# 备份原文件
# ========================================
echo ""
echo "📦 备份原文件..."
cp .github/workflows/deploy.yml .github/workflows/deploy.yml.backup
cp deployment.yaml deployment.yaml.backup
echo "✅ 备份完成"

# ========================================
# 修改 deploy.yml
# ========================================
echo ""
echo "🔧 修改 .github/workflows/deploy.yml..."

DEPLOY_FILE=".github/workflows/deploy.yml"

# 项目名称
sed -i "s|PROJECT_NAME: $OLD_PROJECT_NAME|PROJECT_NAME: $NEW_PROJECT_NAME|g" "$DEPLOY_FILE"

# GitHub 仓库
sed -i "s|GITHUB_REPO: $OLD_GITHUB_REPO|GITHUB_REPO: $NEW_GITHUB_REPO|g" "$DEPLOY_FILE"

# TCR 地址
sed -i "s|TCR_REGISTRY: $OLD_TCR_REGISTRY|TCR_REGISTRY: $NEW_TCR_REGISTRY|g" "$DEPLOY_FILE"

# TCR 命名空间
sed -i "s|TCR_NAMESPACE: $OLD_TCR_NAMESPACE|TCR_NAMESPACE: $NEW_TCR_NAMESPACE|g" "$DEPLOY_FILE"

# 健康检查路径
sed -i "s|HEALTH_CHECK_PATH: $OLD_HEALTH_PATH|HEALTH_CHECK_PATH: $NEW_HEALTH_PATH|g" "$DEPLOY_FILE"

# 容器端口
sed -i "s|CONTAINER_PORT: $OLD_PORT|CONTAINER_PORT: $NEW_PORT|g" "$DEPLOY_FILE"

echo "✅ deploy.yml 修改完成"

# ========================================
# 修改 deployment.yaml
# ========================================
echo ""
echo "🔧 修改 deployment.yaml..."

DEPLOYMENT_FILE="deployment.yaml"

# 项目名称（所有出现的地方）
sed -i "s|$OLD_PROJECT_NAME|$NEW_PROJECT_NAME|g" "$DEPLOYMENT_FILE"

# 域名
sed -i "s|$OLD_DOMAIN|$NEW_DOMAIN|g" "$DEPLOYMENT_FILE"

# 端口（如果不同）
if [ "$OLD_PORT" != "$NEW_PORT" ]; then
    sed -i "s|containerPort: $OLD_PORT|containerPort: $NEW_PORT|g" "$DEPLOYMENT_FILE"
    sed -i "s|port: $OLD_PORT|port: $NEW_PORT|g" "$DEPLOYMENT_FILE"
    sed -i "s|targetPort: $OLD_PORT|targetPort: $NEW_PORT|g" "$DEPLOYMENT_FILE"
fi

# 健康检查路径
sed -i "s|path: $OLD_HEALTH_PATH|path: $NEW_HEALTH_PATH|g" "$DEPLOYMENT_FILE"

echo "✅ deployment.yaml 修改完成"

# ========================================
# 显示差异
# ========================================
echo ""
echo "📊 变更对比："
echo ""
echo "=== .github/workflows/deploy.yml ==="
diff -u .github/workflows/deploy.yml.backup .github/workflows/deploy.yml || true
echo ""
echo "=== deployment.yaml ==="
diff -u deployment.yaml.backup deployment.yaml || true

# ========================================
# 完成
# ========================================
echo ""
echo "✅ 配置完成！"
echo ""
echo "📝 下一步："
echo "  1. 检查修改是否正确"
echo "  2. 在 GitHub 仓库配置 Secrets："
echo "     - TCR_USERNAME (腾讯云 TCR 用户名)"
echo "     - TCR_PASSWORD (腾讯云 TCR 密码)"
echo "     - KUBECONFIG (K8s 集群配置)"
echo "     - COS_SECRET_ID (腾讯云 COS，如需要)"
echo "     - COS_SECRET_KEY (腾讯云 COS，如需要)"
echo "  3. 推送代码到 main 分支触发部署"
echo ""
echo "💾 备份文件："
echo "  - .github/workflows/deploy.yml.backup"
echo "  - deployment.yaml.backup"
echo "  （如有问题可恢复）"
echo ""
