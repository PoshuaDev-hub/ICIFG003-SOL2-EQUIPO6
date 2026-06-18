En application.properties

//esto genera un directorio logs donde esta el archivo del .jar (en producción) o en la carpeta del proyecto (en dev)

logging.file.name=logs/bff.log



En class que me interese hacer logger

import org.slf4j.Logger;

import org.slf4j.LoggerFactory;

//declaramos atributo en class

public class BffProyectoActividadController {

private Logger logger = LoggerFactory.getLogger(BffProyectoActividadController.class);



Ejemplo de uso en un metodo

 @GetMapping("/findById/{id}")

  public ResponseEntity<ActividadDTO> ProyectoActividadFindById(@PathVariable("id") Long id) {

  logger.info("SISTEMA-PLANIFICACION BFF BffProyectoActividadController ProyectoActividadFindById id " + id);

