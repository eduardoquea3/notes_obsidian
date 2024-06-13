## Definición
- A través de los decoradores seremos capaces reducir las líneas de código duplicadas, haremos que nuestro código sea legible, fácil de testear, fácil de mantener y sobre todo, tendremos un código mucho más Pythonico.

```python
def funcion_a(funcion_b):
	def funcion_c():
		print('Antes de la ejecución de la función a                       decorar')
        funcion_b()
        print('Después de la ejecución de la función a                     decorar')
    return funcion_c
```

- Así decoramos una función:

```python
@funcion_a
def hola():
	print('Hola Mundo')
```

- y al ejecutar la función nos devuelve:

```text
Antes de la ejecución de la función a decorar
Hola Mundo
Después de la ejecución de la función a decorar
```

