
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/button';

interface SearchKeywordsProps {
  content: string;
}

export default function SearchKeywords({ content }: SearchKeywordsProps) {
  const [keyword, setKeyword] = useState('');
  const [occurrences, setOccurrences] = useState(0);

  const handleSearch = () => {
    if (!keyword.trim()) return;
    
    const regex = new RegExp(keyword, 'gi');
    const matches = content.match(regex);
    setOccurrences(matches ? matches.length : 0);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 relative">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Buscar palavra-chave..."
          className="w-full bg-transparent border rounded px-3 py-1 pr-8 focus:outline-none focus:ring-1 ring-white/20"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-note-muted text-sm">
          {occurrences > 0 && occurrences}
        </div>
      </div>
      <Button variant="ghost" onClick={handleSearch}>
        <Search className="w-4 h-4" />
      </Button>
    </div>
  );
}
