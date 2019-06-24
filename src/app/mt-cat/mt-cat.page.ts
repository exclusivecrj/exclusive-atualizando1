import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as firebase from 'firebase';
import { Marcas } from '../model/marcas';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-mt-cat',
  templateUrl: './mt-cat.page.html',
  styleUrls: ['./mt-cat.page.scss'],
})
export class MtCatPage implements OnInit {

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
      duration: 1000
    });
    await loading.present();
  }

}



