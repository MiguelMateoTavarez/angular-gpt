import { environment } from "environments/environment.development";

export async function* prosConsStreamUseCase (prompt: string, abortSignal: AbortSignal) {
  try {
    const resp = await fetch(`${environment.backendApi}/gpt/pros-cons-discusser-stream`,{
      method: 'POST',
      headers:  {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt }),
      signal: abortSignal
    });

    if(!resp.ok) throw new Error('Something went wrong');

    const reader = resp.body?.getReader();

    if(!reader) throw new Error('The reader could not be generated');

    const decoder = new TextDecoder();

    let text = '';

    while(true) {
      const {value, done} = await reader.read();
      console.log(value);
      console.log(done);
      if(done) break;

      text += decoder.decode(value, {stream: true});
      console.log(text);
      yield text;
    }

    return null;

  }catch(error) {
    return {
      ok: false,
      question: prompt,
      answer: 'Error while trying to get the answer',
    }
  }
}
