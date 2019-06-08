import { Component, OnInit } from '@angular/core';
import { Marcas } from '../model/marcas';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-marca-view',
  templateUrl: './marca-view.page.html',
  styleUrls: ['./marca-view.page.scss'],
})
export class MarcaViewPage implements OnInit {

  marcas: Marcas = new Marcas();
  id: string;
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  formGroup: FormGroup; // <---

  constructor(public activateRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public router : Router,
    public loadingController : LoadingController) { // <---
    this.id = this.activateRoute.snapshot.paramMap.get('marcas');
    this.form();
  }

  form() {
    this.formGroup = this.formBuilder.group({
      nome: [this.marcas.nome],
     
    });
  }

  ngOnInit() {
    this.obterMarca();
  }

  obterMarca() {
    var ref = firebase.firestore().collection("marcas").doc(this.id);
    ref.get().then(doc => {
      this.marcas.setDados(doc.data());
      this.form();
    }).catch(function (error) {
      console.log("Error getting document: ", error);
    });
  }

  atualizar(){
    this.loading();
    let ref = this.firestore.collection('marcas')
    ref.doc(this.id).set(this.formGroup.value)
      .then(() =>{
        console.log('finalização de compra');
        this.router.navigate(['/finaliza-compra']);
      }).catch(()=>{
        console.log('Erro ao Atualizar');
      })
  }

  async loading() {
    const loading = await this.loadingController.create({
      message: 'Redirecionando',
      duration: 2000
    });
    await loading.present();
  }

}

