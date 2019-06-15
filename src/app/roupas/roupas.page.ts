import { Component, OnInit } from '@angular/core';
import { roupas } from '../model/roupas';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { LoadingController, ToastController, IonInfiniteScroll } from '@ionic/angular';
import { Pedido } from '../model/pedido';
import { StorageService } from '../service/storage.service';
import { Item } from '../model/item';
import { ViewChild } from '@angular/core';



@Component({
  selector: 'app-roupas',
  templateUrl: './roupas.page.html',
  styleUrls: ['./roupas.page.scss'],
})
export class RoupasPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  roupas: roupas = new roupas();
  listaDeRoupas: roupas[] = [];
  firestore = firebase.firestore();
  imagem;
  settings = { timestampsInSnapshots: true };

  pedido: Pedido = new Pedido();

  constructor(public router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public storageServ: StorageService) {
    console.log(this.pedido);
    
      if(this.storageServ.getCart()==null){
        this.pedido = this.storageServ.getCart()
      }else{
        this.pedido.itens = [];
      }
    
    
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.loadData.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
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

        let ref = firebase.storage().ref().child(`roupas/${doc.id}.jpg`).getDownloadURL().then(url => {
          r.img = url;

          this.listaDeRoupas.push(r);
        }).catch(err=>{
          this.listaDeRoupas.push(r);
        })
        

      });
      this.loadingController.dismiss();

    });

  }

  viewRoupa(obj: roupas) {
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

    console.log(roupas);


    if (this.pedido == null) {
      this.pedido = new Pedido();
      this.pedido.itens = [];
    }

    this.pedido.itens.forEach(p => {
      if (p.roupas.id == roupas.id) {
        add = false;
      }

     
    })

    if (add == true) this.pedido.itens.push(i);

    
    this.storageServ.setCart(this.pedido);
    console.log(this.pedido);
 }

 downloadFoto() {
  let ref = firebase.storage().ref()
    .child(`pratos/${this.roupas.id}.jpg`);

  ref.getDownloadURL().then(url => {
    this.imagem = url;
  })
}
}
