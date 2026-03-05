import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: string;
}

@Component({
  selector: 'app-merchan-section',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './merchan-section.component.html',
  styleUrl: './merchan-section.component.scss'
})
export class MerchanSectionComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Producto[]>('./data/productos.json').subscribe({
      next: (data) => (this.productos = data),
      error: () => (this.productos = [])
    });
  }

  formatPrecio(precio: number): string {
    return precio.toFixed(2).replace('.', ',') + ' €';
  }
}
