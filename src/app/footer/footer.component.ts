import { Component, OnInit } from '@angular/core';

// function hello() {
//   alert("JS WORKING");
// }

// var lastScrollBottom = 0;
// let footer = document.getElementById('footer');
// window.addEventListener('scroll', function () {
//   var scrollBottom = Window.pageYOffset || document.documentElement.scrollBottom;
//   if (scrollBottom > lastScrollBottom) {
//     footer.style.bottom = '-324px';
//   } else {
//     footer.style.bottom = '0';
//   }
//   lastScrollBottom = scrollBottom;
// })



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // hello()
  }

}
