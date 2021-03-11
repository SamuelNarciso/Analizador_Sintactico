import Tree
import alphabet
import ConvertString
#int v=10
#int v =10
#int v = 10
class Node:
        def __init__(self,value,alphabet):
                self.value=value
                self.alphabet=alphabet
class TreeFloat:
        def CreateTree(self):
                alphabets=[
                        Node(40,[';']),
                        Node(34,alphabet.Alphabet().GenerateLetters()),
                        Node(36,[' ']),
                        Node(37,['t']),
                        Node(35,['a']),
                        Node(29,['o']),
                        Node(30,['l']),
                        Node(25,['f'])
                        ]
                tree=Tree.Tree()
                for x in alphabets:
                        tree.root=tree.insert(tree.root,x.value,x.alphabet)
                return tree


c=TreeFloat()
d=c.CreateTree()
a="float aa;"
aux=a.split(' ')
l=[]
for x in  list(aux[0]):
    l.append(x)
l.append(' ')
l2=[]
for x in  aux[1]:
    if x!=';':
        l2.append(x)
l.append(l2)
l.append(';')
print(d.PostOrder(d.root,l))


