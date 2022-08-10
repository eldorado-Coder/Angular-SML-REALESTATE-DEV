import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  hidden = true;
  upHidden = true;
  addDecoration: boolean;
  authForm: FormGroup;

  // default sing up so start false
  inHidden = false;
  noDecoration = false;
  passwordHidden = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.authForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.maxLength(254)])]
    })
  }

  signOverlay(): any {
    if (this.hidden) {
      this.hidden = false;
      // console.log('click')
    }
  }

  closeForm(): any {
    this.hidden = true;
  }

  signIn(): any {
    if (this.inHidden = true) {
      this.inHidden = false;
      this.upHidden = true;
      this.noDecoration = false;
      this.addDecoration = false;
      // console.log("inhidden click heard")
    }
  }

  signUp(): any {
    if (this.upHidden) {
      this.upHidden = false;
      this.inHidden = true;
      this.noDecoration = true;
      this.addDecoration = true;
      // console.log("uphidden click heard")
    }
  }

  hoverLink(el): any {
    const parentLink = el.path.filter((element) => {
      const elem = element.className;
      return  elem && (elem.indexOf('lease-links-all') !== -1 || elem.indexOf('buy-links-all') !== -1);
    });
    if (parentLink[0]) {
      parentLink[0].classList.add('active');
      parentLink[0].children[0].classList.add('active');
    }
  }

  removeHoverLink(el): any {
    el.target.classList.remove('active');
    el.target.classList.remove('active');
  }

}
