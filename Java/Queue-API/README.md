### Queue API

## 入队

add、offer、put这3个方法都是往队列尾部添加元素，区别如下：

| 方法 | 解释 |
| --- | --- |
| add(E e) | 添加成功时返回true，不响应中断 ，当队列已满导致添加失败时抛出IllegalStateException。->不阻塞 |
| offer(E e) | 添加成功时返回true，因队列已满导致添加失败时返回false，不响应中断。->不阻塞 |
| offer(E e, long timeout, TimeUnit unit) | 在队尾插入一个元素,，如果数组已满，则进入等待，直到等待时间超 |
| put(E e) | 如果队列满了，一直阻塞，直到数组不满了或者线程被中断-->阻塞 |

## 出队

take、poll方法能获取队列头部第1个元素，区别如下：

| 方法 | 解释 |
| --- | --- |
| take() | 阻塞拿数据 |
| poll() | 非阻塞拿数据，立即返回 |
| poll(long timeout, TimeUnit unit) | 带有一定超时时间的poll拿取数据 |