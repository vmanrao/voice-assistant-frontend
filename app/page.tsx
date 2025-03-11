'use client'

import { useState } from 'react'
import { Mic, MicOff } from 'lucide-react'

export default function Home() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')

  const toggleListening = () => {
    if (!isListening) {
      startListening()
    } else {
      stopListening()
    }
  }

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('')
        setTranscript(transcript)
      }

      recognition.onerror = (event: any) => {
        console.error(event.error)
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } else {
      alert('Speech recognition is not supported in this browser.')
    }
  }

  const stopListening = () => {
    setIsListening(false)
    // Add logic to stop recognition
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">Voice Assistant</h1>
        
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <div className="flex justify-center mb-4">
            <button
              onClick={toggleListening}
              className={`p-4 rounded-full transition-colors ${
                isListening
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isListening ? (
                <MicOff className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-gray-500 mb-2">
              {isListening ? 'Listening...' : 'Click the microphone to start'}
            </p>
            {transcript && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-800">{transcript}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}