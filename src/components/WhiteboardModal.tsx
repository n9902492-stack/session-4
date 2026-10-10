import React, { useRef, useState, useEffect } from 'react';
import {
  X,
  Download,
  RotateCcw,
  RotateCw,
  Trash2,
  Square,
  Circle as CircleIcon,
  Minus,
  MoveRight,
  Type,
  StickyNote,
  Maximize2,
  Minimize2,
  Grid,
  Users,
  Check,
  Sparkles
} from 'lucide-react';
import { WhiteboardTool } from '../types';

interface WhiteboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  embedded?: boolean;
}

interface StickyNoteItem {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
}

export const WhiteboardModal: React.FC<WhiteboardModalProps> = ({
  isOpen,
  onClose,
  embedded = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tool, setTool] = useState<WhiteboardTool>('pen');
  const [color, setColor] = useState<string>('#111827');
  const [lineWidth, setLineWidth] = useState<number>(3);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [stickyNotes, setStickyNotes] = useState<StickyNoteItem[]>([
    {
      id: 'note-1',
      x: 140,
      y: 120,
      text: 'Stage Architecture\n• LiveKit SFU\n• CRDT Doc Sync',
      color: '#fef3c7',
    },
    {
      id: 'note-2',
      x: 360,
      y: 140,
      text: 'Decision: PostgreSQL RLS encryption for multi-tenant isolation',
      color: '#ecfdf5',
    },
  ]);
  const [activeStickyText, setActiveStickyText] = useState<string>('');
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [gridStyle, setGridStyle] = useState<'dots' | 'grid' | 'blank'>('dots');
  const [showSimulatedPeers, setShowSimulatedPeers] = useState<boolean>(true);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const colors = [
    { name: 'Obsidian', hex: '#111827' },
    { name: 'Warm Amber', hex: '#d97706' },
    { name: 'Solar Gold', hex: '#ca8a04' },
    { name: 'Emerald', hex: '#059669' },
    { name: 'Sapphire', hex: '#2563eb' },
    { name: 'Rose', hex: '#e11d48' },
  ];

  // Initialize canvas
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = window.devicePixelRatio || 1;
      const width = parent.clientWidth;
      const height = parent.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Initial background fill
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        // Draw initial illustration / diagram
        drawInitialArchitectureDiagram(ctx, width, height);

        // Save initial state to history
        const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setHistory([initialState]);
        setHistoryIndex(0);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen, isFullScreen]);

  const drawInitialArchitectureDiagram = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number
  ) => {
    // Clean initial diagram on the board
    ctx.save();
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2.5;

    // Draw Plane 1 Box
    ctx.strokeRect(100, 320, 180, 90);
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(100, 320, 180, 90);
    ctx.fillStyle = '#78350f';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.fillText('01. Control Plane', 115, 350);
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText('Postgres RLS / SAML', 115, 375);

    // Arrow to Plane 2
    ctx.beginPath();
    ctx.moveTo(280, 365);
    ctx.lineTo(360, 365);
    ctx.stroke();

    // Draw Plane 2 Box
    ctx.strokeRect(360, 320, 190, 90);
    ctx.fillStyle = '#fef9c3';
    ctx.fillRect(360, 320, 190, 90);
    ctx.fillStyle = '#713f12';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.fillText('02. Realtime Plane', 375, 350);
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText('CRDT Sync Mesh', 375, 375);

    // Arrow to Plane 3
    ctx.beginPath();
    ctx.moveTo(550, 365);
    ctx.lineTo(630, 365);
    ctx.stroke();

    // Draw Plane 3 Box
    ctx.strokeRect(630, 320, 190, 90);
    ctx.fillStyle = '#ffedd5';
    ctx.fillRect(630, 320, 190, 90);
    ctx.fillStyle = '#9a3412';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.fillText('03. Media Plane (SFU)', 645, 350);
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText('LiveKit 4K WebRTC', 645, 375);

    ctx.restore();
  };

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(currentState);

    // Limit history stack
    if (newHistory.length > 20) newHistory.shift();

    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const getCanvasCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoordinates(e);
    setIsDrawing(true);
    setStartPos(coords);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (tool === 'pen' || tool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
      ctx.lineWidth = tool === 'eraser' ? lineWidth * 4 : lineWidth;
    } else if (tool === 'sticky') {
      const newSticky: StickyNoteItem = {
        id: `note-${Date.now()}`,
        x: coords.x - 70,
        y: coords.y - 40,
        text: 'New thought or commitment...',
        color: '#fef3c7',
      };
      setStickyNotes([...stickyNotes, newSticky]);
      setIsDrawing(false);
      setTool('pen');
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const coords = getCanvasCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (tool === 'pen') {
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    } else if (tool === 'eraser') {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = lineWidth * 4;
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const coords = getCanvasCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (tool === 'rectangle') {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      const w = coords.x - startPos.x;
      const h = coords.y - startPos.y;
      ctx.strokeRect(startPos.x, startPos.y, w, h);
    } else if (tool === 'circle') {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      const radius = Math.sqrt(
        Math.pow(coords.x - startPos.x, 2) + Math.pow(coords.y - startPos.y, 2)
      );
      ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
      ctx.stroke();
    } else if (tool === 'arrow') {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.moveTo(startPos.x, startPos.y);
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();

      // Draw arrowhead
      const angle = Math.atan2(coords.y - startPos.y, coords.x - startPos.x);
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      ctx.lineTo(
        coords.x - 14 * Math.cos(angle - Math.PI / 6),
        coords.y - 14 * Math.sin(angle - Math.PI / 6)
      );
      ctx.moveTo(coords.x, coords.y);
      ctx.lineTo(
        coords.x - 14 * Math.cos(angle + Math.PI / 6),
        coords.y - 14 * Math.sin(angle + Math.PI / 6)
      );
      ctx.stroke();
    } else if (tool === 'text') {
      const promptText = window.prompt('Enter label or note:', 'Sync Milestone');
      if (promptText) {
        ctx.fillStyle = color;
        ctx.font = '500 14px Inter, sans-serif';
        ctx.fillText(promptText, coords.x, coords.y);
      }
    }

    setIsDrawing(false);
    saveCanvasState();
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const prevIndex = historyIndex - 1;
      ctx.putImageData(history[prevIndex], 0, 0);
      setHistoryIndex(prevIndex);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const nextIndex = historyIndex + 1;
      ctx.putImageData(history[nextIndex], 0, 0);
      setHistoryIndex(nextIndex);
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setStickyNotes([]);
    saveCanvasState();
  };

  const handleExportPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a temporary canvas with white background to merge sticky notes
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const expCtx = exportCanvas.getContext('2d');
    if (!expCtx) return;

    expCtx.drawImage(canvas, 0, 0);

    const dpr = window.devicePixelRatio || 1;
    // Draw sticky notes onto exported canvas
    stickyNotes.forEach((note) => {
      expCtx.fillStyle = note.color;
      expCtx.fillRect(note.x * dpr, note.y * dpr, 160 * dpr, 90 * dpr);
      expCtx.strokeStyle = '#e5e7eb';
      expCtx.lineWidth = 1 * dpr;
      expCtx.strokeRect(note.x * dpr, note.y * dpr, 160 * dpr, 90 * dpr);

      expCtx.fillStyle = '#1f2937';
      expCtx.font = `${11 * dpr}px Inter, sans-serif`;
      const lines = note.text.split('\n');
      lines.forEach((line, i) => {
        expCtx.fillText(line, (note.x + 10) * dpr, (note.y + 24 + i * 16) * dpr);
      });
    });

    const dataUrl = exportCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `meeting-os-whiteboard-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = dataUrl;
    link.click();

    setExportNotice('Whiteboard exported as PNG!');
    setTimeout(() => setExportNotice(null), 3000);
  };

  const updateStickyNote = (id: string, newText: string) => {
    setStickyNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, text: newText } : note))
    );
  };

  const deleteStickyNote = (id: string) => {
    setStickyNotes((prev) => prev.filter((note) => note.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div
      className={
        embedded
          ? 'w-full h-full flex flex-col bg-white rounded-xl overflow-hidden border border-[#ede3cf]'
          : 'fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/60 backdrop-blur-sm'
      }
    >
      <div
        className={
          embedded
            ? 'w-full h-full flex flex-col'
            : `bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#ebd7a5] transition-all ${
                isFullScreen
                  ? 'fixed inset-2 z-50'
                  : 'w-full max-w-6xl h-[85vh] max-h-[850px]'
              }`
        }
      >
        {/* Top Control Bar */}
        <div className="px-4 py-3 bg-[#fdfaf3] border-b border-[#ede3cf] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#fef3c7] text-[#92400e] flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-[#d97706]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm md:text-base font-bold text-[#111827]">
                  Interactive Stage Whiteboard
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#92400e] font-semibold">
                  Live Canvas Sync
                </span>
              </div>
              <p className="text-xs text-[#6b7280] hidden sm:block">
                Sub-20ms edge replication · Live annotations & diagramming
              </p>
            </div>
          </div>

          {/* Peer Presence Indicators */}
          {showSimulatedPeers && (
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-[#ede3cf] text-xs text-[#4b5563]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Collaborators:</span>
              <span className="font-semibold text-[#111827]">Elena R. (cursor active)</span>
              <span>·</span>
              <span className="font-semibold text-[#111827]">Marcus C.</span>
            </div>
          )}

          {/* Window actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowSimulatedPeers(!showSimulatedPeers)}
              title="Toggle participant cursors"
              className={`p-2 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1 ${
                showSimulatedPeers
                  ? 'bg-[#fef3c7] text-[#92400e] border-[#ebd7a5]'
                  : 'bg-white text-[#4b5563] border-[#e5e7eb] hover:bg-neutral-50'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Presence</span>
            </button>

            <button
              onClick={handleExportPNG}
              className="px-3 py-1.5 rounded-lg bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-semibold amber-glow transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PNG</span>
            </button>

            {!embedded && (
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-1.5 rounded-lg text-[#6b7280] hover:text-[#111827] hover:bg-neutral-100 transition-colors"
                title={isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
              >
                {isFullScreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
            )}

            {!embedded && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-[#6b7280] hover:text-[#111827] hover:bg-neutral-100 transition-colors"
                title="Close Whiteboard"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Secondary Tool Ribbon */}
        <div className="px-4 py-2 bg-white border-b border-[#ede3cf] flex flex-wrap items-center justify-between gap-3 text-sm">
          {/* Drawing Tools */}
          <div className="flex items-center gap-1 bg-[#f5eedd]/60 p-1 rounded-xl border border-[#ede3cf]">
            <button
              onClick={() => setTool('pen')}
              className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                tool === 'pen'
                  ? 'bg-white text-[#92400e] shadow-sm font-bold'
                  : 'text-[#4b5563] hover:text-[#111827]'
              }`}
              title="Freehand Pen"
            >
              <span className="w-3 h-3 rounded-full bg-current"></span>
              <span>Pen</span>
            </button>

            <button
              onClick={() => setTool('rectangle')}
              className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                tool === 'rectangle'
                  ? 'bg-white text-[#92400e] shadow-sm font-bold'
                  : 'text-[#4b5563] hover:text-[#111827]'
              }`}
              title="Rectangle"
            >
              <Square className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setTool('circle')}
              className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                tool === 'circle'
                  ? 'bg-white text-[#92400e] shadow-sm font-bold'
                  : 'text-[#4b5563] hover:text-[#111827]'
              }`}
              title="Circle"
            >
              <CircleIcon className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setTool('arrow')}
              className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                tool === 'arrow'
                  ? 'bg-white text-[#92400e] shadow-sm font-bold'
                  : 'text-[#4b5563] hover:text-[#111827]'
              }`}
              title="Arrow"
            >
              <MoveRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setTool('sticky')}
              className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                tool === 'sticky'
                  ? 'bg-white text-[#92400e] shadow-sm font-bold'
                  : 'text-[#4b5563] hover:text-[#111827]'
              }`}
              title="Add Sticky Note"
            >
              <StickyNote className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden md:inline">Sticky Note</span>
            </button>

            <button
              onClick={() => setTool('text')}
              className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                tool === 'text'
                  ? 'bg-white text-[#92400e] shadow-sm font-bold'
                  : 'text-[#4b5563] hover:text-[#111827]'
              }`}
              title="Add Text Label"
            >
              <Type className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setTool('eraser')}
              className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                tool === 'eraser'
                  ? 'bg-white text-[#92400e] shadow-sm font-bold'
                  : 'text-[#4b5563] hover:text-[#111827]'
              }`}
              title="Eraser"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Color Palette */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[#6b7280] hidden md:inline">Color:</span>
            {colors.map((c) => (
              <button
                key={c.hex}
                onClick={() => {
                  setColor(c.hex);
                  if (tool === 'eraser') setTool('pen');
                }}
                className={`w-6 h-6 rounded-full transition-transform flex items-center justify-center ${
                  color === c.hex ? 'ring-2 ring-offset-2 ring-[#d97706] scale-110' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              >
                {color === c.hex && (
                  <Check
                    className={`w-3 h-3 ${
                      c.hex === '#ffffff' ? 'text-black' : 'text-white'
                    }`}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Stroke Width Picker */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-[#6b7280] hidden md:inline">Stroke:</span>
            {[2, 4, 8].map((size) => (
              <button
                key={size}
                onClick={() => setLineWidth(size)}
                className={`px-2 py-1 rounded-md border text-xs font-mono ${
                  lineWidth === size
                    ? 'bg-[#111827] text-white border-[#111827]'
                    : 'bg-white text-[#4b5563] border-[#e5e7eb] hover:bg-neutral-50'
                }`}
              >
                {size}px
              </button>
            ))}
          </div>

          {/* History Controls & Canvas Grid */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-1.5 rounded-lg border border-[#e5e7eb] text-[#4b5563] hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed"
              title="Undo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-1.5 rounded-lg border border-[#e5e7eb] text-[#4b5563] hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed"
              title="Redo"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                if (window.confirm('Clear all drawings and notes from canvas?')) {
                  handleClear();
                }
              }}
              className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
              title="Clear Canvas"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                const styles: ('dots' | 'grid' | 'blank')[] = ['dots', 'grid', 'blank'];
                const next = styles[(styles.indexOf(gridStyle) + 1) % styles.length];
                setGridStyle(next);
              }}
              className="p-1.5 rounded-lg border border-[#e5e7eb] text-[#4b5563] hover:bg-neutral-50 ml-1"
              title={`Grid mode: ${gridStyle}`}
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Notice Toast */}
        {exportNotice && (
          <div className="bg-emerald-600 text-white text-xs px-4 py-1.5 text-center font-medium animate-fadeIn">
            {exportNotice}
          </div>
        )}

        {/* Canvas Workspace Area */}
        <div
          className={`relative flex-1 w-full overflow-hidden select-none cursor-crosshair ${
            gridStyle === 'dots'
              ? 'bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:20px_20px] bg-white'
              : gridStyle === 'grid'
              ? 'bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] [background-size:24px_24px] bg-white'
              : 'bg-white'
          }`}
        >
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="absolute inset-0 w-full h-full touch-none"
          />

          {/* Sticky Notes Overlay */}
          {stickyNotes.map((note) => (
            <div
              key={note.id}
              style={{
                left: `${note.x}px`,
                top: `${note.y}px`,
                backgroundColor: note.color,
              }}
              className="absolute w-44 p-3 rounded-lg shadow-md border border-neutral-300/80 cursor-move transition-shadow hover:shadow-lg group"
            >
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-black/10 text-[10px] text-neutral-600 font-mono">
                <span>Sticky Note</span>
                <button
                  onClick={() => deleteStickyNote(note.id)}
                  className="opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity"
                  title="Delete Note"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <textarea
                value={note.text}
                onChange={(e) => updateStickyNote(note.id, e.target.value)}
                className="w-full h-16 bg-transparent resize-none border-none outline-none text-xs text-neutral-800 font-sans leading-relaxed"
                placeholder="Type note content..."
              />
            </div>
          ))}

          {/* Simulated Peer Cursor (Elena Rostova) */}
          {showSimulatedPeers && (
            <div
              className="absolute pointer-events-none transition-all duration-700 ease-out"
              style={{ left: '420px', top: '240px' }}
            >
              <svg
                className="w-5 h-5 text-[#d97706] drop-shadow-md"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 0l16 12-7 2-4 9-5-23z" />
              </svg>
              <div className="mt-1 ml-3 px-2 py-0.5 rounded-full bg-[#d97706] text-white text-[10px] font-semibold tracking-wide shadow-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                Elena Rostova
              </div>
            </div>
          )}

          {/* Instructions Floating Pill at Bottom */}
          <div className="absolute bottom-3 left-4 right-4 pointer-events-none flex items-center justify-between text-[11px] text-[#6b7280]">
            <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-[#ede3cf] shadow-sm pointer-events-auto flex items-center gap-2">
              <span className="font-semibold text-[#111827]">Canvas Controls:</span>
              <span>Click & drag to draw</span>
              <span>·</span>
              <span>Select Sticky Note & click canvas to place</span>
              <span>·</span>
              <span>Export as PNG anytime</span>
            </div>

            <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-[#ede3cf] shadow-sm pointer-events-auto flex items-center gap-1 text-[#92400e]">
              <span className="w-2 h-2 rounded-full bg-[#d97706]"></span>
              <span className="font-mono font-medium">Synced v4.2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
