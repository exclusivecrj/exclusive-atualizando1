import { Component, OnInit } from '@angular/core';
import { roupas } from '../model/roupas';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Pedido } from '../model/pedido';
import { StorageService } from '../service/storage.service';
import { Item } from '../model/item';

@Component({
  selector: 'app-roupas',
  templateUrl: './roupas.page.html',
  styleUrls: ['./roupas.page.scss'],
})
export class RoupasPage implements OnInit {

  listaDeRoupas: roupas[] = [];
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  pedido: Pedido = new Pedido();

  constructor(public router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public storageServ: StorageService) {
    console.log(this.pedido);

    this.pedido = this.storageServ.getCart()

  }


  ngOnInit() {
    this.getList();
  }

  async loading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 2000
    });
    await loading.present();
  }

  async toast(msg: string) {
    const toast = await this.toastController.create({
      message: 'Cadastrado com sucesso!',
      duration: 2000
    });
    toast.present();
  }

  getList() {
    this.loading();

    var ref = firebase.firestore().collection("roupas");
    ref.get().then(query => {
      query.forEach(doc => {
        let r = new roupas();
        r.setDados(doc.data());
        r.id = doc.id;
        this.listaDeRoupas.push(r);
      });
      this.loadingController.dismiss();

    });

  }

  viewClienteRoupa(obj: roupas) {
    this.router.navigate(['/roupa-view', { 'roupas': obj.id }]);

  }

  remove(obj: roupas) {
    var ref = firebase.firestore().collection("roupas");
    ref.doc(obj.id).delete()
      .then(() => {
        this.listaDeRoupas = [];
        this.getList();
      }).catch(() => {
        console.log('Erro ao atualizar');
      })
  }

  addCarrinho(roupas: roupas) {
    this.pedido = this.storageServ.getCart();
    let add = true;

    let i = new Item();
    i.roupas = roupas;
    i.quantidade = 1;


    if (this.pedido == null) {
      this.pedido = new Pedido();
      this.pedido.itens = [];
    }

    this.pedido.itens.forEach(p => {
      if (p.roupas.id = roupas.id) {
        add = false;
      }

      if (add == true) this.pedido.itens.push(i);

      this.pedido.itens.push(i);
      this.storageServ.setCart(this.pedido);
      console.log(this.pedido);
    })
 }

}
