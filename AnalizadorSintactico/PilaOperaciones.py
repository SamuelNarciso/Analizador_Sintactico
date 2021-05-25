import Variables


class Operaciones():

    class Operando():
        def __init__(self, tipo, valor):
            self.tipo = tipo
            self.valor = valor
    pass

    def Tipo(self, elemento):
        try:
            valor = int(elemento)
        except:
            try:
                valor = float(elemento)
            except:
                valor = elemento
        return self.Operando(type(valor), valor)
    pass

    def Division(self, o1, o2):
        if((o1.tipo is o2.tipo) and (o1.tipo is float) and (o2.tipo is float)):
            return True, o1.valor / o2.valor

        if((o1.tipo is o2.tipo) and (o1.tipo is int) and (o2.tipo is int)):
            return True, int(o1.valor / o2.valor)

        if((o1.tipo is not o2.tipo) and (o1.tipo is int or o1.tipo is float)
           and (o2.tipo is int or o2.tipo is float)):
            return True, o1.valor / o2.valor

        return False, "Error, no se puede realizar la división"
    pass

    def Multiplicacion(self, o1, o2):
        if((o1.tipo is o2.tipo) and (o1.tipo is float) and (o2.tipo is float)):
            return True, o1.valor * o2.valor

        if((o1.tipo is o2.tipo) and (o1.tipo is int) and (o2.tipo is int)):
            return True, int(o1.valor * o2.valor)

        if((o1.tipo is not o2.tipo) and (o1.tipo is int or o1.tipo is float)
           and (o2.tipo is int or o2.tipo is float)):
            return True, o1.valor * o2.valor

        if(((o1.tipo is not o2.tipo) and (o1.tipo is int)
            and (o2.tipo is str))
            or
            ((o1.tipo is not o2.tipo) and (o1.tipo is str)
             and (o2.tipo is int))):
            return True, o1.valor * o2.valor

        return False, "Error, no se puede realizar la multiplicación"
    pass

    def Suma(self, o1, o2):
        if((o1.tipo is o2.tipo) and (o1.tipo is float) and (o2.tipo is float)):
            return True, o1.valor + o2.valor

        if((o1.tipo is o2.tipo) and (o1.tipo is int) and (o2.tipo is int)):
            return True, int(o1.valor + o2.valor)

        if((o1.tipo is not o2.tipo) and (o1.tipo is int or o1.tipo is float)
           and (o2.tipo is int or o2.tipo is float)):
            return True, o1.valor + o2.valor

        return True, str(o1.valor) + str(o2.valor)
    pass

    def Resta(self, o1, o2):
        if((o1.tipo is o2.tipo) and (o1.tipo is int or o1.tipo is float)
           and (o2.tipo is int or o2.tipo is float)):
            return True, o1.valor - o2.valor

        if((o1.tipo is not o2.tipo) and (o1.tipo is int or o1.tipo is float)
           and (o2.tipo is int or o2.tipo is float)):
            return True, o1.valor - o2.valor

        return False, "Error, no se puede realizar la resta"
    pass

    def Operar(self, pila):
        ops = int(len(pila) / 3)
        ops = 0

        for x in pila:
            if(x == '/' or x == '*' or x == '+' or x == '-'):
                ops = ops + 1

        print("Se harán", ops, "operaciones")
        try:
            for i in range(ops):
                # print(pila)
                elementos = pila[0:3]
                pila = pila[3:]
                o1 = self.Tipo(elementos[0].value)
                o2 = self.Tipo(elementos[2].value)
                op = elementos[1]

                if op == '/':
                    error, resultado = self.Division(o1, o2)
                elif op == '*':
                    error, resultado = self.Multiplicacion(o1, o2)
                elif op == '+':
                    error, resultado = self.Suma(o1, o2)
                elif op == '-':
                    error, resultado = self.Resta(o1, o2)

                pila.insert(0, Variables.Variables(
                    None, "temp", str(resultado)))
                if not error:
                    break
            pass

            return True, resultado
        except:
            return False, resultado

    pass


pass
