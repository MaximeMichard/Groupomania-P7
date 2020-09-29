import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable} from'@angular/core';
import { Media} from '../models/media.model';
import { Userservice } from '../services/user.service';
import { urlApi } from '../config';

@Injectable()

export class Mediaservice{
    constructor(private HttpClient: HttpClient,
                ){}
}
