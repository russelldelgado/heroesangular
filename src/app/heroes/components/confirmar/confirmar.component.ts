import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
  ]
})
export class ConfirmarComponent implements OnInit {

  //para poder recibir la información que se manda por el componente tenemos que inyectar estos sercivios 
  //recuerden que esta data es publica para que podamos usarla en el html , si fuera privada no prodríamos utilizarla en el.
  constructor(private dialogRef : MatDialogRef<ConfirmarComponent> , @Inject(MAT_DIALOG_DATA) public data: Heroe ) { }

  ngOnInit(): void {
    //esta es la data que vienen del componente padre que en este caso es el dialogo.
   //console.log('Información mandada del padre al hijo con la data');
   //console.log(this.data);
  }


  borrar(){
   // console.log("Estas a punto de borrar este elemento");
    //con esto le paso un argumento indicando que el usuario si que quiere borrar la app.
    this.dialogRef.close(true);


  }


  cerrar(){
    //console.log("Esta cerrando este elemento");
    this.dialogRef.close();
  }

}
