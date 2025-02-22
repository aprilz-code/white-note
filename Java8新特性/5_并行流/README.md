### <center>并行流与顺序流
***
## 并行流

并行流就是把一个内容分成多个数据库，并用不同的线程分别处理每个数据块的流

Java8中将并行流进行了优化，我们可以很容易的对数据进行并行操作，Stream API可以声明性的通过parallel() 与 sequential() 在并行流与顺序流之间进行切换

## Fork/Join框架

### 概念

Fork/Join框架：就是在必要的情况下，将一个大任务，进行拆分(fork)成若干个小任务(拆到不可再拆时)，再将一个个小的任务运算的结果进行join汇总

![image-20200406121617329](https://cdn.losey.top/blog/image-20200406121617329.png)

### 采用 工作窃取 模式

当执行新的任务时，它可以将其拆分成更小的任务执行，并将小任务加到线程队列中，然后再从一个随机线程的队列中偷取一个并加入它自己的队列中

想对于一般的线程池实现，fork/join框架的优势体现在对其中包含的任务的处理方式上，在一般的线程池中，如果一个线程正在执行的任务由于某些原因无法继续运行，那么该线程会处于等待状态，而在fork/join框架实现中，如果某个子问题由于等待另外一个子问题的完成而无法继续运行，那么处理该子问题的线程会竹筒寻找其他尚未运行的子问题来执行，这种方式减少了线程的等待时间，提高了性能


当然在使用并行流时，请注意线程安全问题，否则可能导致并发修改异常等等