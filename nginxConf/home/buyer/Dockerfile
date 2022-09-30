#FROM java:8
FROM openjdk:8-jre
MAINTAINER 1981196280@qq.com
#WORKDIR /home
EXPOSE 8888
ENV JAVA_OPT="-Xmx256m -Xms128m -Xmn256k"
add  buyer-api-4.2.3.jar   /mydata/app/
ENTRYPOINT java $JAVA_OPT -jar /mydata/app/buyer-api-4.2.3.jar

