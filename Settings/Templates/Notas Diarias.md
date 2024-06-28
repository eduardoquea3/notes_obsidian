---
tags:
  - "#Habitos"
Leer: "false"
Ejercicios: "false"
Beber agua: "false"
Meditar: "false"
---
# Nota <% tp.date.now("DD-MM-YYYY") %>


<< [[Notas/Diarias/<% fileDate = moment(tp.file.title, 'YYYY-MM-DD').subtract(1, 'd').format('YYYY-MM-DD') %>|Yesterday]] | [[Notas/Diarias/<% fileDate = moment(tp.file.title, 'YYYY-MM-DD').add(1, 'd').format('YYYY-MM-DD') %>|Tomorrow]] >>


## Lista de objetivos
---
- [ ] Leer 10 paginas de un libro
- [ ] Hacer ejercicios 30 minutos
- [ ] Beber agua
- [ ] Meditar

## Lista de series o peliculas nuevas
---
- <% tp.file.cursor() %>


## Ejercicios diarios
---
- [ ] Abdominales
- [ ] Flexiones
- [ ] Planchas
- [ ] Levantar pesas
- [ ] Abdominales dobles


---
<% tp.file.last_modified_date() %>