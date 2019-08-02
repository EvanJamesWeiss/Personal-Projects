def findMult(v):
    result = 1
    for i in v:
        result = result * int(i)
    return result

def findPersistence(v):
    i = 0
    varr = v
    while(len(varr) > 1):
        j = findMult(varr)
        varr = list(str(j))
        i += 1
    return i

MostPersistence = 0
for i in range(0, 1000000000000):
    j = findPersistence(list(str(i)))
    if j > MostPersistence:
        MostPersistence = j
        print(str(i) + ": " + str(j))
