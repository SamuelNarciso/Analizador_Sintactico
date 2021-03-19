import Tree
import alphabet
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
        def TreeAssign(self):
            alphabets=[
                    Node(40,[';']),
                    Node(41,alphabet.Alphabet().AlphabetNumber()),
                    Node(35,['.']),
                    Node(36,alphabet.Alphabet().AlphabetNumber()),
                    Node(33,['=']),
                    Node(34,[' ']),
                    Node(2,alphabet.Alphabet().GenerateLetters())
                    ]                                        
            tree=Tree.Tree()
            for x in alphabets:
                tree.root=tree.insert(tree.root,x.value,x.alphabet)
            return tree
