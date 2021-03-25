
import { HttpClient  } from '@angular/common/http';


export class ExtractData{

  static extract(res: Response){

      let body = res.json();
      console.log(`Body Data = ${body}`);
      return body || [];

  }

}
