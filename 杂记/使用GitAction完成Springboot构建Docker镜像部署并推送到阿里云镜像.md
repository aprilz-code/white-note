### <center>使用GitAction完成Springboot构建Docker镜像部署并推送到阿里云镜像

***

## 前言

之前呢，一直使用Jenkins来构建推送项目,Jenkins是一个java项目，对对于个人开发者来说还是太浪费服务器资源了，
而Github给每位开发者以免费CICD，那么何乐而不为呢。


##正文

这里只提供一份带注释的示例，其它可自行研究并修改使用

```shell
name: Master-Build-Docker-Images

#on:
#  push:
#    # 每次 push tag 时进行构建，不需要每次 push 都构建。使用通配符匹配每次 tag 的提交，记得 tag 名一定要以 v 开头
#    tags:
#      - v*

on:
  push:
    branches:
      - master

jobs:
  push:
    # 如果需要在构建前进行测试的话需要取消下面的注释和上面对应的 test 动作的注释。
    # needs: test

    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3.9.0
        with:
          java-version: 8.0.362+9
          distribution: 'temurin'
          cache: maven
      - name: Dump GitHub context
        env:
          GITHUB_CONTEXT: ${{ toJSON(github) }}
        # 将GTIHUB的信息都打印出来，后面的脚本可以使用这些信息，例如后面的镜像TAG用的就是这里面的commitid
        run: echo "Hello ${{ github.event.commits[0].id }}"
      - uses: docker/setup-buildx-action@v1
#      - uses: actions/setup-node@v3.6.0
#        with:
#          node-version: 14.x
      # 安装maven依赖
      - name: Maven Clean Install
        run: |
          echo '=====开始mvn clean====='
          mvn clean

          echo '=====开始mvn install&&package====='
          mvn install -DskipTests=true && mvn package -DskipTests=true

      - name: Extract files from jar && Build Java Docker Images
        # 从构建好的jar中提取制作镜像所需的内容，例如依赖jar、class、配置文件等
        run: |
          echo '=====提取jar并Build Java Docker Images====='
          cp yudao-server/target/yudao-server.jar yudao-server/src/main/resources/yudao-server.jar
          cd ./yudao-server/src/main/resources
          docker build -t registry.cn-shenzhen.aliyuncs.com/whiteblog/yudao-server .
          cd ../../../..

#      - name: Build yudao-ui-admin
#        run: |
#          echo '=====开始安装yudao-ui-admin依赖====='
#          cd ./yudao-ui-admin
#          npm install
#          npm run build:prod
#          cd ..
#
#
#      # 构建镜像，指定镜像名
#      - name: Build Vue Docker Images
#        run: |
#
#          echo '=====开始构建镜像====='
#          echo '=====开始构建yudao-ui-admin====='
#          cd yudao-ui-admin
#          docker build -t registry.cn-shenzhen.aliyuncs.com/whiteblog/yudao_ui_admin .
#          cd ..
#
#          echo '=====镜像构建结束====='

      # 登录到 阿里云镜像服务，使用 GitHub secrets 传入账号密码，密码被加密存储在 GitHub 服务器
      - name: Login to Aliyun
        uses: docker/login-action@v2  # 三方的action操作， 执行docker login
        with:
          registry: registry.cn-shenzhen.aliyuncs.com
          username: ${{ secrets.ALIYUN_USER_NAME }}
          password: ${{ secrets.ALIYUN_PASSWORD }}

      - name: Push Docker Image
        run: |
          echo '=====开始上传镜像====='
          docker push registry.cn-shenzhen.aliyuncs.com/whiteblog/yudao-server
          echo '=====镜像上传结束====='

#      - name: Update New Docker Image And Restart Server
#        uses: appleboy/ssh-action@master
#        with:
#          host: ${{ secrets.DOCKER_IP_DEV_NACOS }}
#          username: ${{ secrets.DOCKER_ID }}
#          password: ${{ secrets.DOCKER_PASSWORD }}
#          port: 22
#          script: |
#            cd /root/docker-compose/bin
#            ./update.sh



      - name: Update New Docker Image And Restart Server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.REMOTE_HOST }}
          username: ${{ secrets.REMOTE_USER }}
          password: ${{ secrets.REMOTE_PASSWORD }}
     #     key: ${{ secrets.REMOTE_ACCESS_TOKEN }}
          script: |
            cd /home
            chmod +x deployDocker.sh
            ./deployDocker.sh


```


deployDocker.sh

```shell
#!/usr/bin/env bash

echo '=====开始关闭运行的容器====='
echo '=========================='
echo '=====结束后台服务运行====='
echo '=========================='

docker-compose -f ./yudao-server.yml down

echo '=====开始更新镜像====='
docker pull registry.cn-shenzhen.aliyuncs.com/whiteblog/yudao-server


echo '=====删除docker标签为none的镜像====='
docker images | grep none | awk '{print $3}' | xargs docker rmi

echo '=====开始运行的一键部署脚本====='
echo '======================'
echo '=====开始运行后台====='
echo '======================'

echo '=====开始运行容器====='
docker-compose -f ./yudao-server.yml up -d

echo '执行完成 日志目录: ./log'


```

具体GITHUB代码地址 ： https://github.com/aprilz-code/ruoyi-vue-pro.git
