"use client";
import React, { useState, useRef, useEffect } from "react";
import { portfolio } from "../data/portfolio";

const introLines = [
  "Microsoft Windows [Version 10.0.19045.3448]",
  "(c) Adeel Ali Yousaf. All rights are not reserved.",
  "",
  "Welcome to Adeel's Portfolio Terminal!",
  "Type 'help' to see available commands.",
  ""
];

const commands = {
  help: `Available commands:
  help        - Show this help message
  cv          - Download Resume/CV
  projects    - List all projects
  education   - Show education history
  certifications - List certifications
  badges      - List badges
  internships - List internships
  skills      - List all skills
  social      - Show social links
  contact     - Show contact info
  dir         - List directory contents
  cls         - Clear the screen
  clear       - Clear the screen
  exit        - Close terminal
  date        - Show current date
  time        - Show current time
  ver         - Show version information`,
  cv: () => {
    // Download the CV PDF
    if (typeof window !== 'undefined') {
      const link = document.createElement('a');
      link.href = '/AdeelAliYousafResume2025.pdf';
      link.download = 'AdeelAliYousafResume2025.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return 'Downloading CV started...\nDownloaded Successfully!';
    }
    return 'Download not supported in this environment.';
  },

  projects: () => {
    const realClient = portfolio.projects.realClient.map((p, i) => `    ${i + 1}. ${p.title}\n        ${p.description}\n        ${p.url ? 'URL: ' + p.url : ''}`.trim()).join('\n\n');
    const openSource = portfolio.projects.openSource.map((p, i) => `    ${i + 1}. ${p.name}\n        ${p.description}\n        ${p.url ? 'URL: ' + p.url : ''}`.trim()).join('\n\n');
    return [
      '=== Portfolio Projects ===',
      '',
      '--- Real Client Projects ---',
      realClient,
      '',
      '--- Open Source Projects ---',
      openSource
    ].join('\n');
  },

  education: () => {
    return [
      '=== Education ===',
      ...portfolio.education.map(e => [
        `  ${e.year}:`,
        `  ${e.degree} (${e.duration})`,
        `    ${e.institution}, ${e.location}`,
        `    Specialization: ${e.specialization}`,
        `    Status: ${e.status}`,
        `    Achievements:`,
        ...e.achievements.map(a => `      - ${a}`),
        `    Skills: ${e.skills.join(", ")}`
      ].join('\n'))
    ].join('\n\n');
  },

  certifications: () => {
    const courses = portfolio.certifications.courses.map(c => `    - ${c.title} (${c.issuer}, ${c.date})${c.url ? '\n        URL: ' + c.url : ''}`).join("\n\n");
    const certs = portfolio.certifications.certificates.map(c => `    - ${c.title} (${c.issuer}, ${c.date})${c.url ? '\n        URL: ' + c.url : ''}`).join("\n\n");
    const skillTests = portfolio.certifications.skillTests.map(c => `    - ${c.title} (${c.issuer}, ${c.date})${c.url ? '\n        URL: ' + c.url : ''}`).join("\n\n");
    return [
      '=== Certifications ===',
      '',
      '--- Courses ---',
      courses,
      '',
      '--- Certificates ---',
      certs,
      '',
      '--- Skill Tests ---',
      skillTests
    ].join('\n');
  },

  badges: () => {
    return [
      '=== Badges ===',
      '',
      ...portfolio.certifications.badges.map(b => `  - ${b.title} (${b.issuer}, ${b.date})${b.url ? '\n      URL: ' + b.url : ''}`)
    ].join('\n');
  },

  internships: () => {
    return [
      '=== Internships ===',
      '',
      ...portfolio.certifications.internships.map(i => `  - ${i.title} (${i.issuer}, ${i.date})${i.url ? '\n      URL: ' + i.url : ''}`)
    ].join('\n');
  },

  skills: () => {
    // Combine all unique skills from education
    const allSkills = portfolio.education.flatMap(e => e.skills);
    const uniqueSkills = [...new Set(allSkills)].sort();
    return [
      '=== Skills ===',
      '',
      '  ' + uniqueSkills.join(', ')
    ].join('\n');
  },

  social: () => {
    const s = portfolio.socialLinks;
    return [
      '=== Social Links ===',
      '',
      `  GitHub:    ${s.github}`,
      `  LinkedIn:  ${s.linkedin}`,
      `  Twitter:   ${s.twitter}`,
      `  Instagram: ${s.instagram}`,
      `  Facebook:  ${s.facebook}`,
      `  Freelance: ${s.freelance}`
    ].join('\n');
  },

  contact: () => {
    const s = portfolio.socialLinks;
    return [
      '=== Contact Info ===',
      '',
      `  Email:    ${s.email}`,
      `  WhatsApp: ${s.whatsapp}`,
      `  Phone:    ${s.ContactNumber}`
    ].join('\n');
  },

  dir: () => {
    // Simulate a realistic Windows dir output
    const now = new Date();
    const pad = n => n.toString().padStart(2, '0');
    const dateStr = `${pad(now.getMonth()+1)}/${pad(now.getDate())}/${now.getFullYear()}`;
    const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
    // Folders
    const folders = [
      { name: 'Projects' },
      { name: 'Portfolio' },
      { name: 'Certifications' },
      { name: 'Education' }
    ];
    // Files
    const files = [
      { name: 'resume.pdf', size: 2048 },
      { name: 'skills.txt', size: 1024 },
      { name: 'contact.vcf', size: 512 }
    ];
    // Add a few project files for realism
    portfolio.projects.realClient.forEach((p, i) => {
      files.push({ name: `${p.title.replace(/\s+/g, '_').toLowerCase()}.txt`, size: 1500 + i * 100 });
    });
    portfolio.projects.openSource.forEach((p, i) => {
      files.push({ name: `${p.name.replace(/\s+/g, '_').toLowerCase()}.md`, size: 1200 + i * 80 });
    });
    // Compose output
    let output = [];
    output.push(' Volume in drive C has no label.');
    output.push(' Volume Serial Number is 1234-ABCD');
    output.push('');
    output.push(' Directory of C:\\Users\\Adeel');
    output.push('');
    output.push(`${dateStr}  ${timeStr}    <DIR>          .`);
    output.push(`${dateStr}  ${timeStr}    <DIR>          ..`);
    folders.forEach(f => {
      output.push(`${dateStr}  ${timeStr}    <DIR>          ${f.name}`);
    });
    files.forEach(f => {
      output.push(`${dateStr}  ${timeStr}         ${f.size.toLocaleString().padStart(8, ' ')} ${f.name}`);
    });
    output.push(`               ${files.length} File(s)     ${files.reduce((a,b)=>a+b.size,0).toLocaleString()} bytes`);
    output.push(`               ${folders.length+2} Dir(s)  123,456,789,012 bytes free`);
    return output.join('\n');
  },

  cls: "__CLEAR__",
  clear: "__CLEAR__",
  exit: "__EXIT__",

  date: () => {
    const now = new Date();
    return `The current date is: ${now.toLocaleDateString('en-US', {
      weekday: 'short',
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    })}`;
  },

  time: () => {
    const now = new Date();
    return `The current time is: ${now.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })}`;
  },

  ver: () => `Microsoft Windows [Version 10.0.19045.3448]\nAdeel's Portfolio Terminal v1.0.0`,
};

