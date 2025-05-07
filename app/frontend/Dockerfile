# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# # Production stage
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html

# # Optional: overwrite default Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# FROM node:18-alpine as builder
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build

# FROM nginx:stable-alpine
# COPY --from=builder /app/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
