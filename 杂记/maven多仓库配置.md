### <center>maven多仓库配置

***

## 前言

公司私库上传jar，而maven-releases处理releases包，
maven-snapshots处理snapshots包。故改maven的settting.xml文件

##正文

这里只提供一份示例，其它可自行研究并修改使用

```xml
<?xml version="1.0" encoding="UTF-8"?>

<settings
    xmlns="http://maven.apache.org/SETTINGS/1.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">

    <localRepository>E:\mavenRepo</localRepository>

    <pluginGroups>
 
    </pluginGroups>

    <proxies>

    </proxies>

    <servers>

        <server>
            <id>maven-releases</id>
            <username>admin</username>
            <password>zhgd123@</password>
        </server>
        <server>
            <id>maven-snapshots</id>
            <username>admin</username>
            <password>zhgd123@</password>
        </server>
    </servers>

    <mirrors>

    </mirrors>
    <profiles>
       
		
        <profile>
            <id>res</id>
            <repositories>
                <repository>
                    <id>alirepo</id>
                    <name>ali-repo</name>
                    <url>http://maven.aliyun.com/nexus/content/groups/public</url>
					<releases>
                    <enabled>false</enabled>
                </releases>
                <snapshots>
                    <enabled>false</enabled>
                </snapshots>
                </repository>
				
				 <repository>
                    <id>maven-releases</id>
                    <name>maven-releases</name>
                    <url>http://192.168.31.16:6006/repository/maven-releases/</url>
                    <releases>
                        <enabled>true</enabled>
                    </releases>
                <snapshots>
                    <enabled>false</enabled>
                </snapshots>
                </repository>
				
				<repository>
                    <id>maven-snapshots</id>
                    <name>maven-snapshots</name>
                    <url>http://192.168.31.16:6006/repository/maven-snapshots/</url>
					<releases>
						<enabled>false</enabled>
					</releases>
                    <snapshots>
                        <enabled>true</enabled>
                    </snapshots>
                </repository>
            </repositories>
        </profile>
    </profiles>
    <activeProfiles>
        <activeProfile>res</activeProfile>
    </activeProfiles>
</settings>
```

