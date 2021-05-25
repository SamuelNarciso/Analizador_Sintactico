# This class is for format the float vars
class Float:
    def Convert(self, St, sr):
        new_array = []
        numbers = []
        with_out_dot = False
        for letter in St:
            if letter != '.':
                numbers.append(letter)
            else:
                with_out_dot = True
                new_array.append(numbers)
                new_array.append(letter)
                numbers = []
        if len(numbers) > 0:
            new_array.append(numbers)
        if with_out_dot == False:
            new_array.append('.')
            new_array.append('0')
        # Deleting the last element of the main list
        sr.pop()
        sr.pop()
        for element in new_array:
            if len(element) == 1:
                sr.append(element[0])
            else:
                sr.append(element)
        sr.append(';')
        return sr
