## 前言

旧笔记本不打算用了，决定把上面留下来的旧硬盘废物利用，装在N5105上使用


## 正文
### 硬盘分区、格式化
首先我去笔记本那边pe把硬盘分区全部清除然后格式化了硬盘 （这一步也不可以不做，直接在pve shell fdisk清除也可以）。

![image-1683456893708](https://file.losey.top/blog/image-1683456893708.png)

如上图所示，我的新硬盘500G，设备` /dev/sda`
```
fdisk /dev/sda
```
先分区：输入n（分区） - 输入1（主分区）- 回车-回车 - 输入w（写入分区）

![image-1683457083113](https://file.losey.top/blog/image-1683457083113.png)

写入需要一定时间，完成后出现done。

把主分区1格式化（格式化为ext4格式）：
```
mkfs -t ext4 /dev/sda1
```
![image-1683457184733](https://file.losey.top/blog/image-1683457184733.png)

创建/mnt/sda1目录：
```
mkdir -p /mnt/sda1
```
挂载目录
```
mount -t ext4 /dev/sda1 /mnt/sda1
```

将挂载写入到系统启动项：
```
echo /dev/sda1 /mnt/sda1 ext4 dafaults 1 2 >> /etc/fstab
```

### 在数据中心挂载硬盘
如图下图添加后即可

![image-1683457368423](https://file.losey.top/blog/image-1683457368423.png)

![image-1683457343132](https://file.losey.top/blog/image-1683457343132.png)


