import Tree
import alphabet
import ConvertFormat
class Node:
        def __init__(self,value,alphabet):
                self.value=value
                self.alphabet=alphabet
class TreeInt:
        def CreateTree(self):
                alphabets=[
                        Node(21,[';']),
                        Node(22,alphabet.Alphabet().GenerateLetters()),
                        Node(20,[' ']),
                        Node(18,['t']),
                        Node(19,['n']),
                        Node(17,['i'])

                        ]
                tree=Tree.Tree()
                for x in alphabets:
                        tree.root=tree.insert(tree.root,x.value,x.alphabet)
                return tree



