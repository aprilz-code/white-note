# 从头到尾打印链表
# 输入一个链表，按链表从尾到头的顺序返回一个ArrayList。

# 链表结构
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

# 打印链表
def printChain(head):
    node = head
    while node:
        print(node.val)
        node = node.next

class Solution:
    # 返回从尾部到头部的列表值序列，例如[1,2,3]
    def printListFromTailToHead(self, listNode):
        node = listNode
        list = []
        while node:
            list.insert(0, node.val)
            node = node.next
        return list
if __name__ == '__main__':
    # 创建链表
    l1 = ListNode(1)
    l2 = ListNode(2)
    l3 = ListNode(3)
    l1.next = l2
    l2.next = l3
    Solution().printListFromTailToHead(l1)
