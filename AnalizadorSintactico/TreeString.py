import Tree
import alphabet
# int v=10
# int v =10
# int v = 10


class Node:
    def __init__(self, value, alphabet):
        self.value = value
        self.alphabet = alphabet


class TreeString:

    def CreateTree(self):
        alphabets = [
            Node(31, [';']),
            Node(40, alphabet.Alphabet().GenerateLetters()),
            Node(26, [' ']),
            Node(29, ['g']),
            Node(30, ['n']),
            Node(28, ['i']),
            Node(24, ['r']),
            Node(25, ['t']),
            Node(23, ['S'])
        ]
        tree = Tree.Tree()
        for x in alphabets:
            tree.root = tree.insert(tree.root, x.value, x.alphabet)
        return tree

    def TreeAssign(self):
        alphabets = [
            Node(30, [';']),
            Node(31, ['"', "'"]),
            Node(25, alphabet.Alphabet().LetterWithSimbols()),
            Node(26, ['"', "'"]),
            Node(23, ['=']),
            Node(24, [' ']),
            Node(1, alphabet.Alphabet().GenerateLetters())
        ]
        tree = Tree.Tree()
        for x in alphabets:
            tree.root = tree.insert(tree.root, x.value, x.alphabet)
        return tree
