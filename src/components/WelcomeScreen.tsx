
import React from 'react';
import Typewriter from 'typewriter-effect';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { Pen } from 'lucide-react';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in bg-gradient-to-b from-background to-secondary/20">
      <div className="text-center space-y-8 max-w-2xl glass-panel p-12">
        <div className="relative w-16 h-16 mx-auto mb-8">
          <Pen className="w-16 h-16 text-white/80 transform -rotate-45" />
        </div>
        <h1 className="text-5xl font-light mb-6 text-gradient">
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
          className="bg-white/10 hover:bg-white/20 text-white px-8 py-6 text-lg rounded-full group"
        >
          Começar a Escrever
        </Button>
      </div>
    </div>
  );
}
