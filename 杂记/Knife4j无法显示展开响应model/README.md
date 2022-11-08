### <center>Knife4j无法显示展开响应model

***

解决办法：

knife4j 注意的地方 1.get方法不能用lombok的注解，手写，入参泛型T

2.controller层的返回值的泛型不能省略。

```java
package com.aprilz.tiny.common.api;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;

/**
 * 通用返回对象
 * Created by aprilz on 2019/4/19.
 */
public class CommonResult<T> implements Serializable {
    @ApiModelProperty(value = "响应码")
    private long code;
    @ApiModelProperty(value = "响应消息")
    private String message;
    @ApiModelProperty(value = "响应数据")
    private T data;

    /**
     * 时间戳
     */
    private long timestamp = System.currentTimeMillis();

    protected CommonResult() {
    }

    protected CommonResult(long code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public static <T> CommonResult<T> success() {
        return new CommonResult<T>(ResultCode.SUCCESS.code(), ResultCode.SUCCESS.message(), null);
    }

    /**
     * 成功返回结果
     *
     * @param data 获取的数据
     */
    public static <T> CommonResult<T> success(T data) {
        return new CommonResult<T>(ResultCode.SUCCESS.code(), ResultCode.SUCCESS.message(), data);
    }

    /**
     * 成功返回结果
     *
     * @param data    获取的数据
     * @param message 提示信息
     */
    public static <T> CommonResult<T> success(T data, String message) {
        return new CommonResult<T>(ResultCode.SUCCESS.code(), message, data);
    }

    /**
     * 失败返回结果
     *
     * @param errorCode 错误码
     */
    public static <T> CommonResult<T> error(ResultCode errorCode) {
        return new CommonResult<T>(errorCode.code(), errorCode.message(), null);
    }

    public static <T> CommonResult<T> error(Integer code, String message) {
        return new CommonResult<T>(code, message, null);
    }

    /**
     * 失败返回结果
     *
     * @param message 提示信息
     */
    public static <T> CommonResult<T> error(String message) {
        return new CommonResult<T>(ResultCode.FAILED.code(), message, null);
    }

    /**
     * 失败返回结果
     */
    public static <T> CommonResult<T> error() {
        return error(ResultCode.FAILED);
    }

    /**
     * 参数验证失败返回结果
     */
    public static <T> CommonResult<T> validateFailed() {
        return error(ResultCode.VALIDATE_FAILED);
    }

    public static <T> CommonResult<T> paramsError() {
        return error(ResultCode.PARAMS_ERROR);
    }

    /**
     * 参数验证失败返回结果
     *
     * @param message 提示信息
     */
    public static <T> CommonResult<T> validateFailed(String message) {
        return new CommonResult<T>(ResultCode.VALIDATE_FAILED.code(), message, null);
    }

    /**
     * 未登录返回结果
     */
    public static <T> CommonResult<T> unauthorized(T data) {
        return new CommonResult<T>(ResultCode.UNAUTHORIZED.code(), ResultCode.UNAUTHORIZED.message(), data);
    }

    /**
     * 未授权返回结果
     */
    public static <T> CommonResult<T> forbidden(T data) {
        return new CommonResult<T>(ResultCode.FORBIDDEN.code(), ResultCode.FORBIDDEN.message(), data);
    }


    public long getCode() {
        return code;
    }

    public void setCode(long code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}

```

```java
    /**
 * 查询商品
 *
 * @param goodsId
 * @param goodsSn
 * @param name
 * @param page
 * @param limit
 * @param sort
 * @param order
 * @return
 */
@PreAuthorize("hasAuthority('admin:goods:list')")
@ApiOperation("商品管理-商品管理-查询")
@GetMapping("/list")
public CommonResult<Page<ApGoods>>list(Integer goodsId,String goodsSn,String name,
@RequestParam(defaultValue = "1") Integer page,
@RequestParam(defaultValue = "10") Integer limit,
@RequestParam(defaultValue = "create_time") String sort,
@RequestParam(defaultValue = "desc") String order){
        Page<ApGoods> goodsList=goodsService.querySelective(goodsId,goodsSn,name,page,limit,sort,order);
        return CommonResult.success(goodsList);
        }
```

```java
package com.aprilz.tiny.mbg.entity;

import com.aprilz.tiny.component.JsonStringArrayTypeHandler;
import com.aprilz.tiny.mbg.base.BaseEntity;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * <p>
 * 商品基本信息表
 * </p>
 *
 * @author aprilz
 * @since 2022-07-19
 */
@Getter
@Setter
@Accessors(chain = true)
@TableName(value = "ap_goods", autoResultMap = true)
@ApiModel(value = "ApGoods对象", description = "商品基本信息表")
public class ApGoods extends BaseEntity<ApGoods> {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("商品编号")
    @TableField("goods_sn")
    private String goodsSn;

    @ApiModelProperty("商品名称")
    @TableField("`name`")
    private String name;

    @ApiModelProperty("商品所属类目ID")
    @TableField("category_id")
    private Long categoryId;

    @TableField("brand_id")
    private Long brandId;

    @ApiModelProperty("商品宣传图片列表，采用JSON数组格式")
    @TableField(value = "gallery", typeHandler = JsonStringArrayTypeHandler.class)
    private String[] gallery;

    @ApiModelProperty("商品关键字，采用逗号间隔")
    @TableField("keywords")
    private String keywords;

    @ApiModelProperty("商品简介")
    @TableField("brief")
    private String brief;

    @ApiModelProperty("是否上架")
    @TableField("is_on_sale")
    private Boolean isOnSale;

    @TableField("sort_order")
    private Integer sortOrder;

    @ApiModelProperty("商品页面商品图片")
    @TableField("pic_url")
    private String picUrl;

    @ApiModelProperty("商品分享海报")
    @TableField("share_url")
    private String shareUrl;

    @ApiModelProperty("是否新品首发，如果设置则可以在新品首发页面展示")
    @TableField("is_new")
    private Boolean isNew;

    @ApiModelProperty("是否人气推荐，如果设置则可以在人气推荐页面展示")
    @TableField("is_hot")
    private Boolean isHot;

    @ApiModelProperty("商品单位，例如件、盒")
    @TableField("unit")
    private String unit;

    @ApiModelProperty("专柜价格")
    @TableField("counter_price")
    private BigDecimal counterPrice;

    @ApiModelProperty("零售价格")
    @TableField("retail_price")
    private BigDecimal retailPrice;

    @ApiModelProperty("商品详细介绍，是富文本格式")
    @TableField("detail")
    private String detail;

    @ApiModelProperty("默认单规格")
    @TableField("multiple_spec")
    private Boolean multipleSpec;


    @Override
    public Serializable pkVal() {
        return null;
    }

}

```




