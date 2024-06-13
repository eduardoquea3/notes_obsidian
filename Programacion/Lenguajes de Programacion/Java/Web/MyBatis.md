---
banner: 
---
- La estructura del archivo **Mybatis-Config.xml** es la siguiente:
```xml
<!DOCTYPE configuration
PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>

  <typeAliases>
    <typeAlias alias="Entity" 
    type="pe.edu.sise.entity.Entity"/>
  </typeAliases>

  <environments default="conexion">
    <environment id="conexion">
      <transactionManager type="JDBC"></transactionManager>
        <dataSource type="POOLED">
          <property name="driver"
          value="com.mysql.cj.jdbc.Driver"/>
          <property name="url"
          value="jdbc:mysql://localhost/baseDeDatos"/>
          <property name="username" value="user"/>
          <property name="password" value="password"/>
        </dataSource>
    </environment>
  </environments>

  <mappers>
    <mapper resource="pe/edu/sise/mapper/EntityMapper.xml"/>
  </mappers>

</configuration>
```

---

- La etiqueta **mapper** referencia a un archivo donde se encuentras las instrucciones SQL:
```xml
<!DOCTYPE mapper
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="EntityMapper">

  <insert id="guardarEntity" parameterType="Entity">
        INSERT INTO table VALUES(null, #{propiedad}, 
        #{propiedad})
  </insert>

  <select id="listarEntity" resultType="Entity">
        SELECT * FROM table
  </select>

</mapper>
```
- El contenido del archivo anterior es cuando solo se agrega un registro y cuando se obtiene todos los registro de la base de datos, esto tomando en cuenta cuando las tablas en la base de datos no tenga una ***Foreign Key***.

### Tabla referenciada
- En el archivo que toma la tabla referenciada para sacar sus datos, se agrega una etiqueta **select** donde se le pasara un parámetro que se usara en la consulta para obtener un solo registro.
```xml
<!DOCTYPE mapper
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="EntityMapper">

  <insert id="guardarEntity" parameterType="Entity">
        INSERT INTO table VALUES(null, #{propiedad}, 
        #{propiedad})
  </insert>

  <select id="listarEntity" resultType="Entity">
        SELECT * FROM table
  </select>

  <select id="buscarEntity" resultType="Entity"
  parameterType="int">
        SELECT * FROM table WHERE Codigo = #{var}
  </select>

</mapper>
```
### Tabla relacionada
- En el archivo que toma la tabla que tiene la **Foreign Key** se agrega
```xml
<!DOCTYPE mapper
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="EntityMapper">

  <insert id="guardarEntity" parameterType="Entity">
        INSERT INTO table VALUES(null, 
        #{objeto.propiedad}, #{propiedad})
  </insert>

  <resultMap id="EntityMap" type="Entity">
    <association column="${1}" property="${2}"
    javaType="${3}" select="EntityMapper.buscarMascota">
    </association>
  </resultMap>

  <select id="listarEntity" resultMap="EntityMap">
        SELECT * FROM tbadopcion
  </select>

</mapper>
```
1. Este parámetro corresponde a el nombre de la columna en la base de datos.
2. Esta parámetro corresponde al nombre que tiene la instancia del objeto en la clase.
3. Es la clase a la cual pertenece el parámetro 2.

- Estos parámetros se agregan a un ***resultMap*** el cual realizara el intercambio de la **foreign key** en la base de datos por la clase que tenga relaciona obteniendo todos los datos para listar.
- El **select** tiene un parámetro ***resultMap*** que recibe como argumento en identificador del ***resultMap*** creado anteriormente.