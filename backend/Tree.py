import Search
class Node:
    def __init__(self,data,Object):
        self.left=None
        self.right=None
        self.data=data
        self.Object=Object
class Tree:
    def __init__(self):
        self.root=None

    def insert(self,leaf,data,Object):
        if leaf==None:
            leaf=Node(data,Object)
        else:
            aux=leaf.data
            if data<aux:
                leaf.left=self.insert(leaf.left,data,Object)
            else:
                leaf.right=self.insert(leaf.right,data,Object)
        return leaf

    def PostOrder(self,value,string):
        if value==None:
            return None
        else:
            self.PostOrder(value.left,string)
            self.PostOrder(value.right,string)
            
            print(value.data)
            result,string=Search.Search().search(string,value.Object)

            print(string)
            if result==False:
                return False


