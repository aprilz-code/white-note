## <center>sleep(),wait(),await()和yield()

## 是否释放锁：
调用sleep和yield的时候不释放当前线程所获得的锁，但是调用await/wait的时候却释放了其获取的锁并阻塞等待。



## 调用后何时恢复：

sleep让线程阻塞，且在指定的时间之内都不会执行，时间到了之后恢复到就绪状态，也不一定被立即调度执行；

yield只是让当前对象回到就绪状态，还是有可能马上被再次被调用执行。

await/wait，它会一直阻塞在条件队列之上，之后某个线程调用对应的notify/signal方法，才会使得await/wait的线程回到就绪状态，也是不一定立即执行。



## 谁的方法：

yield和sleep方法都是Thread类的，而wait方法是Object类的，await方法是Condition显示条件队列的。

使用方法：注意condition是依赖ReentrantLock,使用起来更灵活


项目     | await/wait| Sleep|Yield
-------- | -----| -----|------
是否释放持有的锁| 释放|不释放|不释放|
调用后何时恢复| 唤醒后进入就绪状态|指定时间后|立刻进入就绪状态
谁的方法| Condition/Object|Thread|Thread
执行环境|同步代码块|任意位置|任意位置


