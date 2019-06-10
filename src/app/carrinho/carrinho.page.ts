import { Component, OnInit } from '@angular/core';
import { Pedido } from '../model/pedido';
import { StorageService } from '../service/storage.service';
import { roupas } from '../model/roupas';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  pedido : Pedido = new Pedido();

  constructor(public storageServ:StorageService){
    this.pedido = storageServ.getCart();
    
   }

  ngOnInit() {
  }

  removeCar(r : roupas){
    console.log(r)
    this.storageServ.setRemoveCart(r);
    this.pedido = this.storageServ.getCart();
  }

}
