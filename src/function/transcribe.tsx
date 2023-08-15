import { pipeline } from '@xenova/transformers'

import { loadingMessage } from './loading-messages'

// let data = null
import data from '@/data.json'

export async function transcribeAudio() {
  const options = {
    chunk_length_s: 30,
    stride_length_s: 5,
    language: 'portuguese',
    task: 'transcribe',
    return_timestamps: true
  }

  try {
    console.time()
    loadingMessage('Initializing audio transcription. This can take a few minutes')
    console.log('START TRASCRIPTION')

    //  Xenova (não funcionou para mim)
    // const transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-small')
    // data = await transcriber('../audio.mp3', options)
  } catch (error) {
    console.error('ERROR: ', error)
    throw new Error(error)
  } finally {
    console.timeEnd()
    loadingMessage('Transcribing finish')
    console.log('FINISH TRASCRIPTION')
    return data
  }
}