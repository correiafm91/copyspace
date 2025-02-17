
import React from 'react';
import Typewriter from 'typewriter-effect';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { Target } from 'lucide-react';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="text-center space-y-6 max-w-2xl">
        <Target className="w-12 h-12 mx-auto mb-4" />
        <h1 className="text-4xl font-light mb-4 text-note-text">
          <Typewriter
            options={{
              strings: ['Bem-vindo ao seu Editor|'],
              autoStart: true,
              loop: false,
              deleteSpeed: 50,
            }}
          />
        </h1>
        <Button
          onClick={() => navigate('/notes')}
          className="bg-black text-white hover:bg-black/80 px-8 py-6 text-lg"
        >
          Começar a Escrever
        </Button>
      </div>
    </div>
  );
}
