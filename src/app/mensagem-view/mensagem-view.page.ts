import { Component, OnInit } from '@angular/core';
import { Mensagem } from '../model/mensagem';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensagem-view',
  templateUrl: './mensagem-view.page.html',
  styleUrls: ['./mensagem-view.page.scss'],
})
export class MensagemViewPage implements OnInit {

  mensagem: Mensagem = new Mensagem();
  id: string;
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  formGroup: FormGroup;

  constructor(public activateRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public router: Router,
    public loadingController: LoadingController) {
    this.id = this.activateRoute.snapshot.paramMap.get('mensagem');
    this.form();
  }

  form() {
    this.formGroup = this.formBuilder.group({
      titulo: [this.mensagem.titulo],
      texto: [this.mensagem.texto],
      data: [this.mensagem.data]
    });
  }

  ngOnInit() {
    this.obterMensagem();
  }

  obterMensagem() {
    var ref = firebase.firestore().collection("mensagem").doc(this.id);
    ref.get().then(doc => {
      this.mensagem.setDados(doc.data());
      this.form();
    }).catch(function (error) {
      console.log("Error getting document: ", error);
    });
  }

  atualizar() {
    this.loading();
    let ref = this.firestore.collection('mensagem')
    ref.doc(this.id).set(this.formGroup.value)
      .then(() => {
        console.log('Atualizado com sucesso');
        this.router.navigate(['/lista-de-mensagem']);
      }).catch(() => {
        console.log('Erro ao Atualizar');
      })
  }

  async loading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 2000
    });
    await loading.present();
  }

}