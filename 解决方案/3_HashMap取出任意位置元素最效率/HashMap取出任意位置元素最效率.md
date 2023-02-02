### <center>HashMap取出任意位置元素最效率

# 

```java
package com.example.springtest.test;

import java.util.HashMap;

/**
 * @Classname TestHashMap
 * @Description hashmap取出任意位置元素最效率
 * @Date 2023/2/1 11:26
 * @Created by white
 */
public class TestHashMap {

    public static void main(String[] args) {
        HashMap<Integer, String> map = new HashMap<>();
        for (int i = 0; i <= 25; i++) {
            map.put(i, "value--" + i);
        }
        //取出keyset转数组
        Object[] keys = map.keySet().toArray();

        //取出values转数组
        Object[] values = map.values().toArray();

        //随机一个index
        int index= (int)(Math.random() * keys.length);

        System.out.println( values[index]);

        //取出随便index下标 hashmap里的值
        System.out.println(map.get(index));

    }
}

```


代码参考： https://github.com/liushaohui1/springTest.git
