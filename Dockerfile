# CI builds dist before packaging the image. For local image builds, run
# VITE_API_URL=https://api.tt829.cn yarn build first.
FROM nginx:alpine AS runner

# Copy built files from builder
COPY dist /usr/share/nginx/html

# Copy nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
