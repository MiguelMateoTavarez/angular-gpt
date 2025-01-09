import type { TranslateResponse } from '@interfaces/index';
import { environment } from "environments/environment.development";

export const translateUseCase = async (prompt: string, lang: string) => {
  try {
    const resp = await fetch(`${environment.backendApi}/gpt/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt, lang })
    });

    if (!resp.ok) throw new Error('The translate could not be done');

    const {origin, message} = await resp.json() as TranslateResponse;

    return {
      ok: true,
      origin,
      message,
    }

  } catch (error) {
    return {
      ok: false,
      message: 'The translate could not be done',
    }
  }
}
