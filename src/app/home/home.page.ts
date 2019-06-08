import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('email') email;
  @ViewChild('senha') senha;

  @ViewChild(IonSlides) slides: IonSlides;

  constructor(public router: Router,
    public fire: AngularFireAuth) {
  }

  slideOpts = {
    initialSlide: 1,
    speed: 500
  };

  proximo(){
    this.slides.slideNext();
  }

  anterior(){
    this.slides.slidePrev();
  }

  logar() {

    this.fire.auth.signInWithEmailAndPassword(this.email.value, this.senha.value)
      .then(() => {
        console.log('Logado com sucesso');
        this.router.navigate(['/nossas-marcas']);
      })
      .catch(() => {
        console.log('Login Inválido');
      })
  }

  cadastrar() {
    this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.senha.value)
      .then(() => {
        console.log("Cadastrado com sucesso!");
      }).catch(() => {
        console.log("Usuário inválido");
      })
  }

}

