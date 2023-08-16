interface Chunk {
  timestamp: [number, number];
  text: string
}

interface YTPlayer {
  seekTo(time: number): void;
  playVideo(): void
}

function renderChunk(chunk: Chunk): string {
  return `
    <div class="chunk flex">
      <time class="flex">${getMinutes(chunk.timestamp)}</time>
      <p>
        ${groupedText(chunk.text, chunk.timestamp)}
      </p>
    </div>
  `;
}

function getMinutes(timestamp: [number, number]): string {
  let date = new Date(null)
  date.setTime(timestamp[0] * 1000)
  return date.toISOString().slice(14, 19)
}

if (typeof window !== 'undefined') {
  window.seek = function (event: MouseEvent) {
    const seekTo = Number(event.currentTarget?.dataset?.seekTo)
    if (!isNaN(seekTo) && window.YTPlayer) {
      window.YTPlayer.seekTo(seekTo)
      window.YTPlayer.playVideo()
    }
  }
}

function groupedText(text: string, timestamp: [number, number]): string {
  const words = text.split(" ")

  const groups: string[] = []

  for (let index = 0; index < words.length; index += 1) {
    if (index % 3 === 0) {
      groups.push(words.slice(index, index + 3).join(" "))
    }
  }
  
  return groups.map((item, index) => {
    const [initialTime, finalTime] = timestamp
    const seekTo = index == 0 ? initialTime : (((finalTime - initialTime) / (groups.length - index)) + initialTime)
    return `<span onClick=seek(event) data-seek-to=${seekTo}>${item} </span>`
  }).join("")
}

export function renderText({ chunks }: {chunks: Chunk[]}): void {
  const formattedTranscription = chunks.map(renderChunk).join("")

  const textElement =  document.getElementById('text')
  if (textElement) {
    textElement.innerHTML = formattedTranscription
  }
}