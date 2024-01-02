##  问题背景
有一个接口需要提供，然后查询包含当天（2024-01-02）的数据， 结果结果查出第二天（2024-01-03）的数据。

![image-1704207072975](https://file.losey.top/blog/image-1704207072975.png)

```java
//Service:
        reqVO.setBeginTime(LocalDateTimeUtils.todayStartTime());
        reqVO.setEndTime(LocalDateTimeUtils.todayEndTime());

Mapper:
Integer aaa(@Param("beginTime") LocalDateTime beginTime, @Param("endTime") LocalDateTime endTime);  

Xml:
select  w.project_start_time,w.project_end_time
        from table  d
      <choose>
            <when test="beginTime != null and endTime != null ">
                <!-- 1在中间，或者2完全包含 -->
                and (
                ( w.project_start_time &lt;= #{beginTime} and #{beginTime} &lt;= w.project_end_time)
                or ( w.project_start_time &lt;= #{endTime} and #{endTime} &lt;= w.project_end_time)
                or ( #{beginTime}&lt;= w.project_start_time and #{endTime}&gt;= w.project_end_time)
                )
            </when>

            <when test="beginTime != null ">
                and w.project_end_time &gt;= #{beginTime}
            </when>

            <when test="endTime != null ">
                and w.project_start_time &lt;= #{endTime}
            </when>

            <otherwise>
            </otherwise>
        </choose>
```

如上述所示
日志查询结果发现如下
![image-1704207278984](https://file.losey.top/blog/image-1704207278984.png)

![image-1704207317842](https://file.losey.top/blog/image-1704207317842.png)

2024-01-02 23:59:59.999999999 把2024-01-03 00:00:00的结果也查出来了，这里改成了如下以解决了问题

```java 
    /**
     * 今天结束时间
     *
     * @return
     */
    public static LocalDateTime todayEndTime() {
        return LocalDateTime.of(LocalDate.now(), LocalTime.MAX.withNano(0));
    }

```