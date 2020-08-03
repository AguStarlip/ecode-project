import { Component, OnInit, ViewChild} from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { NgForm } from '@angular/forms'; 
import swal from 'sweetalert';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public title: string;

  @ViewChild('form') myForm: NgForm;

  constructor(
    private _messageService: MessageService
  ) {
    this.title = "Contacto";
  }

  ngOnInit(){
  }

  contactForm(form){
    this._messageService.sendMessage(form).subscribe(
      () => {
      swal("Formulario de contacto", "Mensaje enviado",'success');
      this.myForm.reset();
      },
      error => {
        console.log(<any>error);
      },
    );
  }

}