export default function CmdTerminal({ onClose }) {
  const [lines, setLines] = useState(introLines);
  const [input, setInput] = useState("");
  const [show, setShow] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const terminalRef = useRef(null);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, show]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Tab completion
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim()) {
        // Add to command history
        setCommandHistory(prev => [input.trim(), ...prev.slice(0, 49)]);
        setHistoryIndex(-1);
      }
      handleCommand(input);
      setInput("");
    }
  };

  const handleCommand = (cmd) => {
    const command = cmd.trim().toLowerCase();
    if (!command) return;
    
    let output = `'${cmd}' is not recognized as an internal or external command,\noperable program or batch file.`;
    if (commands[command]) {
      output = typeof commands[command] === "function" ? commands[command]() : commands[command];
    }
    
    if (output === "__CLEAR__") {
      setLines([]);
      return;
    }
    
    if (output === "__EXIT__") {
      setShow(false);
      onClose && onClose();
      return;
    }
    
    // Add command and output instantly (like real CMD)
    setLines(prev => [
      ...prev,
      `C:\\Users\\Adeel>${cmd}`,
      output,
      ""
    ]);
  };

  if (!show) return null;

  function renderOutput(line, key) {
  // Heading
  if (/^===.+===$/.test(line)) {
    return <div key={key} className="font-bold text-green-400 text-base sm:text-lg mt-4 mb-2">{line.replace(/===/g, '').trim()}</div>;
  }
  // Subheading
  if (/^---.+---$/.test(line)) {
    return <div key={key} className="font-semibold text-green-300 text-sm sm:text-base mt-3 mb-1">{line.replace(/---/g, '').trim()}</div>;
  }
  // Command lines
  if (/^> /.test(line)) {
    return <div key={key} className="text-green-500">{line}</div>;
  }
  // Bullets
  if (/^\s*- /.test(line)) {
    return <div key={key} className="ml-4 my-1">{line.trim()}</div>;
  }
  // Numbered
  if (/^\s*\d+\. /.test(line)) {
    return <div key={key} className="ml-4 my-1">{line.trim()}</div>;
  }
  // Generic indentation
  const indentMatch = line.match(/^(\s+)/);
  if (indentMatch) {
    const indent = indentMatch[1].length * 4;
    return <div key={key} style={{ marginLeft: indent }}>{line.trim()}</div>;
  }
  // URLs anywhere
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  if (urlRegex.test(line)) {
    const parts = line.split(urlRegex);
    return (
      <div key={key} className="whitespace-pre-wrap break-words">
        {parts.map((part, i) =>
          urlRegex.test(part) ? (
            <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="underline text-blue-400 break-all">
              {part}
            </a>
          ) : (
            part
          )
        )}
      </div>
    );
  }
  // Default
  if (!line && line !== 0) return <div key={key}>&nbsp;</div>;
  return <div key={key} className="whitespace-pre-wrap break-words">{line}</div>;
}


  return (
    <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center p-2 sm:p-4">
      {/* Window chrome */}
      <div className="w-full max-w-6xl bg-black border border-gray-800 shadow-2xl flex flex-col max-h-[95vh] sm:max-h-[90vh]">
        {/* Title bar */}
        <div className="bg-gray-800 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 flex items-center justify-between border-b border-gray-700 select-none">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">
              C:
            </div>
            <span className="truncate">Command Prompt - Adeel Portfolio Terminal</span>
          </div>
          <div className="flex space-x-1">

            <button 
              onClick={() => {
                setShow(false);
                setTimeout(() => onClose && onClose(), 200);
              }}
              className="w-5 h-5 sm:w-6 sm:h-6 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-sm flex items-center justify-center transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Terminal content */}
        <div 
        ref={terminalRef}
        className="flex-1 bg-black text-white p-2 sm:p-4 overflow-y-auto"
        style={{ 
            fontFamily: 'Consolas, "Courier New", Monaco, Menlo, monospace',
            fontSize: '13px',
            lineHeight: '1.5',
            wordBreak: 'break-word',
            letterSpacing: '0.01em'
        }}
        >
          {/* Output lines */}
          {lines.map((line, i) => (
            renderOutput(line, i)
          ))}
          <div ref={scrollRef} />

          {/* Input line */}
          <div className="flex items-baseline mt-1">
            <span className="text-white mr-0 flex-shrink-0">C:\Users\Adeel&gt;</span>
            <div className="flex-1 relative ml-0">
              <input
                ref={inputRef}
                className="bg-transparent border-none outline-none text-white w-full font-mono"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ 
                  fontFamily: 'Consolas, "Courier New", Monaco, Menlo, monospace',
                  caretColor: 'transparent',
                  fontSize: 'inherit'
                }}
                placeholder=""
                autoFocus
                autoComplete="off"
                spellCheck="false"
              />
              {/* Custom blinking cursor */}
              <div 
                className={`absolute top-0 bg-white transition-opacity ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ 
                  left: `${input.length * (window.innerWidth < 640 ? 7.2 : 8.4)}px`,
                  width: window.innerWidth < 640 ? '6px' : '8px',
                  height: window.innerWidth < 640 ? '16px' : '20px',
                  fontFamily: 'Consolas, "Courier New", Monaco, Menlo, monospace'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}