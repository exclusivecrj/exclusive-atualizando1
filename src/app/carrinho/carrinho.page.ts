import { Component, OnInit } from '@angular/core';
import { Pedido } from '../model/pedido';
import { StorageService } from '../service/storage.service';
import { roupas } from '../model/roupas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  pedido : Pedido = new Pedido();

  constructor(public storageServ:StorageService,
    public router : Router,){
    this.pedido = storageServ.getCart();
    
   }

  ngOnInit() {
  }

  removeCar(r : roupas){
    console.log(r)
    this.storageServ.setRemoveCart(r);
    this.pedido = this.storageServ.getCart();
  }

  cart(){
    this.router.navigate(['/carrinho'])
  }
  search(){
    this.router.navigate(['/roupas'])
  }
  contact(){
    this.router.navigate(['/quem'])
  }
  logout(){
    this.router.navigate(['/logoff'])
  }

}
