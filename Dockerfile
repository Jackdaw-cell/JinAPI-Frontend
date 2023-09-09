# 基础镜像
FROM  nginx

# 指定路径
WORKDIR /usr/share/nginx/html/

USER root

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

#项目打包放到nginx默认目录
COPY ./dist /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
