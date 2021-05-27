import TreeFloat
import Treeints
import TreeString
import Search
import Type
import Equals
import alphabet
import Logic
import CheckAssig
import Operation
import While
import write
from flask import Flask, jsonify, request, render_template
app = Flask(__name__)
# Trees for declare vars
Trees = [
    TreeFloat.TreeFloat().CreateTree(),
    TreeString.TreeString().CreateTree(),
    Treeints.TreeInt().CreateTree()
]
# Tree to assign a valor to a var
AssignTree = {
    'int': Treeints.TreeInt().TreeAssign(),
    'String': TreeString.TreeString().TreeAssign(),
    'float': TreeFloat.TreeFloat().TreeAssign()
}


def Is_there_letter(string):
    for x in string:
        if x in alphabet.Alphabet().GenerateLetters():
            return True
    return False
# Home route of the server


@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        data = request.get_json()  # Get Data from JS
        aux = data['cadena'].split('\n')
        lista = []
        for x in aux:
            for j in x.split(';'):
                if len(j) > 0:
                    lista.append(j)
        errores = []
        var = []
        count = 0
        lista,errores=While.While(lista).Search_While(errores)
        for l in lista:
            if '<' in l or '>' in l or '==' in l:
                if Logic.Logic().SintaxLogic(l):
                    # Check if they are the same typ
                    errores = Logic.Logic().CheckSintax(l, var, errores)
                else:
                    errores.append('Error de la sintaxis en '+l)
            if '=' in l and Equals.Equals(l).CheckString() == True:
                temp = l.split('=')
                if len(temp) < 2 or len(temp) > 2:
                    errores.append('Error de sintaxis'+l)
                else:
                    # we hake to check if the var has already been in the list
                    result, T, index = Search.Search(
                    ).Search_Name(var, temp[0])
                    if result == True:
                        # Check if the value is a number or a var
                        if Is_there_letter(temp[1]) and ('"' in l or "'" in l) == False:
                            if '+' in temp[1] or '-' in temp[1] or '*' in temp[1] or '/' in temp[1]:
                                errores, var = Operation.Operation(
                                    l).Convert(var, errores)
                            else:
                                errores, var = CheckAssig.Check().Check_Var_Var(l, T, index, errores, var, temp)
                        else:
                            if '+' in temp[1] or '-' in temp[1] or '*' in temp[1] or '/' in temp[1]:
                                errores, var = Operation.Operation(
                                    l).Convert(var, errores)
                            else:
                                errores, var = CheckAssig.Check().Check_Var_Value(
                                        l, AssignTree, errores, var, index, T, temp)
                    else:
                        errores.append('Error variable no declarada ' + l)
            if ('Write(' in l)==False and ('while' in l)==False and  l != '(' and l != ')' and l != '{' and l != '}' and ('=' in l) == False and ('<' in l or '>' in l) == False:
                errores, var = Type.Type().types(Trees, l, errores, var)
            
            if 'Write(' in l:
                errores=write.Write(l,var=var,errores=errores).CheckSintax()
                pass
            count=count+1
        return jsonify({'mensajes': errores})
    return render_template('index.html')


if __name__=='__main__':
    app.run(debug=True)
