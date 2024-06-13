## Etiquetas JSP para usar funcionalidades

```jsp
  <%@page contentType="text/html" pageEncoding="UTF-8" %>
```
- Esta etiqueta le dice al servidor que el tipo de contenido es un html y pone el encoding en UTF-8

---

```jsp
 <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
```
- Esta etiqueta nos permite usar un etiqueta especiales, como:
```jsp
<c:forEach items="Lista de datos" var="nombre del objeto">
</c:forEach>
```

---

```jsp
 <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
```
- Esta etiqueta nos permite usar un etiqueta especiales, como:
```jsp
<fmt:formatDate pattern="(formato)dd/MM/yyyy" value="fecha a dar formato"></fmt:formatDate>
```
- Esta etiqueta nos permite dar formato de una fecha ya que desde la BD viene con formato datetime.