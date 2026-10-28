import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Shield } from 'lucide-react';
import { FAQ_DATA } from '../data/mockData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="py-12 border-b border-slate-200 bg-[#f8fafc]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs text-sky-600 font-mono font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>KNOWLEDGE BASE & FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Prompt']">
            คำถามที่พบบ่อย และคู่มือการติดตั้งทั่วไป
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
            รวบรวมวิธีแก้ปัญหาที่ผู้เล่นพบบ่อย เพื่อให้คุณสามารถติดตั้งมอดภาษาไทยได้อย่างราบรื่น
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all shadow-2xs hover:border-sky-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-medium text-slate-900 hover:text-sky-600 transition-colors text-xs sm:text-sm"
                >
                  <span className="font-['Prompt'] font-semibold leading-relaxed">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-sky-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 border-t border-slate-100 leading-relaxed font-light whitespace-pre-line bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Safety Notice */}
        <div className="p-4 bg-sky-50 border border-sky-100 rounded-xl flex items-center gap-3 text-xs text-slate-700">
          <Shield className="w-5 h-5 text-sky-600 shrink-0" />
          <p>
            ไฟล์มอดทั้งหมดได้รับการสแกนและตรวจสอบมัลแวร์ ไม่มีการแก้ไขไฟล์ Executable (.exe) ของระบบเกมหลัก
            จึงมั่นใจได้ในความปลอดภัยของคอมพิวเตอร์ของคุณ
          </p>
        </div>
      </div>
    </section>
  );
};
