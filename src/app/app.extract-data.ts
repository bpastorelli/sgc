export class ExtractData{

  static extract(res: Response){

      console.log(res)

      let body = res.json;
      console.log(`Body Data = ${body}`);
      return body || [];

  }

}
