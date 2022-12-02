import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  loginform:FormGroup;
  user:any
 
  vi=true
  va=true
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.loginform = new FormGroup({
      
      Email: new FormControl(),
      Motdepasse: new FormControl()
    });
  }
  visible1(){
     
     this.vi=false 
      
  }
  visible2(){
    this.va=false
  }
loginuser(){
  
    
   
    } 
    
  
}

