import { environment } from "environments/environment.development";

export async function* prosConsStreamUseCase (prompt: string) {
  try {
    const resp = await fetch(`${environment.backendApi}/gpt/pros-cons-discusser-stream`,{
      method: 'POST',
      headers:  {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    console.log(resp);

    if(!resp.ok) throw new Error('Something went wrong');

    const reader = resp.body?.getReader();

    if(!reader) {
      console.log('The reader couldn\'t be created');
      throw new Error('The reader couldn\'t be created');
    }

    const decode  = new TextDecoder();
    let text = '';

    while(true){
      const {value, done} = await reader.read();

      if(done) break;

      text += decode.decode(value);
      yield text;
    }

    return JSON.parse(text);

  }catch(error) {
    return {
      ok: false,
      question: prompt,
      answer: 'Error while trying to get the answer',
    }
  }
}
