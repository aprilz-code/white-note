#FROM java:8
FROM openjdk:8-jre
MAINTAINER 1981196280@qq.com
#WORKDIR /home
EXPOSE 8890
ENV JAVA_OPT="-Xmx128m -Xms64m -Xmn128k"
add  common-api-4.2.3.jar   /app/
ENTRYPOINT java $JAVA_OPT -jar /app/common-api-4.2.3.jar

