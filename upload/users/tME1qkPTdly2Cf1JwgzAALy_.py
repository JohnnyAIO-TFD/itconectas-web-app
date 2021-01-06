# Ejercicio 7
facturas = {} # ID, Monto
cobro = 0
deudas = 0
while(True):
    print("----------------------------")
    print("Facturas Pendientes:", cobro)
    print("Montos acumuladas:", deudas)
    print("----------------------------")
    print("1) Ingresar una factura")
    print("2) Pagar una factura")
    print("3) Salir")
    opcion = int(input("Ingrese su opción: "))
    if(opcion == 1):
        ID = input("Ingrese el numero de la factura: ")
        monto = float(input("Ingrese su monto: "))
        facturas[ID] = monto
        cobro = cobro + 1
        deudas = deudas + monto
    elif(opcion == 2):
        x = input("Ingrese el número de la factura: ")
        for lines in list(facturas.keys()):
            if(x == lines):
                print("Factura encontrada, el monto es: ", facturas.get(x))
                deudas = deudas - facturas.get(x)
                del facturas[x]
                cobro = cobro - 1
                break
            else:
                print("Lo sentimos factura no encontrada")
    elif(opcion == 3):
        break
    else:
        print("Lo sentimos, debe ingresar la opcion 3.")