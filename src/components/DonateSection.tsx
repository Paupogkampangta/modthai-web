import React, { useState, useEffect } from 'react';
import {
  Heart,
  QrCode,
  Copy,
  Download,
  CreditCard,
  Gift,
  Coffee,
  Sparkles,
  Send,
  Sliders,
  ShieldCheck,
} from 'lucide-react';
import { DonationConfig, DonorMessage } from '../types';
import { generatePromptPayQrDataUrl } from '../utils/promptpay';

interface DonateSectionProps {
  config: DonationConfig;
  donorMessages: DonorMessage[];
  onAddDonorMessage: (message: DonorMessage) => void;
  onOpenConfigModal: () => void;
  onShowToast: (msg: string) => void;
  preselectedGame?: string;
}

const PRESET_AMOUNTS = [
  { amount: 20, label: '20 ฿', desc: 'น้ำหวาน 1 แก้ว' },
  { amount: 50, label: '50 ฿', desc: 'ขนมขบเคี้ยว' },
  { amount: 100, label: '100 ฿', desc: '☕ กาแฟแก้ง่วง (ยอดนิยม)', popular: true },
  { amount: 200, label: '200 ฿', desc: 'มื้อกลางวันอิ่มๆ' },
  { amount: 500, label: '500 ฿', desc: '🍕 กองทุนค่าไฟแปลเกม' },
];

