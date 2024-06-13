### La estructura principal de un Servlet es:
```java
package pe.edu.sise.servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "NameServlet", urlPatterns = { "/ruta" })
public class VentaServlet extends HttpServlet {

  protected void processRequest(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
  }

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
    processRequest(request, response);
  }

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
    processRequest(request, response);
  }

  @Override
  public String getServletInfo() {
    return "Short description";
  }

}
```

- En el **protected void *processRequest*** se pone lo siguiente:
```java
  protected void processRequest(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
	 //si el servlet es de reportes agrega esto
	 response.setContentType("application/pdf");
	 //
    String url = request.getServletPath();
    if (url.equals("/ruta")) {
      ruta(request, response);
    }
  }
```
