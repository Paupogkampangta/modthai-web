import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Copy,
  Heart,
  Star,
  Send,
  Trash2,
} from 'lucide-react';
import { GameMod, CommentItem } from '../types';

interface ModModalProps {
  mod: GameMod | null;
  onClose: () => void;
  onDownload: (mod: GameMod, linkUrl?: string) => void;
  onOpenDonateForGame: (gameTitle: string) => void;
  onAddComment: (modId: string, comment: CommentItem) => void;
  onShowToast: (msg: string) => void;
}

export const ModModal: React.FC<ModModalProps> = ({
  mod,
  onClose,
  onDownload,
  onOpenDonateForGame,
  onAddComment,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'install' | 'changelog' | 'comments'>('overview');
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentRating, setCommentRating] = useState(5);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!mod) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onShowToast(`คัดลอก ${label} เรียบร้อยแล้ว`);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: CommentItem = {
      id: `c_${Date.now()}`,
      author: commentName.trim() || 'ผู้เล่นนิรนาม',
      comment: commentText.trim(),
      date: 'เมื่อสักครู่',
      rating: commentRating,
    };

    onAddComment(mod.id, newComment);
    setCommentText('');
    setCommentName('');
    onShowToast('ขอบคุณสำหรับข้อความฟีดแบ็กครับ!');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-900/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto text-slate-800 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative border-b border-slate-200 bg-slate-50/80 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-mono">
                <span className="text-sky-600 font-semibold">{mod.category}</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>{mod.platform.join(' / ')}</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>{mod.gameVersion}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Prompt'] leading-snug">
                {mod.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                {mod.originalTitle} · จัดทำโดย <strong className="text-slate-700">{mod.author}</strong>
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shrink-0 shadow-xs"
              aria-label="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Tab Controls */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto border-b border-slate-200 -mb-5 sm:-mb-6 pt-1 text-xs sm:text-sm no-scrollbar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-sky-600 text-sky-600 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              รายละเอียด & ดาวน์โหลด
            </button>
            <button
              onClick={() => setActiveTab('install')}
              className={`pb-3 px-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'install'
                  ? 'border-sky-600 text-sky-600 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              ขั้นตอนติดตั้ง ({mod.installationGuide.steps.length} ขั้น)
            </button>
            <button
              onClick={() => setActiveTab('changelog')}
              className={`pb-3 px-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'changelog'
                  ? 'border-sky-600 text-sky-600 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              ประวัติอัปเดต ({mod.version})
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`pb-3 px-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'comments'
                  ? 'border-sky-600 text-sky-600 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              คอมเมนต์ ({mod.comments?.length || 0})
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-700 bg-white">
          {/* TAB 1: OVERVIEW & DOWNLOADS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Feature Highlights Grid */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  จุดเด่นของมอดนี้
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {mod.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs sm:text-sm text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Detail Breakdown */}
              <div className="space-y-3 p-4 bg-sky-50/50 border border-sky-100 rounded-xl">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-700 font-semibold">ความคืบหน้าการแปลโดยรวม</span>
                  <span className="text-sky-600 font-bold tabular-nums">{mod.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${mod.progress === 100 ? 'bg-emerald-500' : 'bg-sky-500'}`}
                    style={{ width: `${mod.progress}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono text-slate-600">
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    <div className="text-slate-400 text-[11px]">บทเนื้อเรื่องหลัก</div>
                    <div className="text-slate-800 font-bold tabular-nums">
                      {mod.progressDetails.story}%
                    </div>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    <div className="text-slate-400 text-[11px]">เมนู & อินเทอร์เฟซ (UI)</div>
                    <div className="text-slate-800 font-bold tabular-nums">
                      {mod.progressDetails.ui}%
                    </div>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    <div className="text-slate-400 text-[11px]">ภารกิจ & เควสย่อย</div>
                    <div className="text-slate-800 font-bold tabular-nums">
                      {mod.progressDetails.quests}%
                    </div>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    <div className="text-slate-400 text-[11px]">ไอเทม & อุปกรณ์</div>
                    <div className="text-slate-800 font-bold tabular-nums">
                      {mod.progressDetails.items}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  เกี่ยวกับโครงการแปล
                </h4>
                <p className="text-slate-600 leading-relaxed font-light whitespace-pre-line">
                  {mod.description}
                </p>
              </div>

              {/* Download Links Section */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  ลิงก์ดาวน์โหลดมอด
                </h4>

                {/* Primary Download */}
                <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-300">
                        แนะนำ
                      </span>
                      <span className="font-semibold text-slate-900">{mod.downloads.primary.name}</span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono">
                      <span>เซิร์ฟเวอร์: {mod.downloads.primary.provider}</span>
                      <span aria-hidden="true" className="text-slate-300"> · </span>
                      <span className="tabular-nums">ขนาดไฟล์: {mod.downloads.primary.fileSize}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onDownload(mod, mod.downloads.primary.url)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors shrink-0 shadow-sm active:scale-[0.98]"
                  >
                    <Download className="w-4 h-4" />
                    <span>ดาวน์โหลดหลัก ({mod.downloads.primary.fileSize})</span>
                  </button>
                </div>

                {/* Mirror Links */}
                {mod.downloads.mirrors && mod.downloads.mirrors.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs text-slate-500">ลิงก์สำรอง:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {mod.downloads.mirrors.map((mirror, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-2"
                        >
                          <div className="text-xs">
                            <div className="text-slate-800 font-medium">{mirror.name}</div>
                            <div className="text-slate-500 font-mono text-[11px]">{mirror.provider} · {mirror.fileSize}</div>
                          </div>
                          <button
                            onClick={() => onDownload(mod, mirror.url)}
                            className="p-1.5 px-2.5 text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded transition-colors text-xs flex items-center gap-1 font-medium"
                          >
                            <span>โหลด</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: STEP-BY-STEP INSTALLATION */}
          {activeTab === 'install' && (
            <div className="space-y-6">
              {/* Caution Callout */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs sm:text-sm flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold text-amber-950">คำเตือนและข้อควรระวัง</span>
                  <ul className="list-disc list-inside space-y-0.5 text-xs text-amber-800">
                    {mod.installationGuide.notes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Numbered Steps */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  ขั้นตอนการติดตั้งทีละสเต็ป
                </h4>
                <div className="space-y-2.5">
                  {mod.installationGuide.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3 text-xs sm:text-sm"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-sky-100 text-sky-700 font-mono font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="space-y-1 flex-1">
                        <p className="text-slate-800 leading-relaxed">{step}</p>
                        {step.includes('\\') || step.includes('/') ? (
                          <button
                            onClick={() => {
                              const match = step.match(/([a-zA-Z]:\\[^)]+)/);
                              if (match) handleCopy(match[0], 'พาทโฟลเดอร์');
                              else handleCopy(step, 'ข้อความขั้นตอน');
                            }}
                            className="inline-flex items-center gap-1 text-[11px] text-sky-600 hover:text-sky-700 font-medium transition-colors pt-0.5"
                          >
                            <Copy className="w-3 h-3" />
                            <span>คัดลอกโฟลเดอร์พาท</span>
                          </button>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Uninstallation Steps */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1.5">
                  <Trash2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>วิธีถอนการติดตั้งมอด (กลับเป็นภาษาอังกฤษ)</span>
                </h4>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5 text-slate-600">
                  {mod.installationGuide.uninstallSteps.map((uStep, uIdx) => (
                    <div key={uIdx} className="flex items-start gap-2">
                      <span className="text-slate-400">·</span>
                      <span>{uStep}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CHANGELOG */}
          {activeTab === 'changelog' && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                บันทึกการปรับปรุงแต่ละเวอร์ชัน
              </h4>
              <div className="space-y-3">
                {mod.changelog.map((entry, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-sky-600 font-bold">{entry.version}</span>
                      <span className="text-slate-400">{entry.date}</span>
                    </div>
                    <ul className="space-y-1 text-xs sm:text-sm text-slate-700">
                      {entry.changes.map((ch, chIdx) => (
                        <li key={chIdx} className="flex items-start gap-2">
                          <span className="text-sky-500 mt-1">●</span>
                          <span className="leading-relaxed">{ch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PLAYER COMMENTS */}
          {activeTab === 'comments' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  ความคิดเห็นจากผู้เล่น
                </h4>
                {mod.comments && mod.comments.length > 0 ? (
                  <div className="space-y-2.5">
                    {mod.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-900">{comment.author}</span>
                          <div className="flex items-center gap-1 text-amber-500">
                            {[...Array(comment.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400" />
                            ))}
                            <span className="text-slate-400 text-[11px] ml-1.5">{comment.date}</span>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {comment.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-slate-400 border border-slate-200 rounded-xl bg-slate-50">
                    ยังไม่มีความคิดเห็น เป็นคนแรกที่รีวิวมอดนี้!
                  </div>
                )}
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleCommentSubmit} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <h5 className="text-xs font-semibold text-slate-800">เขียนรีวิวหรือแนะนำคำแปล</h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">ชื่อเล่นของคุณ</label>
                    <input
                      type="text"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      placeholder="เช่น GamerTH, น้องกิ๊ก"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-100"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">ความประทับใจ</label>
                    <div className="flex items-center gap-1 pt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setCommentRating(star)}
                          className="p-1 text-slate-300 hover:text-amber-400 transition-colors"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              star <= commentRating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">ข้อความหรือจุดที่อยากให้แก้ไข</label>
                  <textarea
                    rows={2}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="แชร์ความรู้สึก หรือแจ้งคำแปลที่สะกดผิดได้ที่นี่..."
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-100"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>ส่งความคิดเห็น</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span>เวอร์ชัน: <strong className="text-slate-900 font-mono">{mod.version}</strong></span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="tabular-nums">ดาวน์โหลดแล้ว {mod.downloadCount.toLocaleString()} ครั้ง</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                onClose();
                onOpenDonateForGame(mod.title);
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium text-sky-700 hover:text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors whitespace-nowrap"
            >
              <Heart className="w-3.5 h-3.5 text-sky-600 fill-sky-200" />
              <span>โดเนทให้ผู้แปลเกมนี้</span>
            </button>

            <button
              onClick={() => onDownload(mod, mod.downloads.primary.url)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors whitespace-nowrap active:scale-[0.98] shadow-sm shadow-sky-600/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ดาวน์โหลดมอด ({mod.downloads.primary.fileSize})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
