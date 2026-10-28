import React, { useState } from 'react';
import { X, Save, PlusCircle, Settings, Trash2, RotateCcw } from 'lucide-react';
import { GameMod, DonationConfig } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: DonationConfig;
  onSaveConfig: (newConfig: DonationConfig) => void;
  mods: GameMod[];
  onAddMod: (newMod: GameMod) => void;
  onDeleteMod: (modId: string) => void;
  onResetDefaults: () => void;
  onShowToast: (msg: string) => void;
  initialTab?: 'config' | 'add_mod';
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  mods,
  onAddMod,
  onDeleteMod,
  onResetDefaults,
  onShowToast,
  initialTab = 'config',
}) => {
  const [tab, setTab] = useState<'config' | 'add_mod' | 'manage_mods'>(initialTab);

  // Config State
  const [promptPayPhone, setPromptPayPhone] = useState(config.promptPayPhone);
  const [promptPayName, setPromptPayName] = useState(config.promptPayName);
  const [bankName, setBankName] = useState(config.bankName);
  const [bankAccount, setBankAccount] = useState(config.bankAccount);
  const [bankHolder, setBankHolder] = useState(config.bankHolder);
  const [trueMoneyPhone, setTrueMoneyPhone] = useState(config.trueMoneyPhone);
  const [trueMoneyGiftUrl, setTrueMoneyGiftUrl] = useState(config.trueMoneyGiftUrl);
  const [targetGoal, setTargetGoal] = useState(config.targetGoal);
  const [currentGoalAmount, setCurrentGoalAmount] = useState(config.currentGoalAmount);
  const [goalTitle, setGoalTitle] = useState(config.goalTitle);

  // New Mod State
  const [modTitle, setModTitle] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const [category, setCategory] = useState<'RPG' | 'Action' | 'Simulation' | 'Indie' | 'Horror' | 'Adventure'>('RPG');
  const [version, setVersion] = useState('v1.0.0');
  const [gameVersion, setGameVersion] = useState('PC Steam ล่าสุด');
  const [platform, setPlatform] = useState('Steam, GOG');
  const [progress, setProgress] = useState(100);
  const [downloadUrl, setDownloadUrl] = useState('https://drive.google.com/');
  const [fileSize, setFileSize] = useState('45 MB');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [step1, setStep1] = useState('ดาวน์โหลดไฟล์ม็อด .zip');
  const [step2, setStep2] = useState('แตกไฟล์แล้วนำไปวางในโฟลเดอร์ Mods ของเกม');
  const [step3, setStep3] = useState('เข้าเกมตามปกติ ภาษาจะเปลี่ยนเป็นภาษาไทย');

  if (!isOpen) return null;

  const handleSaveConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: DonationConfig = {
      promptPayPhone,
      promptPayName,
      bankName,
      bankAccount,
      bankHolder,
      trueMoneyPhone,
      trueMoneyGiftUrl,
      kofiUrl: config.kofiUrl,
      targetGoal: Number(targetGoal) || 10000,
      currentGoalAmount: Number(currentGoalAmount) || 0,
      goalTitle,
    };
    onSaveConfig(updated);
    onShowToast('บันทึกการตั้งค่าบัญชีรับเงินสำเร็จแล้ว!');
    onClose();
  };

  const handleAddModSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modTitle.trim()) return;

    const newMod: GameMod = {
      id: `mod_${Date.now()}`,
      title: modTitle.trim(),
      originalTitle: originalTitle.trim() || modTitle.trim(),
      category,
      status: progress >= 100 ? 'completed' : 'in_progress',
      progress: Number(progress) || 100,
      progressDetails: {
        story: Number(progress) || 100,
        ui: 100,
        quests: Number(progress) || 100,
        items: Number(progress) || 100,
      },
      version: version.trim() || 'v1.0.0',
      gameVersion: gameVersion.trim() || 'PC',
      platform: platform.split(',').map((p) => p.trim()).filter(Boolean),
      releaseDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      author: 'Loli is My Life',
      coverImage: '/src/assets/images/stardew_farm_cover_1793170196165.jpg',
      summary: summary.trim() || 'มอดแปลภาษาไทยสำหรับเกมนี้ ครบถ้วนและอ่านง่าย แปลเองเล่นเอง',
      description: description.trim() || summary.trim() || 'มอดแปลภาษาไทยโดย Loli is My Life เพื่อแฟนเกมชาวไทย',
      features: [
        'แปลบทสนทนาและเมนูภาษาไทยครบถ้วน',
        'ฟอนต์อ่านง่าย เข้ากับธีมเกม ไม่ทับซ้อน UI',
        'ติดตั้งง่ายและปลอดภัย 100%',
      ],
      downloads: {
        primary: {
          name: `${modTitle.replace(/\s+/g, '_')}_Thai_${version}.zip`,
          url: downloadUrl.trim(),
          provider: 'Google Drive',
          fileSize: fileSize.trim() || '50 MB',
        },
      },
      downloadCount: 0,
      likes: 0,
      installationGuide: {
        steps: [step1, step2, step3].filter(Boolean),
        notes: ['ควรสำรองไฟล์เซฟเกมก่อนลงมอดเสมอ'],
        uninstallSteps: ['ลบไฟล์มอดที่นำไปวางไว้เพื่อกลับเป็นภาษาอังกฤษ'],
      },
      changelog: [
        {
          version: version.trim() || 'v1.0.0',
          date: new Date().toISOString().split('T')[0],
          changes: ['เปิดตัวมอดเวอร์ชันแรก'],
        },
      ],
      comments: [],
    };

    onAddMod(newMod);
    onShowToast(`เพิ่มมอดเกม "${modTitle}" สำเร็จแล้ว!`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 text-slate-800 space-y-6 my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="space-y-0.5">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-['Prompt']">
              <Settings className="w-5 h-5 text-sky-600" />
              <span>จัดการข้อมูลและบัญชีรับเงิน (Creator Studio)</span>
            </h3>
            <p className="text-xs text-slate-500">
              ตั้งค่าช่องทางรับเงินโดเนทของคุณ หรือเพิ่มเกมมอดใหม่ลงในเว็บไซต์
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 border border-slate-200 rounded-xl text-xs">
          <button
            type="button"
            onClick={() => setTab('config')}
            className={`flex-1 py-1.5 px-3 rounded-lg font-medium transition-colors ${
              tab === 'config' ? 'bg-white text-sky-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ตั้งค่าบัญชีรับเงิน (พร้อมเพย์/ธนาคาร)
          </button>
          <button
            type="button"
            onClick={() => setTab('add_mod')}
            className={`flex-1 py-1.5 px-3 rounded-lg font-medium transition-colors ${
              tab === 'add_mod' ? 'bg-white text-sky-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            + ลงมอดเกมใหม่
          </button>
          <button
            type="button"
            onClick={() => setTab('manage_mods')}
            className={`flex-1 py-1.5 px-3 rounded-lg font-medium transition-colors ${
              tab === 'manage_mods' ? 'bg-white text-sky-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            จัดการมอด ({mods.length})
          </button>
        </div>

        {/* TAB 1: DONATION CONFIG */}
        {tab === 'config' && (
          <form onSubmit={handleSaveConfigSubmit} className="space-y-4 text-xs">
            <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-sky-800 text-xs">
              💡 ข้อมูลที่คุณแก้ไขจะถูกนำไปสร้าง <strong>QR Code พร้อมเพย์</strong>{' '}
              และแสดงในแท็บโดเนทของเว็บไซต์โดยตรง
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-600 block mb-1 font-medium">
                  เบอร์โทรศัพท์พร้อมเพย์ (PromptPay)*
                </label>
                <input
                  type="text"
                  required
                  value={promptPayPhone}
                  onChange={(e) => setPromptPayPhone(e.target.value)}
                  placeholder="เช่น 089-123-4567"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:border-sky-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-slate-600 block mb-1 font-medium">
                  ชื่อบัญชีพร้อมเพย์ (ที่จะโชว์ใต้ QR)*
                </label>
                <input
                  type="text"
                  required
                  value={promptPayName}
                  onChange={(e) => setPromptPayName(e.target.value)}
                  placeholder="เช่น นาย ธิดามาศ / Loli is My Life"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-sky-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3 space-y-3">
              <h4 className="text-slate-900 font-semibold">ข้อมูลบัญชีธนาคาร (ทางเลือก)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-600 block mb-1">ชื่อธนาคาร</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="เช่น ธนาคารกสิกรไทย"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-sky-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1">เลขที่บัญชี</label>
                  <input
                    type="text"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    placeholder="เช่น 123-4-56789-0"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:border-sky-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1">ชื่อเจ้าของบัญชี</label>
                  <input
                    type="text"
                    value={bankHolder}
                    onChange={(e) => setBankHolder(e.target.value)}
                    placeholder="เช่น THIDAMAS T."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-sky-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3 space-y-3">
              <h4 className="text-slate-900 font-semibold">ทรูมันนี่ วอลเล็ท (TrueMoney)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 block mb-1">เบอร์ TrueMoney</label>
                  <input
                    type="text"
                    value={trueMoneyPhone}
                    onChange={(e) => setTrueMoneyPhone(e.target.value)}
                    placeholder="เช่น 089-123-4567"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:border-sky-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1">ลิงก์ซองของขวัญ / รับเงิน</label>
                  <input
                    type="text"
                    value={trueMoneyGiftUrl}
                    onChange={(e) => setTrueMoneyGiftUrl(e.target.value)}
                    placeholder="เช่น https://gift.truemoney.com/..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-sky-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3 space-y-3">
              <h4 className="text-slate-900 font-semibold">แถบเป้าหมายการโดเนท (Donation Goal)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-slate-600 block mb-1">ชื่อโครงการเป้าหมาย</label>
                  <input
                    type="text"
                    value={goalTitle}
                    onChange={(e) => setGoalTitle(e.target.value)}
                    placeholder="เช่น กองทุนค่ากาแฟและโฮสติ้งเซิร์ฟเวอร์"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-sky-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1">ยอดเป้าหมาย (บาท)</label>
                  <input
                    type="number"
                    value={targetGoal}
                    onChange={(e) => setTargetGoal(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:border-sky-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={onResetDefaults}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-slate-400 hover:text-slate-700 text-xs transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>คืนค่าเริ่มต้น</span>
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>บันทึกบัญชีรับเงิน</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TAB 2: ADD NEW MOD */}
        {tab === 'add_mod' && (
          <form onSubmit={handleAddModSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-600 block mb-1">ชื่อมอดภาษาไทย*</label>
                <input
                  type="text"
                  required
                  value={modTitle}
                  onChange={(e) => setModTitle(e.target.value)}
                  placeholder="เช่น Baldur's Gate 3: ภาษาไทย"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-sky-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-slate-600 block mb-1">ชื่อเกมต้นฉบับภาษาอังกฤษ*</label>
                <input
                  type="text"
                  required
                  value={originalTitle}
                  onChange={(e) => setOriginalTitle(e.target.value)}
                  placeholder="เช่น Baldur's Gate 3"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-sky-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-slate-600 block mb-1">หมวดหมู่</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-sky-500 focus:bg-white"
                >
                  <option value="RPG">RPG</option>
                  <option value="Action">Action</option>
                  <option value="Simulation">Simulation</option>
                  <option value="Horror">Horror</option>
                  <option value="Indie">Indie</option>
                  <option value="Adventure">Adventure</option>
                </select>
              </div>
              <div>
                <label className="text-slate-600 block mb-1">ความคืบหน้า (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:border-sky-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-slate-600 block mb-1">เวอร์ชันมอด</label>
                <input
                  type="text"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  placeholder="v1.0.0"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:border-sky-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-600 block mb-1">ลิงก์ดาวน์โหลด (Google Drive / Mega)*</label>
                <input
                  type="url"
                  required
                  value={downloadUrl}
                  onChange={(e) => setDownloadUrl(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:border-sky-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-slate-600 block mb-1">ขนาดไฟล์</label>
                <input
                  type="text"
                  value={fileSize}
                  onChange={(e) => setFileSize(e.target.value)}
                  placeholder="เช่น 45 MB หรือ 1.2 GB"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:border-sky-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-600 block mb-1">คำอธิบายมอดแบบย่อ</label>
              <textarea
                rows={2}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="สรุปจุดเด่นของมอดนี้สั้นๆ..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-sky-500 focus:bg-white"
              />
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-200">
              <label className="text-slate-800 font-semibold block">ขั้นตอนการติดตั้ง 3 ขั้น</label>
              <input
                type="text"
                value={step1}
                onChange={(e) => setStep1(e.target.value)}
                placeholder="ขั้นที่ 1: โหลดไฟล์..."
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-slate-900"
              />
              <input
                type="text"
                value={step2}
                onChange={(e) => setStep2(e.target.value)}
                placeholder="ขั้นที่ 2: วางไฟล์..."
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-slate-900"
              />
              <input
                type="text"
                value={step3}
                onChange={(e) => setStep3(e.target.value)}
                placeholder="ขั้นที่ 3: เปิดเกม..."
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-slate-900"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>เผยแพร่มอดลงเว็บไซต์</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: MANAGE MODS */}
        {tab === 'manage_mods' && (
          <div className="space-y-3 text-xs">
            <p className="text-slate-500">
              รายการมอดทั้งหมดที่กำลังเผยแพร่อยู่ในปัจจุบัน:
            </p>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {mods.map((m) => (
                <div
                  key={m.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-semibold text-slate-900">{m.title}</div>
                    <div className="text-slate-500 font-mono text-[11px]">
                      {m.category} · {m.version} · {m.progress}% · {m.downloadCount.toLocaleString()} โหลด
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(`คุณต้องการลบมอด "${m.title}" หรือไม่?`)) {
                        onDeleteMod(m.id);
                        onShowToast(`ลบมอด "${m.title}" แล้ว`);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 bg-white hover:bg-rose-50 border border-slate-200 rounded transition-colors"
                    title="ลบมอด"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
