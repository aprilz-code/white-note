### Hibernate Validator

###  1.1常用注解

| 注解 | 功能 |
| --- | --- |
|@NotBlank |	只能用于字符串不为 null ，并且字符串 #trim() 以后 length 要大于 0|
|@NotEmpty |	集合对象的元素不为 0 ，即集合不为空，也可以用于字符串不为 null|
|@NotNull |	不能为 null|
|@Pattern(value) |	被注释的元素必须符合指定的正则表达式|
|@Max(value) |	该字段的值只能小于或等于该值|
|@Min(value) |	该字段的值只能大于或等于该值|
|@Range(min=, max=) |	检被注释的元素必须在合适的范围内|
|@Size(max, min) |	检查该字段的 size 是否在 min 和 max 之间，可以是字符串、数组、集合、Map 等|
|@Length(max, min) |	被注释的字符串的大小必须在指定的范围内。|
|@AssertFalse |	被注释的元素必须为 true|
|@AssertTrue |	被注释的元素必须为 false|
|@Email |	被注释的元素必须是电子邮箱地址|
|@URL(protocol=,host=,port=,regexp=,flags=) |	被注释的字符串必须是一个有效的 URL|


###  1.2 非常用注解
| 注解 | 功能 |
| --- | --- |
|@Null |	必须为 null|
|@DecimalMax(value) |	被注释的元素必须是一个数字，其值必须小于等于指定的最大值|
|@DecimalMin(value) |	被注释的元素必须是一个数字，其值必须大于等于指定的最小值|
|@Digits(integer, fraction) |	被注释的元素必须是一个数字，其值必须在可接受的范围内|
|@Positive |	判断正数|
|@PositiveOrZero |	判断正数或 0|
|@Negative |	判断负数|
|@NegativeOrZero |	判断负数或 0|
|@Future |	被注释的元素必须是一个将来的日期|
|@FutureOrPresent |	判断日期是否是将来或现在日期|
|@Past |	检查该字段的日期是在过去|
|@PastOrPresent |	判断日期是否是过去或现在日期|
|@SafeHtml |	判断提交的 HTML 是否安全。例如说，不能包含 JavaScript 脚本等等|


###  1.3 自定义注解
