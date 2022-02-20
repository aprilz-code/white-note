# LRU缓存机制

## 来源

https://leetcode-cn.com/problems/lru-cache/

## 描述

运用你所掌握的数据结构，设计和实现一个  LRU (最近最少使用) 缓存机制。它应该支持以下操作： 获取数据 get 和 写入数据 put 。

获取数据 get(key) - 如果关键字 (key) 存在于缓存中，则获取关键字的值（总是正数），否则返回 -1。
写入数据 put(key, value) - 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字/值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。

>**进阶:** 你是否可以在 **O(1)** 时间复杂度内完成这两种操作？

```bash
LRUCache cache = new LRUCache( 2 /* 缓存容量 */ );

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // 返回  1
cache.put(3, 3);    // 该操作会使得关键字 2 作废
cache.get(2);       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得关键字 1 作废
cache.get(1);       // 返回 -1 (未找到)
cache.get(3);       // 返回  3
cache.get(4);       // 返回  4
```



## 代码

使用数组+哈希来实现，如果要时间复杂度为O(N)，可以使用 双向链表 + Hash来记录

```python
class LRUCache(object):

    def __init__(self, capacity):
        self.capacity = capacity
        self.map = {}
        self.array = []
        self.size = 0

    def get(self, key):
        if self.map.get(key):
            index = self.array.index(key)
            # 将该元素移动到最新使用的
            del self.array[index]
            self.array.append(key)
            return self.map.get(key)
        else:
            return -1

    def put(self, key, value):
        if self.size < self.capacity:
            if self.map.get(key):                                
                # 将该元素移动到最新使用的
                index = self.array.index(key)
                del self.array[index]
                self.array.append(key)
                # 更新key
                self.map[key] = value

            else:
                self.map[key] = value
                self.array.append(key)
                self.size += 1
        else:
            if self.map.get(key):
                # 将该元素移动到最新使用的
                index = self.array.index(key)
                del self.array[index]
                self.array.append(key)
                # 更新key
                self.map[key] = value

            else:
                # 淘汰第一个，在最后插入元素
                deleteKey = self.array.pop(0)
                del self.map[deleteKey]
                self.map[key] = value
                self.array.append(key)

if __name__ == '__main__':
    cache = LRUCache(2)
    print(cache.get(2))
    cache.put(2, 6)
    print(cache.get(1))
    cache.put(1, 5)
    cache.put(1, 2)
    print(cache.get(1))
    print(cache.get(2))
```

## 代码2

上面使用的是数组，我们知道使用数组的时间复杂度在O(n)，因为删除元素需要进行移动，那么我们就可以使用双向链表 + 哈希 来实现

```python
# 双向List
class Node(object):
    def __init__(self, val=None, key=None, left=None, right=None):
        # 键
        self.key = key
        # 值
        self.val = val
        self.left = left
        self.right = right

class LRUCache(object):
    def __init__(self, capacity):
        self.capacity = capacity
        self.map = {}
        self.array = []
        self.size = 0
        self.root = None

    def get(self, key):
        if self.map.get(key):
            node = self.map.get(key)
            # 判断要删除的是不是根节点
            if key != self.root.key:
                # 移除使用的节点，将其移动到最后
                leftNode = node.left
                rightNode = node.right
                leftNode.right = rightNode
                rightNode.left = leftNode

                # 将该节点放到最后
                leftRoot = self.root.left
                leftRoot.right = node
                node.left = leftRoot
                node.right = self.root
                self.root.left = node
                return node.val
            else:
                leftNode = node.left
                rightNode = node.right
                leftNode.right = rightNode
                rightNode.left = leftNode

                # 将该节点放到最后
                leftRoot = self.root.left
                rightRoot = self.root.right
                leftRoot.right = node
                node.left = leftRoot
                node.right = rightRoot
                self.root = rightRoot
                return node.val

        else:
            return -1

    def put(self, key, value):
        if self.size < self.capacity:
            if self.size == 0:
                # 插入的是第一个节点，那么就是root节点，双向循环链表
                node = Node()
                node.key = key
                node.val = value
                node.left = node
                node.right = node
                self.root = node
                self.map[key] = node
                self.size += 1
            elif self.map.get(key):
                # 将该元素移动到最新使用的
                node = self.map.get(key)
                node.val = value

                # 判断要删除的是不是根节点
                if key != self.root.key:
                    # 移除使用的节点，将其移动到最后
                    leftNode = node.left
                    rightNode = node.right
                    leftNode.right = rightNode
                    rightNode.left = leftNode

                    # 将该节点放到最后
                    leftRoot = self.root.left
                    leftRoot.right = node
                    node.left = leftRoot
                    node.right = self.root
                    self.root.left = node
                    self.map[key] = node
                else:
                    leftNode = node.left
                    rightNode = node.right
                    leftNode.right = rightNode
                    rightNode.left = leftNode

                    # 将该节点放到最后
                    leftRoot = self.root.left
                    rightRoot = self.root.right
                    leftRoot.right = node
                    node.left = leftRoot
                    node.right = rightRoot
                    self.root = rightRoot
                    self.map[key] = node

                # # 将该元素移动到最新使用的
                # node = self.map.get(key)
                # # 更新元素中的值
                # node.val = value
                # node.key = key
                # # 移除使用的节点，将其移动到最后
                # leftNode = node.left
                # rightNode = node.right
                # leftNode.right = rightNode
                # rightNode.left = leftNode
                #
                # # 将该节点放到最后
                # leftRoot = self.root.left
                # leftRoot.left = node
                # node.left = leftRoot
                # node.right = self.root
                # self.root.left = node


            else:
                leftRoot = self.root.left
                node = Node()
                node.val = value
                node.key = key
                node.left = leftRoot
                node.right = self.root
                leftRoot.right = node
                self.root.left = node
                self.map[key] = node
                self.size += 1
        else:
            # 以下代码是淘汰策略，当不需要淘汰的时候
            if self.map.get(key):
                # 将该元素移动到最新使用的
                node = self.map.get(key)

                leftRoot = self.root.left
                rightRoot = self.root.right

                # 更新元素中的值
                node.val = value
                # 移除使用的节点，将其移动到最后
                leftNode = node.left
                rightNode = node.right
                leftNode.right = rightNode
                rightNode.left = leftNode

                # 将该节点放到最后
                leftRoot = self.root.left
                leftRoot.left = node
                node.left = leftRoot
                node.right = rightRoot
                self.root.left = node
                self.root = rightNode

            else:
                deleteKey = self.root.key
                del self.map[deleteKey]
                leftRoot = self.root.left
                rightRoot = self.root.right
                node = Node()
                node.key = key
                node.val = value
                node.left = leftRoot
                node.right = rightRoot
                leftRoot.right = node
                rightRoot.left = node
                self.root = rightRoot
                self.map[key] = node
                self.size += 1


if __name__ == '__main__':
    cache = LRUCache(2)
    cache.put(1, 1)
    cache.put(2, 2)
    print(cache.get(1))
    cache.put(3, 3)
    print(cache.get(2))
    cache.put(4, 4)
    print(cache.get(1))
    print(cache.get(3))
    print(cache.get(4))
```

