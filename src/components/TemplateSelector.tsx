
import React from 'react';
import { Button } from './ui/button';
import { Mail, Layout, MessageSquare, Send } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  icon: React.ReactNode;
  content: string;
}

const templates: Template[] = [
  {
    id: 'bio',
    name: 'Bio',
    icon: <MessageSquare className="w-6 h-6" />,
    content: `# Bio Profissional

• Experiência em...
• Especializado em...
• Habilidades em...`
  },
  {
    id: 'landing',
    name: 'Landing Page',
    icon: <Layout className="w-6 h-6" />,
    content: `# Título Principal

## Benefício Principal

Descrição do benefício...

## Chamada para Ação

[Botão de Ação]`
  },
  {
    id: 'ad',
    name: 'Anúncio',
    icon: <Send className="w-6 h-6" />,
    content: `🔥 Headline Chamativa

💡 Proposta de Valor

✨ Benefícios

🎯 CTA`
  },
  {
    id: 'email',
    name: 'Email',
    icon: <Mail className="w-6 h-6" />,
    content: `Assunto: 

Prezado [Nome],

[Corpo do email]

Atenciosamente,
[Seu nome]`
  }
];

interface TemplateSelectorProps {
  onSelect: (template: Template) => void;
}

export default function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {templates.map((template) => (
        <Button
          key={template.id}
          variant="outline"
          className="flex flex-col items-center gap-2 h-auto p-6 hover:bg-white/5"
          onClick={() => onSelect(template)}
        >
          {template.icon}
          <span>{template.name}</span>
        </Button>
      ))}
    </div>
  );
}