export const DonateSection: React.FC<DonateSectionProps> = ({
  config,
  donorMessages,
  onAddDonorMessage,
  onOpenConfigModal,
  onShowToast,
  preselectedGame,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [activePaymentMethod, setActivePaymentMethod] = useState<'promptpay' | 'bank' | 'truemoney'>('promptpay');

  // Donor form
  const [donorName, setDonorName] = useState('');
  const [donorGame, setDonorGame] = useState(preselectedGame || '');
  const [donorMessage, setDonorMessage] = useState('');

  const effectiveAmount = isCustom ? Number(customAmount) || 0 : selectedAmount;

  useEffect(() => {
    let isMounted = true;
    generatePromptPayQrDataUrl(config.promptPayPhone, effectiveAmount).then((dataUrl) => {
      if (isMounted) setQrCodeUrl(dataUrl);
    });
    return () => {
      isMounted = false;
    };
  }, [config.promptPayPhone, effectiveAmount]);

  useEffect(() => {
    if (preselectedGame) {
      setDonorGame(preselectedGame);
    }
  }, [preselectedGame]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onShowToast(`คัดลอก ${label} แล้ว`);
  };

  const handleSelectPreset = (amt: number) => {
    setIsCustom(false);
    setSelectedAmount(amt);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (val: string) => {
    const num = val.replace(/[^0-9]/g, '');
    setCustomAmount(num);
    setIsCustom(true);
  };

  const handleDownloadQr = () => {
    if (!qrCodeUrl) return;
    const a = document.createElement('a');
    a.href = qrCodeUrl;
    a.download = `PromptPay_ModThai_${effectiveAmount > 0 ? effectiveAmount + 'THB' : 'Any'}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    onShowToast('ดาวน์โหลดภาพ QR Code เรียบร้อยแล้ว');
  };

  const handleDonorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() && !donorMessage.trim()) return;

    const newMessage: DonorMessage = {
      id: `d_${Date.now()}`,
      name: donorName.trim() || 'ผู้เล่นใจดี',
      amount: effectiveAmount > 0 ? effectiveAmount : 50,
      message: donorMessage.trim() || 'ขอบคุณสำหรับมอดแปลภาษาไทยดีๆ นะครับ ขอเป็นกำลังใจให้คุณ Loli is My Life!',
      gameSupported: donorGame.trim() || undefined,
      timestamp: 'เมื่อสักครู่',
      isVerified: true,
    };

    onAddDonorMessage(newMessage);
    setDonorMessage('');
    setDonorName('');
    onShowToast('ขอบพระคุณสำหรับข้อความสนับสนุนและกำลังใจครับ!');
  };

  return (
    <section id="donate-section" className="py-12 border-b border-slate-200 bg-gradient-to-b from-sky-50/50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs text-sky-600 font-mono font-semibold">
              <Heart className="w-3.5 h-3.5 fill-sky-600" />
              <span>SUPPORT & DONATION</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-['Prompt'] tracking-tight">
              สนับสนุนผู้แปล แล้วแต่ความประทับใจ
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              มอดทุกตัวแจกฟรี 100% แปลเองเล่นเอง ไม่มีระบบเก็บเงิน หากชื่นชอบและอยากเลี้ยงกาแฟ
              หรือช่วยสนับสนุนค่าไฟ/เซิร์ฟเวอร์ สามารถร่วมโดเนทได้ตามความสมัครใจครับ
            </p>
          </div>

          <button
            onClick={onOpenConfigModal}
            className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:border-sky-300 transition-colors shadow-2xs"
          >
            <Sliders className="w-3.5 h-3.5 text-sky-600" />
            <span>ตั้งค่าบัญชีรับเงิน (สำหรับแอดมิน)</span>
          </button>
        </div>

        {/* Support Goal Progress Card */}
        <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-800 font-semibold flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-sky-600" />
                <span>{config.goalTitle}</span>
              </span>
              <span className="text-sky-600 font-bold tabular-nums">
                {config.currentGoalAmount.toLocaleString()} / {config.targetGoal.toLocaleString()} ฿
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-sky-600 transition-all duration-500 rounded-full"
                style={{
                  width: `${Math.min(100, (config.currentGoalAmount / config.targetGoal) * 100)}%`,
                }}
              />
            </div>
          </div>
          <div className="text-xs text-slate-500 font-mono shrink-0">
            สำเร็จแล้ว {Math.round((config.currentGoalAmount / config.targetGoal) * 100)}%
          </div>
        </div>

        {/* Main Donation Container: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Payment Selector & QR Generator */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xs">
            {/* Payment Method Tabs */}
            <div className="flex items-center gap-2 p-1 bg-slate-100/80 border border-slate-200/80 rounded-xl text-xs sm:text-sm">
              <button
                onClick={() => setActivePaymentMethod('promptpay')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg font-medium transition-colors ${
                  activePaymentMethod === 'promptpay'
                    ? 'bg-white text-sky-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <QrCode className="w-4 h-4 text-sky-600" />
                <span>พร้อมเพย์ QR</span>
              </button>
              <button
                onClick={() => setActivePaymentMethod('bank')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg font-medium transition-colors ${
                  activePaymentMethod === 'bank'
                    ? 'bg-white text-sky-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CreditCard className="w-4 h-4 text-sky-600" />
                <span>โอนผ่านบัญชีธนาคาร</span>
              </button>
              <button
                onClick={() => setActivePaymentMethod('truemoney')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg font-medium transition-colors ${
                  activePaymentMethod === 'truemoney'
                    ? 'bg-white text-sky-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Gift className="w-4 h-4 text-orange-500" />
                <span>ทรูมันนี่ วอลเล็ท</span>
              </button>
            </div>

            {/* TAB 1: PROMPTPAY DYNAMIC QR */}
            {activePaymentMethod === 'promptpay' && (
              <div className="space-y-6">
                {/* Amount Selection */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-600 font-semibold">เลือกจำนวนเงินสนับสนุน (บาท)</span>
                    <span className="text-sky-600 font-medium">แล้วแต่ศรัทธา ไม่มีขั้นต่ำ</span>
                  </div>

                  {/* Preset Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {PRESET_AMOUNTS.map((item) => (
                      <button
                        key={item.amount}
                        type="button"
                        onClick={() => handleSelectPreset(item.amount)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          !isCustom && selectedAmount === item.amount
                            ? 'bg-sky-600 text-white font-bold border-sky-600 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-sky-300 hover:bg-sky-50/50'
                        }`}
                      >
                        <div className="text-xs sm:text-sm font-mono">{item.label}</div>
                        <div className="text-[10px] opacity-80 truncate">{item.desc}</div>
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount Input */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs text-slate-500 whitespace-nowrap">ระบุจำนวนเอง:</span>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">฿</span>
                      <input
                        type="text"
                        value={customAmount}
                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                        placeholder="กรอกจำนวนเงินตามใจ (เช่น 1, 59, 99)"
                        className={`w-full pl-7 pr-3 py-1.5 text-xs bg-white border rounded-lg text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-100 ${
                          isCustom ? 'border-sky-500 ring-2 ring-sky-100' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {isCustom && customAmount && (
                      <button
                        onClick={() => handleSelectPreset(100)}
                        className="text-xs text-slate-500 hover:text-slate-800 px-2 py-1"
                      >
                        รีเซ็ต
                      </button>
                    )}
                  </div>
                </div>

                {/* QR Display Card (Thai PromptPay Standard Header) */}
                <div className="max-w-xs mx-auto p-5 bg-white text-slate-900 rounded-2xl shadow-md border border-slate-200 space-y-3 text-center">
                  {/* Thai QR Payment Blue Top Bar */}
                  <div className="bg-[#003b71] text-white py-1.5 px-3 rounded-lg font-bold text-xs tracking-wider flex items-center justify-center gap-2">
                    <QrCode className="w-4 h-4" />
                    <span>Thai QR Payment · พร้อมเพย์</span>
                  </div>

                  {/* QR Image */}
                  <div className="relative aspect-square w-full max-w-[220px] mx-auto bg-slate-50 rounded-lg overflow-hidden p-2 flex items-center justify-center border border-slate-100">
                    {qrCodeUrl ? (
                      <img
                        src={qrCodeUrl}
                        alt="PromptPay QR Code"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-xs text-slate-400 font-mono animate-pulse">
                        กำลังสร้าง QR Code...
                      </div>
                    )}
                  </div>

                  {/* Details under QR */}
                  <div className="space-y-1 text-xs">
                    <div className="font-semibold text-slate-800">{config.promptPayName}</div>
                    <div className="font-mono text-slate-500">{config.promptPayPhone}</div>
                    {effectiveAmount > 0 && (
                      <div className="pt-1 text-sm font-bold text-sky-600 font-mono">
                        ยอดเงิน: {effectiveAmount.toLocaleString()} บาท
                      </div>
                    )}
                  </div>

                  {/* Action buttons on card */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(config.promptPayPhone, 'เบอร์พร้อมเพย์')}
                      className="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1 transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                      <span>คัดลอกเบอร์</span>
                    </button>
                    <button
                      onClick={handleDownloadQr}
                      className="flex-1 py-1.5 px-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-[11px] font-medium flex items-center justify-center gap-1 transition-colors shadow-2xs"
                    >
                      <Download className="w-3 h-3" />
                      <span>บันทึกภาพ QR</span>
                    </button>
                  </div>
                </div>

                <div className="text-center text-xs text-slate-500 space-y-1">
                  <p>สามารถใช้แอปพลิเคชันทุกธนาคารในไทย สแกน QR เพื่อโอนเงินได้โดยตรง</p>
                  <p className="text-slate-400 text-[11px]">ไม่มีค่าธรรมเนียมการโอน</p>
                </div>
              </div>
            )}

            {/* TAB 2: BANK ACCOUNT */}
            {activePaymentMethod === 'bank' && (
              <div className="space-y-5">
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold">
                      KB
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{config.bankName}</h4>
                      <p className="text-xs text-slate-500">บัญชีออมทรัพย์สำหรับรับการสนับสนุน</p>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>เลขที่บัญชี:</span>
                      <button
                        onClick={() => handleCopy(config.bankAccount, 'เลขที่บัญชี')}
                        className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 font-medium text-xs"
                      >
                        <Copy className="w-3 h-3" />
                        <span>คัดลอกเลขบัญชี</span>
                      </button>
                    </div>
                    <div className="text-xl sm:text-2xl font-mono font-bold text-slate-900 tracking-wider">
                      {config.bankAccount}
                    </div>
                    <div className="text-xs text-slate-600 pt-1">
                      ชื่อบัญชี: <strong className="text-slate-900">{config.bankHolder}</strong>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-sky-50/50 border border-sky-100 rounded-xl text-xs text-slate-600 space-y-1">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-sky-600" />
                    <span>คำแนะนำการโอนเงิน</span>
                  </span>
                  <p>
                    หลังจากโอนเงินเรียบร้อยแล้ว สามารถพิมพ์ข้อความและชื่อของคุณลงในแบบฟอร์มด้านขวา
                    เพื่อให้ชื่อปรากฏบนทำเนียบผู้สนับสนุนได้ทันทีครับ
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: TRUEMONEY WALLET */}
            {activePaymentMethod === 'truemoney' && (
              <div className="space-y-5">
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 font-bold">
                      TM
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">TrueMoney Wallet (ซองของขวัญ / โอนวอลเล็ท)</h4>
                      <p className="text-xs text-slate-500">ช่องทางสะดวกสำหรับผู้ใช้งานทรูมันนี่</p>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>เบอร์โทรศัพท์ TrueMoney:</span>
                      <button
                        onClick={() => handleCopy(config.trueMoneyPhone, 'เบอร์ทรูมันนี่')}
                        className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 font-medium text-xs"
                      >
                        <Copy className="w-3 h-3" />
                        <span>คัดลอกเบอร์</span>
                      </button>
                    </div>
                    <div className="text-xl font-mono font-bold text-slate-900">
                      {config.trueMoneyPhone}
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <div className="text-xs text-slate-500 mb-1.5">สร้างซองของขวัญ (Angpao Link):</div>
                      <a
                        href={config.trueMoneyGiftUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-xs rounded-lg transition-transform active:scale-[0.98] shadow-xs"
                      >
                        <Gift className="w-3.5 h-3.5" />
                        <span>เปิดส่งซองของขวัญผ่านทรูมันนี่</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Donor Wall & Cheering Message Form */}
          <div className="lg:col-span-5 space-y-6">
            {/* Donor Cheer Form */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-600" />
                  <span>ร่วมส่งกำลังใจ / บันทึกชื่อผู้สนับสนุน</span>
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  ฝากข้อความถึงคุณ <strong>Loli is My Life</strong> หรือบอกเล่าว่ามอดเกมไหนที่คุณชอบมากที่สุด
                </p>
              </div>

              <form onSubmit={handleDonorSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-600 block mb-1">ชื่อหรือฉายาของคุณ</label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="เช่น แฟนมอดพันธุ์แท้, น้องก้อง"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-600 block mb-1">เกมที่อยากให้กำลังใจ</label>
                    <input
                      type="text"
                      value={donorGame}
                      onChange={(e) => setDonorGame(e.target.value)}
                      placeholder="เช่น Stardew, Cyberpunk"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1">ยอดเงินที่ร่วมโดเนท (฿)</label>
                    <input
                      type="number"
                      value={effectiveAmount}
                      readOnly
                      className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sky-700 font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-600 block mb-1">ข้อความถึงผู้แปล</label>
                  <textarea
                    rows={3}
                    value={donorMessage}
                    onChange={(e) => setDonorMessage(e.target.value)}
                    placeholder="ขอบคุณสำหรับมอดแปลดีๆ นะครับ / เป็นกำลังใจให้คุณ Loli is My Life แปลเกมต่อไป..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>ส่งข้อความขึ้นทำเนียบผู้สนับสนุน</span>
                </button>
              </form>
            </div>

            {/* Donor Wall (ทำเนียบผู้สนับสนุนใจดี) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span>ทำเนียบผู้สนับสนุนล่าสุด</span>
                </h4>
                <span className="text-[11px] text-slate-400 font-mono">
                  {donorMessages.length} ข้อความ
                </span>
              </div>

              <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                {donorMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-900">{msg.name}</span>
                        {msg.gameSupported && (
                          <span className="text-[10px] text-sky-700 px-1.5 py-0.5 rounded-full bg-sky-100 border border-sky-200">
                            {msg.gameSupported}
                          </span>
                        )}
                      </div>
                      <span className="text-sky-600 font-mono font-bold tabular-nums">
                        +{msg.amount} ฿
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed font-light text-[11px] sm:text-xs">
                      {msg.message}
                    </p>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {msg.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
