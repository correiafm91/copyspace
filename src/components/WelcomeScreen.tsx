
import React from 'react';
import Typewriter from 'typewriter-effect';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { Target, ArrowRight } from 'lucide-react';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in bg-gradient-to-b from-background to-secondary/20">
      <div className="text-center space-y-8 max-w-2xl glass-panel p-12">
        <Target className="w-16 h-16 mx-auto mb-8 text-white/80" />
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
        <p className="text-lg text-white/60 mb-8">
          Organize suas ideias, crie notas e gerencie suas tarefas em um só lugar.
        </p>
        <Button
          onClick={() => navigate('/notes')}
          className="bg-white/10 hover:bg-white/20 text-white px-8 py-6 text-lg rounded-full group"
        >
          Começar a Escrever
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
