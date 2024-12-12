import { environment } from "environments/environment.development";

export const prosConsUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(`${environment.backendApi}/gpt/pros-cons-discusser`,{
      method: 'POST',
      headers:  {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    if(!resp.ok) throw new Error('Something went wrong');

    const data = await resp.json();

    return {
      ok: true,
      question: prompt,
      answer: data.answer,
    }

  }catch(error) {
    return {
      ok: false,
      question: prompt,
      answer: 'Error while trying to get the answer',
    }
  }
}
