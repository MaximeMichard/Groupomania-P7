import { Component, OnInit } from '@angular/core';
import { Userservice} from '../../services/user.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  constructor(private userService: Userservice) { }

  ngOnInit(): void {
  }

}
