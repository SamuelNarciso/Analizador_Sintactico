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
class TreeString:

        def CreateTree(self):
                alphabets=[
                        Node(31,[';']),
                        Node(40,alphabet.Alphabet().GenerateLetters()),
                        Node(26,[' ']),
                        Node(29,['g']),
                        Node(30,['n']),
                        Node(28,['i']),
                        Node(24,['r']),
                        Node(25,['t']),
                        Node(23,['S'])
                        ]
                tree=Tree.Tree()
                for x in alphabets:
                        tree.root=tree.insert(tree.root,x.value,x.alphabet)
                return tree



c=TreeString()
d=c.CreateTree()
a="String aa;"
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


