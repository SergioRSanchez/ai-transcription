'use client'

// https://www.youtube.com/watch?v=eHz8ns_n_Fg

//  para a IA nós usamos a Transformers.js (https://github.com/xenova/transformers.js) indicada pelo Biro, que faz com que a gente use a IA em nosso navegador sem precisar usar a openIA, portanto é gratuita
//  O porém é que ela dá uma travada em nosso aplicação enquanto estiver fazendo a transcrição do áudio, e a transcrição pode demorar um pouco
//  essa ferramenta vai usar o Whisper IA
//  usamos o 'Automatic Speech Recognition'

import { useState } from 'react'
import axios from 'axios'

import { XCircle, CopySimple, CheckCircle, MagicWand } from '@phosphor-icons/react'

import { loadingMessage } from '@/function/loading-messages'
import { getVideoId, loadingVideo } from '@/function/youtube-api'
import { transcribeAudio } from '@/function/transcribe'
import { renderText } from '../function/render'


export default function Home() {
  const [ loading, setLoading ] = useState(false)
  const [ url, setUrl ] = useState('')
  const [ copyIcon, setCopyIcon ] = useState(true)

  function startLoading() {
    setLoading(true)
  }

  function stopLoading() {
    setLoading(false)
  }


  async function handleSubmit(e) {
    e.preventDefault()

    try {
      loadingMessage('Start application...')
      startLoading()

      await loadingVideo(url)

      loadingMessage('Connecting with server...')
      await axios.get(`http://localhost:3333/audio?v=${getVideoId(url)}`)

      const data = await transcribeAudio()
      renderText(data)
    } catch (error) {
      console.error(error)
    } finally {
      stopLoading()
    }
  }

  function handleCopy() {
    const text = document.querySelectorAll('#text p')
    const output = [...text].reduce((acc, text) => acc += text.innerText, "")
    navigator.clipboard.writeText(output)
    setCopyIcon(false)

    setTimeout(() => {
      setCopyIcon(true)
    }, 2000);
  }

  return (
    <div id='message' data-message='...' className={loading ? 'bg-background min-h-screen flex flex-col items-center pt-16 gap-10 overflow-y-hidden loading' : 'bg-background min-h-screen flex flex-col items-center pt-16 gap-10 overflow-y-hidden'}>
      <header className='flex items-center gap-2'>
        <MagicWand className='w-6 h-6 fill-text-primary' />
        <h1 className='text-text-primary text-lg sm:text-xl'>YouTube<span className='font-bold'>Transcription</span></h1>
      </header>

      <section>
        <form className='flex sm:gap-4 gap-1'>
          <input 
            value={url}
            onChange={e => setUrl(e.target.value)}
            required
            type="text" 
            placeholder='Cole a URL do YouTube aqui'
            className='text-text-primary text-xs sm:text-base underline underline-offset-[3px] placeholder:text-text-tertiary placeholder:no-underline sm:placeholder-shown:no-underline leading-6 sm:p-4 p-2 sm:w-96 w-52 rounded-lg border-2 border-surface-secondary hover:border-surface-tertiary bg-surface-primary focus:outline-none focus:border-brand-primary transition-all duration-300'
          />
          <button onClick={handleSubmit} type="submit" className='bg-brand-primary text-xs sm:text-base text-text-primary sm:px-6 px-5 sm:py-5 py-3 font-semibold rounded-lg shadow-[0_0_16px_0_rgba(151, 5, 234, 1)] hover:shadow-[0_0_32px_0_rgba(151,5,234,1)] transition-all duration-300'>Transcrever</button>
        </form>
      </section>

      <section className='bg-surface-primary sm:p-10 px-4 pt-6 pb-6 sm:pb-14 flex flex-col sm:flex-row gap-8 sm:mx-20 rounded-t-[4rem] h-[75vh] sm:h-[80vh]'>
        <div className='sm:flex-1'>
          {/* <Image src={YTPlayer} alt='YouTube Player' className='rounded-[2rem]' /> */}
          <video id='youtubeVideo' className='rounded-[2rem] aspect-video w-[355px] h-[288px] sm:w-[640px] sm:h-[360px] shadow-[0_4px_8px_0_rgba(0, 0, 0, 0.25)]'/>
        </div>

        <div className='sm:flex-1 relative overflow-y-auto text-text-secondary'>
          <button id='copy-button' onClick={handleCopy} className='bg-surface-secondary p-3 w-fit rounded-lg absolute top-1 right-4 hover:brightness-110 hover:scale-105 transition-all duration-300 cursor-pointer'>{copyIcon ? <CopySimple className='w-6 h-6 fill-text-primary' /> : <CheckCircle className='w-6 h-6 fill-text-primary' />}</button>
          <div id='text' className='flex flex-col gap-4 mt-14'>
            <div className='text-text-secondary text-xs flex gap-3 w-4/5 sm:w-11/12'>
              <time className='px-2 py-1 bg-surface-secondary w-fit h-fit rounded'>00:00</time>
              <p className='sm:text-base'>Consciousness is perhaps the biggest riddle in nature.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}