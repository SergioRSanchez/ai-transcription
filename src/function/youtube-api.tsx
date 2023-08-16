import { loadingMessage } from './loading-messages';

declare global {
  interface Window {
    YTPlayer: YT.Player | null;
  }
}

if (typeof window !== 'undefined') {
  var tag = document.createElement('script');
  
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  
  window.YTPlayer = null
}

export function getVideoId(url: string) {
  const [part1, part2] = url.split('?v=')
  const [videoId, rest] = part2.split('&')
  return videoId
}
export function loadingVideo(url: string): Promise<void> {
  loadingMessage('Carregando vídeo do YouTube...')

  return new Promise ((resolve, reject) => {
    window.YTPlayer = new YT.Player('youtubeVideo', {
      videoId: getVideoId(url),
      events: {
        'onReady': () => resolve(),
      }

  })

  })
}