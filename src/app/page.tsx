'use client'

import Image from 'next/image'

import { XCircle, CopySimple, CheckCircle, MagicWand } from '@phosphor-icons/react'

import YTPlayer from '@/assets/yt-player.png'

export default function Home() {
  return (
    <div className='bg-background min-h-screen flex flex-col items-center pt-16 gap-10 overflow-y-hidden'>
      <header className='flex items-center gap-2'>
        <MagicWand className='w-6 h-6 fill-text-primary' />
        <h1 className='text-text-primary text-lg sm:text-xl'>YouTube<span className='font-bold'>Transcription</span></h1>
      </header>

      <section>
        <form className='flex sm:gap-4 gap-1'>
          <input 
            type="text" 
            placeholder='Cole a URL do YouTube aqui'
            className='text-text-primary text-xs sm:text-base underline underline-offset-[3px] placeholder:text-text-tertiary placeholder:no-underline sm:placeholder-shown:no-underline leading-6 sm:p-4 p-2 sm:w-96 w-52 rounded-lg border-2 border-surface-secondary hover:border-surface-tertiary bg-surface-primary focus:outline-none focus:border-brand-primary transition-all duration-300'
          />
          <button type="submit" className='bg-brand-primary text-xs sm:text-base text-text-primary sm:px-6 px-5 sm:py-5 py-3 font-semibold rounded-lg shadow-[0_0_16px_0_rgba(151, 5, 234, 1)] hover:shadow-[0_0_32px_0_rgba(151,5,234,1)] transition-all duration-300'>Transcrever</button>
        </form>
      </section>

      <section className='bg-surface-primary sm:p-10 px-4 pt-6 pb-6 sm:pb-14 flex flex-col sm:flex-row gap-8 sm:mx-20 rounded-t-[4rem] h-[75vh] sm:h-[80vh]'>
        <div className='sm:flex-1'>
          <Image src={YTPlayer} alt='YouTube Player' className='rounded-[2rem]' />
        </div>

        <div className='sm:flex-1 relative flex flex-col gap-4 overflow-y-auto'>
          <div className='bg-surface-secondary p-3 w-fit rounded-lg absolute top-1 right-4 hover:brightness-110 hover:scale-105 transition-all duration-300 cursor-pointer'><CopySimple className='w-6 h-6 fill-text-primary' /></div>
          <div className='text-text-secondary text-xs flex gap-3 w-4/5 sm:w-11/12'>
            <span className='px-2 py-1 bg-surface-secondary w-fit h-fit rounded'>00:00</span>
            <span className='sm:text-base'>Consciousness is perhaps the biggest riddle in nature.</span>
          </div>
          <div className='text-text-secondary text-xs flex gap-3 w-4/5 sm:w-11/12'>
            <span className='px-2 py-1 bg-surface-secondary w-fit h-fit rounded'>00:04</span>
            <span className='sm:text-base'>Stripped to its core meaning,</span>
          </div>
          <div className='text-text-secondary text-xs flex gap-3 w-4/5 sm:w-11/12'>
            <span className='px-2 py-1 bg-surface-secondary w-fit h-fit rounded'>00:06</span>
            <span className='sm:text-base'>consciousness is what allows us to be aware both of our surroundings</span>
          </div>
        </div>
      </section>
    </div>
  )
}